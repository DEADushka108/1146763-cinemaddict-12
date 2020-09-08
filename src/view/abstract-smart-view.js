import AbstractView from './abstract-view.js';

export default class AbstractSmartView extends AbstractView {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }
}
