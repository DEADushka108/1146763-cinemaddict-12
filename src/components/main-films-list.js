import AbstractComponent from './abstract-component.js';

const createMainFilmsListTemplate = (isAnyFilms) => {
  const heading = isAnyFilms ? `All movies. Upcoming` : `There are no movies in our database`;

  return (
    `<section class="films-list films-list--main">
      <h2 class="films-list__title ${isAnyFilms ? `visually-hidden` : ``}">${heading}</h2>
      ${isAnyFilms ?
      `<div class="films-list__container"></div>`
      : ``}
    </section>`
  );
};

export default class MainFilmsList extends AbstractComponent {
  constructor(isAnyFilms = true) {
    super();

    this._isAnyFilms = isAnyFilms;
  }

  getTemplate() {
    return createMainFilmsListTemplate(this._isAnyFilms);
  }
}
