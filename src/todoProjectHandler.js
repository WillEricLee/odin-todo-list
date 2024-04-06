import { de } from 'date-fns/locale/de';
import displayProject from './index.js';
import { format } from 'date-fns';

export class Todo {
    constructor (title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    logItems() {
        console.log(this.title, this.description, this.dueDate, this.priority);
    }
};
export class Project {
    todos = [];

    constructor (title) {
        this.title = title;
    }
};
export function createProjectEntry(project) {
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('class', 'project-tab');

    const text = document.createElement('h2');
    text.innerHTML = project.title;
    text.setAttribute('class', 'project-text');
    text.addEventListener('click', () => {displayProject(project)});

    projectDiv.appendChild(text);

    return projectDiv;
};
export function createTodoEntry(todo) {
    const container = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const date = document.createElement('p');
    const priority = document.createElement('img');

    title.innerHTML = todo.title;
    description.innerHTML = todo.description;
    date.innerHTML = todo.date;
    priority.innerHTML = todo.priority;

    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(date);
    container.appendChild(priority);

    container.setAttribute('class', 'todo-item')

    return container;
};