import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/details.js';
import {render, RenderPosition, removeChild, appendChild, replace} from '../utils/render.js';
import FilmDetailsNewCommentComponent from '../components/details-new-comment.js';

const KeyCode = {
  ESC: 27,
};

const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

const body = document.querySelector(`body`);

export default class MovieCard {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsNewCommentComponent = null;
    this._newCommentContainer = null;

    this._closePopupOnClick = this._closePopupOnClick.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnEscPress = this._closePopupOnEscPress.bind(this);
  }

  _showPopupOnClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;

    const newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    appendChild(newCommentContainer, this._filmDetailsNewCommentComponent);
    appendChild(body, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._closePopupOnEscPress);
  }

  _closePopupOnClick() {
    this._onViewChange();
  }

  _closePopupOnEscPress(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onViewChange();
    }
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent(film);

    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    this._filmCardComponent.setClickHandler(this._showPopupOnClick);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    this._filmCardComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInWatchlist: !this._film.isInWatchlist});
      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmCardComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInHistory: !this._film.isInHistory});
      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmCardComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInFavorites: !this._film.isInFavorites});
      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInWatchlist: !this._film.isInWatchlist});
      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInHistory: !this._film.isInHistory});
      this._onDataChange(this, oldFilm, newFilm);
    });

    this._filmDetailsComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();

      const oldFilm = this._film;
      const newFilm = Object.assign({}, this._film, {isInFavorites: !this._film.isInFavorites});
      this._onDataChange(this, oldFilm, newFilm);
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _closePopup() {
    this._mode = Mode.CLOSED;
    this._filmDetailsNewCommentComponent.reset();
    removeChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }

}
