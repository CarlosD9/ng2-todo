import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Todo } from './todo';
import { TODOS } from './mock-todos';

@Injectable()
export class TodoService {
    private todosUrl = 'http://localhost:57154/api/todos';  // URL to web api

    constructor(private http: Http) { }

    // getAll(): Observable<Todo[]> {
    //     return this.http.get(this.todosUrl)
    //     .map(this.extractData)
    //     .catch(this.handleError);
    // }

    getAll(): Observable<Todo[]> {
        return this.http
            .get(this.todosUrl)
            .map(res => res.json());
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
    
    add(todo: Todo): Observable<Todo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http
            .post(this.todosUrl, todo, options)
            .map(res => res.json());
    }

    deleteT(id: number): Promise<void> {
        const url = `${this.todosUrl}/${id}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(url, options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

}