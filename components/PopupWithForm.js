import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners(); //calls parent listeners (clse, bckdrp, esc)
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
  }
}
export default PopupWithForm;
