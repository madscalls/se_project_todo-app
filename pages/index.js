import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

//DOM
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos || [], ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const { name, date } = formData;

    if (!addTodoForm.checkValidity()) return;

    let dateObject = null;
    if (date) {
      let dateObject = new Date(date);
      dateObject.setMinutes(
        dateObject.getMinutes() + dateObject.getTimezoneOffset()
      );
    }
    const id = uuidv4();

    const todoData = {
      name,
      date: dateObject,
      id,
      completed: false,
    };

    renderTodo(todoData); //adds item and updates total counter
    formValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

//open/close popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function handleCheck(isCompleted) {
  todoCounter.updateCompleted(isCompleted);
}

function handleDelete(wasCompleted) {
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};
//new section
const section = new Section({
  items: initialTodos || [],
  renderer: (item) => {
    const el = generateTodo(item);
    section.addItem(el);
  },
  containerSelector: ".todos__list",
});

//render all items once on page load
section.renderItems();

//append new todo
const renderTodo = (item) => {
  const el = generateTodo(item);
  section.addItem(el);
  todoCounter.updateTotal(true);
};

//instantiate
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// submit;
// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   if (!addTodoForm.checkValidity()) return;

//   const name = evt.target.elements.name.value; //req
//   const dateInput = evt.target.date.value; //optional date

//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const values = {
//     name,
//     date,
//     id,
//     completed: false,
//   };
//   renderTodo(values);

//   formValidator.resetValidation();
//   addTodoPopup.close();
// });
