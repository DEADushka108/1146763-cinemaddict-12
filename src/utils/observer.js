export default class Observer {
  constructor() {
    this._dataChangeHandlers = [];
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  removeHandler(handler) {
    this._dataChangeHandlers = this._dataChangeHandlers.filter((existedHandler) => existedHandler !== handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
