import {displayProject} from './index.js';

export class Todo {
    constructor (title, description, date, time, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.priority = priority;
    }

    logItems() {
        console.log(this.title, this.description, this.date, this.time, this.priority);
    }
};
export class Project {
    todos = [];

    constructor (title) {
        this.title = title;
        this.description = "Create a description";
    }
};
export function createProjectEntry(project) {
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute('class', 'project-tab');

    const text = document.createElement('h2');
    text.innerHTML = project.title;
    text.setAttribute('class', 'project-text');
    text.addEventListener('click', () => {
        displayProject(project);
    });

    projectDiv.appendChild(text);

    return projectDiv;
};
export function createTodoEntry(todo) {
    const container = document.createElement('div');
    const title = document.createElement('h2');
    const priority = document.createElement('p');

    title.innerHTML = todo.title;
    priority.innerHTML = todo.priority;

    const expandButton = document.createElement("button");
    expandButton.innerHTML = "Expand";
    expandButton.onclick = () => {
        const description = document.createElement('p');
        const date = document.createElement('p');
        const time = document.createElement('p');

        description.innerHTML = todo.description;
        date.innerHTML = todo.date;
        time.innerHTML = todo.time;

        container.removeChild(expandButton);
        container.appendChild(description);
        container.appendChild(date);
        container.appendChild(time);
    };

    container.appendChild(title);
    container.appendChild(priority);
    container.appendChild(expandButton);

    container.setAttribute('class', 'todo-item');

    return container;
};

export function createDefaultProject() {
    let title = 'Default Project';
    const defaultProject = new Project(title);

    const example1 = new Todo('Todo 1', 'Default Description', '01-01-1970', '12:00 AM', '!!!');

    defaultProject.todos.push(example1);

    return defaultProject;
}