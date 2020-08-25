import {createElement} from '../utils/render.js';

const HIDDEN_CLASS = `visually-hidden`;

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS);
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS);
  }

  removeElement() {
    this._element = null;
  }
}
