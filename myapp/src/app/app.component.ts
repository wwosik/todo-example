import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';
  selectedTodo: Todo;

  todos: Todo[] = [];

  todoText = new FormControl('', [Validators.required]);

  isLoading = true;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4201').toPromise()
      .then((data: Todo[]) => {
        console.log('data from server', data);
        this.todos = data;
      })
      .catch(err => { console.error(err) })
      .then(() => {
        this.isLoading = false;
        if (!this.todos) { this.todos = []; }
      });
  }

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

    this.saveToServer();
  }

  saveToServer() {
    this.isLoading = true;
    this.http.post('http://localhost:4201', JSON.stringify(this.todos))
      .toPromise()
      .then(() => { console.log('success!') })
      .catch(console.error)
      .then(() => this.isLoading = false);
  }

  select(todo: Todo) {
    this.selectedTodo = todo;
    this.todoText.setValue(todo.text);
  }

  delete(todo: Todo) {
    this.todos = this.todos.filter(t => t !== todo);
    this.saveToServer();
  }
}

export interface Todo {
  text: string
  id: number
}
