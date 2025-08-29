export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // select the appropriate element
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    if (this._completed < 0) this._completed = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  // Call this when a to-do is created/del
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    if (this._total < 0) this._total = 0;
    if (this._completed > this._total) this._completed = this._total;
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    if (!this._element) return;
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
