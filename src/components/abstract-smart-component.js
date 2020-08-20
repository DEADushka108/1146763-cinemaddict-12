import AbstractComponent from './abstract-component.js';

export default class AbstractSmart extends AbstractComponent {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  rerender() {
    let oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);
    oldElement = null;

    this.restoreHandlers();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._film = Object.assign(
        {},
        this._film,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.rerender();
  }
}
