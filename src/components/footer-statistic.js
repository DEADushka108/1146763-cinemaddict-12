import AbstractComponent from "./abstract-component";

export default class FooterStatistic extends AbstractComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;
  }

  getTemplate() {
    return `<p>${this._filmsModel.getAllFilms().length} movies inside</p>`;
  }
}
