import './style.css';

class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    todos = [];

    constructor (title, description) {
        this.title = title;
        this.description = description;
    }
}

let projects = [];

