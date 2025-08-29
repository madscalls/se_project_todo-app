import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form"); //move to constructor
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this.inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );

    const values = {};
    this.inputList.forEach((input) => {
      this._input.forEach((input) => {
        values[input.name] = input.value;
      });
    });
    return values; //not sure how to fix this without breaking everything
  }

  setEventListeners() {
    super.setEventListeners(); //calls parent listeners (clse, bckdrp, esc)
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      //pass collected values to handler
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
