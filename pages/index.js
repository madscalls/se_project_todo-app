import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

//DOM
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

//open/close
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};
const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
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
  const todo = generateTodo(item);
  todosList.append(todo);
});

//submit
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value; //require- min-length 2
  const dateInput = evt.target.date.value; //optional date

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);

  formValidator.resetValidation();
  closeModal(addTodoPopup);
});
