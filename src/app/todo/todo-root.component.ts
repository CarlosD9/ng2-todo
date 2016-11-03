import { Component, OnInit } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'todo-root',
    templateUrl: './todo-root.component.html',
    styleUrls: ['./todo-root.component.css'],
    providers: [TodoService]
})

export class TodoRootComponent implements OnInit {
    constructor(private todoService: TodoService) { }
    title = 'Todo List';
    errorMessage = '';
    todos : Todo[];

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos(): void {
        this.todoService
        .getAll()
        .subscribe(
            todos => this.todos = todos,
            error => this.errorMessage = error);
    }

    addTodo(todoTitle: string): void {
        this.todoService.add(new Todo(todoTitle, 'Carlos'))
            .subscribe(todo => this.todos.push(todo),
            error => this.errorMessage = error);
    }

}
