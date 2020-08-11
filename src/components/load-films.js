import {createElement} from '../util.js';

const createLoadFilmsTemplate = () => `<h2 class="films-list__title">Loading...</h2>`;

export default class LoadFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadFilmsTemplate();
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
