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
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos || [], ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    if (!addTodoForm.checkValidity()) return;
  },
});

addTodoPopup.setEventListeners();

// function handleEscClose(event) {
//   if (event.key === "Escape") {
//     const openPopup = document.querySelector(".popup_visible");
//     if (openPopup) {
//       closeModal(openPopup);
//     }
//   }
// }

// open / close;
// const openModal = (modal) => {
//   modal.classList.add("popup_visible"); //event listener for esc is added when the popup is opened and removed when its closed

//   document.addEventListener("keydown", handleEscClose);
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");

//   document.addEventListener("keydown", handleEscClose);
// };

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

//open/close popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//instantiate
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// initialTodos.forEach((item) => {
//   renderTodo(item);
//}); //use addItem method instead

// submit;
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
  closeModal(addTodoPopupEl);
});
