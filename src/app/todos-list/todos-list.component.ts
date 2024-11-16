import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodosStore } from '../store/todos.store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule, MatListModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id:string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

}
