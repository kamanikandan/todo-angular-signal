import { Component, Input, inject } from '@angular/core';
import Todo from '../../services/todo';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule, TodoItemComponent],
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Input() headingText: string = '';
}
