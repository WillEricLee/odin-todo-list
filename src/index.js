import './style.css';
import { parse } from 'date-fns';

class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    logItems() {
        console.log(this.title, this.description, this.dueDate, this.priority);
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
const exampleDateTime = '2022-06-01T17:31:02';
const example = new Todo('Example', 'This is a description', parse(exampleDateTime, "yyyy-MM-dd'T'HH:mm:ss", new Date()), 'priority wawa')

projects.push(example);
projects[0].logItems();