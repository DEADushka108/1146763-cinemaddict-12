import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/details.js';
import {render, RenderPosition, removeChild, appendChild, replace, remove} from '../utils/render.js';
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
  constructor(container, onDataChange, onViewChange, comments, onCommentsChange) {
    this._container = container;
    this._comments = comments;

    this._onCommentsChange = onCommentsChange;
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

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    remove(this._filmDetailsNewCommentComponent);
    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
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

  render(film, comments) {
    this._comments = comments;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film, this._comments);
    this._filmDetailsComponent = new FilmDetailsComponent(film, this._comments);
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent(film);

    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    this._filmCardComponent.setClickHandler(this._showPopupOnClick);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    this._filmCardComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInWatchlist: !film.isInWatchlist});
    });

    this._filmCardComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInHistory: !film.isInHistory});
    });

    this._filmCardComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInFavorites: !film.isInFavorites});
    });

    this._filmDetailsComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInWatchlist: !film.isInWatchlist});
    });

    this._filmDetailsComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInHistory: !film.isInHistory});
    });

    this._filmDetailsComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._updateFilm(film, {isInFavorites: !film.isInFavorites});
    });

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => {
      if (this._mode === Mode.OPEN) {
        
      };
    });

    this._filmDetailsComponent.setDeleteButtonHandler((index) => {
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  _updateFilm(film, update) {

    const oldFilm = film;
    const newFilm = Object.assign({}, film, update);

    this._onDataChange(this, oldFilm, newFilm);
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
