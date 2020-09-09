import AbstractView from './abstract-view.js';

export default class FooterStatisticView extends AbstractView {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return `<p>${this._filmsNumber} movies inside</p>`;
  }
}
