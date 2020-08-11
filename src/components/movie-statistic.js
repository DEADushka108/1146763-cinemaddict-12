import {createElement} from '../util.js';

const createMovieStatisticTemplate = (moviesNumber) => `<p>${moviesNumber} movies inside</p>`;

export default class MovieStatistic {
  constructor(moviesNumber) {
    this._moviesNumber = moviesNumber;
    this._element = null;
  }

  getTemplate() {
    return createMovieStatisticTemplate(this._moviesNumber);
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
