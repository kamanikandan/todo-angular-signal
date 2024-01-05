import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoSkeletonComponent } from './components/todo-skeleton/todo-skeleton.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    TodoListComponent,
    TodoSkeletonComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  todoService = inject(TodoService);
  private scrollSubscription!: Subscription;
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.todoService.updateCurrentPage();
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(
      this.elementRef?.nativeElement?.querySelector('.lazy-load-level')
    );
  }

  todosCompleted = computed(() => {
    this.scrollSubscription.unsubscribe();

    return this.todoService.getTodos().filter((todo) => todo.completed);
  });

  todosPending = computed(() => {
    return this.todoService.getTodos().filter((todo) => !todo.completed);
  });

  getNewPage() {
    this.todoService.updateCurrentPage();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
