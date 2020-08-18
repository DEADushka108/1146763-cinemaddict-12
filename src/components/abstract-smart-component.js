import AbstractComponent from './abstract-component.js';

export default class AbstractSmart extends AbstractComponent {
  constructor() {
    super();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    throw new Error(`Abstract method not implemented: rerender`);
  }
}
