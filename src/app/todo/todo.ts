export class Todo {

    id: number;
    title: string;
    createdAt: Date;
    done: boolean;
    owner: string;

    constructor(title, owner) {
        this.createdAt = new Date();
        this.done = false;
        this.title = title;
        this.owner = owner;
    }

}