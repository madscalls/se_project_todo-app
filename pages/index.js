import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

//DOM
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_visible");
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

//open/close
const openModal = (modal) => {
  modal.classList.add("popup_visible"); //event listener for esc is added when the popup is opened and removed when its closed

  document.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");

  document.addEventListener("keydown", handleEscClose);
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

//append new todo
const renderTodo = (item) => {
  const el = generateTodo(item);
  todosList.append(el);
};

//open/close popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

//instantiate
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

initialTodos.forEach((item) => {
  renderTodo(item);
});

//submit
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!addTodoForm.checkValidity()) return;

  const name = evt.target.elements.name.value; //req
  const dateInput = evt.target.date.value; //optional date

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = {
    name,
    date,
    id,
    completed: false,
  };
  renderTodo(values);

  formValidator.resetValidation();
  closeModal(addTodoPopup);
});
