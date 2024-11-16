import { Todo } from "../model/todo.model"
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TodosService } from "../service/todos.service";
import { inject } from "@angular/core";

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    filter: "all"
}

export const TodosStore = signalStore(
    { providedIn: "root" }, // To set the store as global and can be inject in any part of the application
    withState(initialState),
    withMethods(
        (store, todosService = inject(TodosService)) => ({
            async loadAll() {
                patchState(store, { loading: true });

                const todos = await todosService.getTodos();

                patchState(store, { todos, loading: false });
            },

            async addTodo(title: string) {
                const todo = await todosService.addTodo({title, completed: false});
                patchState(store, (currState) => ({
                    todos: [...currState.todos, todo]
                }))
            },

            async deleteTodo(id:string) {
                await todosService.deleteTodo(id);
                patchState(store, (currState) => ({
                    todos: currState.todos.filter(todo => todo.id !== id)
                }))
            }
        })
    )
)