import { Component, Input, inject } from '@angular/core';
import Todo from '../../services/todo';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todoService = inject(TodoService);

  @Input() todo: Todo = {} as Todo;
}
