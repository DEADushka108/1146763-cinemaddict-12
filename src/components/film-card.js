import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, release, duration, genres, controls} = film;
  const {isInWatchlist, isInHistory, isInFavorites} = controls;

  const DescriptionLenght = {
    MAX: 140,
    REQUIRE: 139,
    MIN: 0,
  };

  const getCommentsLength = () => comments ? comments.length : 0;

  const getDescription = () => description.length > DescriptionLenght.MAX ? `${description.substring(DescriptionLenght.MIN, DescriptionLenght.REQUIRE)}...` : description;

  const getElementState = (isChecked) => isChecked ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(release).format(`YYYY`)}</span>
        <span class="film-card__duration">${Math.trunc(duration / 60)}h ${duration % 60}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${getDescription()}</p>
      <a class="film-card__comments">${getCommentsLength()} comments</a>
      <form class="film-card__controls">
        <button data-control="isInWatchlist" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getElementState(isInWatchlist)}">Add to watchlist</button>
        <button data-control="isInHistory" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getElementState(isInHistory)}">Mark as watched</button>
        <button data-control="isInFavorites" class="film-card__controls-item button film-card__controls-item--favorite ${getElementState(isInFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandlers(callback) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, callback);
  }

  setControlsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      evt.preventDefault();

      handler(evt.target.dataset.control);
    });
  }
}
