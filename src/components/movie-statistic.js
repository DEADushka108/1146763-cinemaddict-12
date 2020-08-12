import {createElement} from '../util.js';

export default class MovieStatistic {
  constructor(moviesNumber) {
    this._moviesNumber = moviesNumber;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this._moviesNumber} movies inside</p>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
