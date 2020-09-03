import AbstractComponent from "./abstract-component";

export default class FooterStatistic extends AbstractComponent {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return `<p>${this._filmsNumber} movies inside</p>`;
  }
}
