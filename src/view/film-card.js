import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';
import {MINUTES_PER_HOUR} from '../const.js';

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating, releaseDate, duration, genres, isInFavorites, isInWatchlist, isInHistory} = film;

  const DescriptionLength = {
    MAX: 140,
    REQUIRE: 139,
    MIN: 0,
  };

  const RatingQuality = {
    POOR: 0,
    AVERAGE: 5,
    GOOD: 7,
  };

  const RatingActiveClass = {
    POOR: `poor`,
    AVERAGE: `average`,
    GOOD: `good`,
  };

  const getRatingState = (filmRating) => {

    if (filmRating >= RatingQuality.POOR && filmRating <= RatingQuality.AVERAGE) {
      return RatingActiveClass.POOR;
    }

    if (filmRating > RatingQuality.AVERAGE && filmRating <= RatingQuality.GOOD) {
      return RatingActiveClass.AVERAGE;
    }

    if (filmRating > RatingQuality.GOOD) {
      return RatingActiveClass.GOOD;
    }

    return ``;
  };

  const getCommentsLength = () => comments ? comments.length : 0;

  const getActiveState = (isCheckedParameter) => isCheckedParameter ? `film-card__controls-item--active` : ``;

  const getDescription = () => description.length > DescriptionLength.MAX ? `${description.substring(DescriptionLength.MIN, DescriptionLength.REQUIRE)}...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating film-card__rating--${getRatingState(rating)}">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${Math.trunc(duration / MINUTES_PER_HOUR)}h ${duration % MINUTES_PER_HOUR}m</span>
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
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClickHandler(callback) {
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, callback));
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
