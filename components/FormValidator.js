// components/FormValidator.js
class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._formEl = formEl;
    this._inputList = [];
    this._buttonElement = null;
  }

  _getErrorEl(inputEl) {
    return this._formEl.querySelector(`#${inputEl.id}-error`);
  }

  _showInputError(inputEl, message) {
    const errorEl = this._getErrorEl(inputEl);
    if (!errorEl) return;
    inputEl.classList.add(this._inputErrorClass);
    errorEl.textContent = message;
    errorEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorEl = this._getErrorEl(inputEl);
    if (!errorEl) return;
    inputEl.classList.remove(this._inputErrorClass);
    errorEl.classList.remove(this._errorClass);
    errorEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
    this._toggleButtonState();
  }

  _hasInvalidInput() {
    return this._inputList.some((el) => !el.validity.valid);
  }

  _toggleButtonState() {
    if (!this._buttonElement) return;
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  resetValidation() {
    this._formEl.reset();
    if (this._inputList.length === 0) {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
    }
    this._inputList.forEach((el) => this._hideInputError(el));
    if (!this._buttonElement) {
      this._buttonElement = this._formEl.querySelector(
        this._submitButtonSelector
      );
    }
    if (this._buttonElement) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }
}

export default FormValidator;
