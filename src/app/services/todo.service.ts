import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import Todo from './todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private todos = signal<Todo[]>([]);
  private currentPage = signal<number>(1);

  constructor() {
    effect(() => {
      this.fetchTodos();
    });
  }

  fetchTodos() {
    this.http
      .get<Todo[]>(`${API_URL}?_page=${this.currentPage()}&_limit=25`)
      .subscribe((todos) =>
        this.todos.update((prevTodos) => [...prevTodos, ...todos])
      );
  }

  getTodos() {
    return this.todos();
  }

  getCurrentPage() {
    return this.currentPage();
  }

  updateCurrentPage() {
    this.currentPage.update((currentPage) => currentPage + 1);
  }

  toggleCompleted(todoId: number) {
    const todos = this.todos()?.map((t) =>
      t.id === todoId ? { ...t, completed: !t.completed } : t
    );

    this.todos.set(todos);
  }
}
