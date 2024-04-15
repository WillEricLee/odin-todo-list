import './style.css';
import {Todo, Project, createProjectEntry, createTodoEntry, createDefaultProject} from './todoProjectHandler';

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function displayProject(project) {
    contentSection.innerHTML = "";

    const topbar = document.createElement('div');
    const title = document.createElement('h1');
    const description = document.createElement('p');

    topbar.setAttribute('class', 'topbar');
    title.setAttribute('class', 'title');
    description.setAttribute('class', 'description');

    //upon doubleclick on these elements, you can edit their contents
    title.addEventListener('dblclick', () => {
        console.log('title change');
        const titleInput = document.createElement('input');
        titleInput.setAttribute('class', 'title-edit');

        topbar.replaceChild(titleInput, title);
       
        titleInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' && titleInput.value!="") {
                project.title = titleInput.value;
                displayProjectList();
                displayProject(project);
                saveProjects();
            }
        });
    });
    description.addEventListener('dblclick', () => {
        console.log('title change');
        const descInput = document.createElement('input');
        descInput.setAttribute('class', 'title-edit');

        topbar.replaceChild(descInput, description);
       
        descInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter' && descInput.value!="") {
                project.description = descInput.value;
                displayProjectList();
                displayProject(project);
                saveProjects();
            }
        });
    });

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
        const newTodo = new Todo(title.children[1].value, description.children[1].value, date.children[1].value, time.children[1].value, priority.children[1].value);

        currentProject.todos.push(newTodo);
        makingNewTodo = false;
        saveProjects();
        displayProject(currentProject);
    };

    const title = makeInputLabel("Title");
    const description = makeInputLabel("Description");
    const priority = makeInputLabel("Priority");

    const date = makeInputLabel("Date")
    date.children[1].setAttribute('type', 'date');
    const time = makeInputLabel("Time");
    time.children[1].setAttribute('type', 'time');
    
    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(date);
    todo.appendChild(time);
    todo.appendChild(priority);
    todo.appendChild(confirmButton);

    return todo;
}

function newProjectInput() {
    const input = document.createElement('input');
    input.setAttribute('class', 'project-input');
    input.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            projects.push(new Project(input.value));
            makingNewProject = false;
            saveProjects();
            displayProjectList();
        }
    });

    return input;
}

//-------------------------------INITIALIZATION-------------------------------

var projects = [];
var makingNewTodo = false, makingNewProject = false;
var currentProject = null;
var localStorageEnabled = false;
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

if (storageAvailable("localStorage")) {
    console.log("storage available");
    localStorageEnabled = true;

    if (!localStorage.getItem("projects")) {
        saveProjects();
    } else {
        projects = JSON.parse(localStorage.getItem("projects"));
        console.log(projects);
    }
} else {
    console.log("storage NOT available");
    localStorageEnabled = false;
    projects.push(createDefaultProject());
}

displayProjectList();

export {displayProject, currentProject};