import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, releaseDate, duration, genres, isInFavorites, isInWatchlist, isInHistory} = film;

  const DescriptionLenght = {
    MAX: 140,
    REQUIRE: 139,
    MIN: 0,
  };

  const getCommentsLength = () => comments ? comments.length : 0;

  const getActiveState = (isCheckedParameter) => isCheckedParameter ? `film-card__controls-item--active` : ``;

  const getDescription = () => description.length > DescriptionLenght.MAX ? `${description.substring(DescriptionLenght.MIN, DescriptionLenght.REQUIRE)}...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${Math.trunc(duration / 60)}h ${duration % 60}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${getDescription()}</p>
      <a class="film-card__comments">${getCommentsLength()} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveState(isInWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveState(isInHistory)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveState(isInFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._comments);
  }

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, callback);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, callback);
  }

  setAddToWatchlistHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, callback);
  }

  setAlreadyWatchedHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, callback);
  }

  setAddToFavoritesHandler(callback) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, callback);
  }
}
