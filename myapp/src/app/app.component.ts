import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';
  selectedTodo: Todo;

  todos: Todo[] = [{
    text: 'Activity 1',
    id: 1
  }, {
    text: 'Activity 2',
    id: 2
  }]

  todoText = new FormControl('', [Validators.required]);

  save() {
    if (this.selectedTodo) {
      this.selectedTodo.text = this.todoText.value;
      this.selectedTodo = null;
    } else {
      const todo: Todo = {
        text: this.todoText.value,
        id: new Date().valueOf()
      }

      this.todos.push(todo);

    }
    this.todoText.reset();
  }

  select(todo: Todo) {
    this.selectedTodo = todo;
    this.todoText.setValue(todo.text);
  }

  delete(todo: Todo) {
    this.todos = this.todos.filter(t => t !== todo);
  }
}

export interface Todo {
  text: string
  id: number
}
