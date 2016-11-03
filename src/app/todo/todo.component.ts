import { Component, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})

export class TodoComponent {
    @Input()
    todo: Todo = null;

    changeState(): void {
        this.todo.done = !this.todo.done;
    }
}