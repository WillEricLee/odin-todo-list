import './style.css';
import {Todo, Project, createProjectEntry, createTodoEntry} from './todoProjectHandler';
import parse from 'date-fns/parse'

function displayProject(project) {

    const contentSection = document.querySelector('.todo-list');
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
}

let projects = [];
const sidebarContent = document.querySelector('.project-list');


//------------------EXAMPLE TESTING-----------------------------------

const exampleProject1 = new Project('Example Project 1');
const exampleProject2 = new Project('Example Project 2');
projects.push(exampleProject1)
projects.push(exampleProject2)

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

for (const project of projects) {
    sidebarContent.appendChild(createProjectEntry(project));
}

export default displayProject;