import {createElement} from '../util.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, year, duration, genres, isInFavorites, isInWatchlist, isInHistory} = film;

  const getCommentsLength = () => comments ? comments.length : 0;

  const getActiveState = (isCkeckedParameter) => isCkeckedParameter ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${getCommentsLength()} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveState(isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveState(isInHistory)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveState(isInFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
