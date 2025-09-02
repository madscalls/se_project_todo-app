class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");

    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => this.close());
    //overlay click
    this._popupElement.addEventListener("mousedown", (evt) => {
      const clickedCloseBtn = evt.target.closest(".popup__close");
      const clickedBackdrop = evt.target === evt.currentTarget;
      if (clickedCloseBtn || clickedBackdrop) {
        this.close();
      }
    });
  }
}

export default Popup;
