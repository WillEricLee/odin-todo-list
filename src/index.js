import './style.css';
import {Todo, Project, createProjectEntry, createTodoEntry} from './todoProjectHandler';

function displayProject(project) {
    contentSection.innerHTML = "";

    const topbar = document.createElement('div');
    const title = document.createElement('h1');
    const description = document.createElement('p');
    topbar.setAttribute('class', 'topbar');
    title.setAttribute('class', 'title');
    description.setAttribute('class', 'description');
    title.innerHTML = project.title;
    description.innerHTML = project.description;
    topbar.appendChild(title);
    topbar.appendChild(description);

    contentSection.appendChild(topbar);

    for (const todo of project.todos) {
        contentSection.appendChild(createTodoEntry(todo));
    }

    currentProject = project;
}

function displayProjectList() {
    sidebarContent.innerHTML = "";
    for (const project of projects) {
        sidebarContent.appendChild(createProjectEntry(project));
    }    
}

function createExampleProject(number) {
    let title = 'Example Project ' + number;
    const exampleProject1 = new Project(title);

    const exampleDateTime = '2024-04-05T14:30:00';
    const example1 = new Todo('Example1', 'This is a description', exampleDateTime, 'priority wawa');
    const example2 = new Todo('Example2', 'This is a description', exampleDateTime, 'priority wawa');
    const example3 = new Todo('Example3', 'This is a description', exampleDateTime, 'priority wawa');
    const example4 = new Todo('Example4', 'This is a description', exampleDateTime, 'priority wawa');
    const example5 = new Todo('Example5', 'This is a description', exampleDateTime, 'priority wawa');
    const example6 = new Todo('Example6', 'This is a description', exampleDateTime, 'priority wawa');
    const example7 = new Todo('Example7', 'This is a description', exampleDateTime, 'priority wawa');
    const example8 = new Todo('Example8', 'This is a description', exampleDateTime, 'priority wawa');
    const example9 = new Todo('Example9', 'This is a description', exampleDateTime, 'priority wawa');

    exampleProject1.todos.push(example1);
    exampleProject1.todos.push(example2);
    exampleProject1.todos.push(example3);
    exampleProject1.todos.push(example4);
    exampleProject1.todos.push(example5);
    exampleProject1.todos.push(example6);
    exampleProject1.todos.push(example7);
    exampleProject1.todos.push(example8);
    exampleProject1.todos.push(example9);

    return exampleProject1;
}

function makeInputLabel(labelText) {
    const container = document.createElement('div');
    container.setAttribute('class', 'todo-input');

    const label = document.createElement('h3');
    label.innerHTML = labelText + ": ";
    const input = document.createElement('input');
    input.setAttribute('placeholder', labelText);

    container.appendChild(label);
    container.appendChild(input);

    return container;
    
}

function newTodoInput() { 
    const todo = document.createElement('div');
    todo.setAttribute('class', 'todo-item');

    const confirmButton = document.createElement('button');
    confirmButton.innerHTML = "Confirm";
    confirmButton.onclick = () => {
        const newTodo = new Todo(title.children[1].value, description.children[1].value, date.children[1].value, priority.children[1].value);

        currentProject.todos.push(newTodo);
        displayProject(currentProject);
    };

    const title = makeInputLabel("Title");
    const description = makeInputLabel("Description");
    const date = makeInputLabel("Date")
    const priority = makeInputLabel("Priority");
    
    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(date);
    todo.appendChild(priority);
    todo.appendChild(confirmButton);

    return todo;
}

function newProjectInput() {
    const input = document.createElement('input');
    input.setAttribute('class', 'project-input');
    input.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            console.log('wawa');
            projects.push(new Project(input.value));
            displayProjectList();
        }
    });

    return input;
}


var projects = [];
var makingNewTodo = false, makingNewProject = false;
var currentProject = null;
const sidebarContent = document.querySelector('.project-list');
const contentSection = document.querySelector('.todo-list');
const newTodoClickable = document.querySelector('.new-todo');
const newProjectClickable = document.querySelector('.new-project');
newTodoClickable.onclick = () => {
    if (!makingNewTodo) {
        makingNewTodo = true;
        contentSection.appendChild(newTodoInput());
    }
};
newProjectClickable.onclick = () => {
    if (!makingNewProject) {
        makingNewProject = true;
        sidebarContent.appendChild(newProjectInput());
    }
};


//------------------EXAMPLE TESTING-----------------------------------

projects.push(createExampleProject(1));
projects.push(createExampleProject(2));

displayProjectList();

export {displayProject, currentProject};