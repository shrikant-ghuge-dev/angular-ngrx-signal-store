import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }

  // Simulating backend calls as we are using dummy data and not calling actual APIs

  async getTodos() {
    await this.sleep(2000)
    return TODOS;
  }

  async addTodo(todo: Partial<Todo>) {
    await this.sleep(2000)
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...todo
    } as Todo;
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
