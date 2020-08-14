import AbstractComponent from './abstract-component.js';

export default class MovieStatistic extends AbstractComponent {
  constructor(moviesNumber) {
    super();
    this._moviesNumber = moviesNumber;
  }

  getTemplate() {
    return `<p>${this._moviesNumber} movies inside</p>`;
  }
}
