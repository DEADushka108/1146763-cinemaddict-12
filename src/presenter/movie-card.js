import FilmCardComponent from '../components/film-card.js';
<<<<<<< HEAD
import FilmDetailsComponent from '../components/film-details.js';
import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import FilmDetailsControlsComponent from '../components/film-details-controls.js';
import FilmDetailsNewCommentComponent from '../components/film-details-new-comment.js';
import Adapter from '../models/adapter.js';
import {render, removeChild, appendChild, replace, remove} from '../utils/render.js';
import {BODY} from '../const.js';

export const SHAKE_ANIMATION_TIMEOUT = 600;

const ESC_KEYCODE = 27;
=======
import FilmPopupComponent from '../components/film-popup.js';
import CommentsPresenter from '../presenter/movie-comments.js';
import CardControlsComponent from '../components/card-controls.js';
import {render, replace, remove} from '../utils/render.js';

export default class MovieCardPresenter {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611

    this._film = null;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._cardControlsComponent = null;
    this._commentsPresenter = null;

<<<<<<< HEAD
export default class FilmPresenter {
  constructor(film, container, onDataChange, onViewChange, onCommentsChange, api, commentsModel) {
    this._film = film;
    this._container = container;
    this._onCommentsChange = onCommentsChange;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;
    this._commentsModel = commentsModel;

    this._comments = null;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsControlsComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent();
    this._newCommentContainer = null;

    this._сlosePopupOnEscPress = this._сlosePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    remove(this._filmDetailsNewCommentComponent);

    document.removeEventListener(`keydown`, this._сlosePopupOnEscPress);
  }

  _сlosePopupOnEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._onViewChange();

      this._mode = Mode.CLOSED;
    }
  }

  _showPopupOnClick() {
    this._onViewChange();
    this.renderComments();

    document.addEventListener(`keydown`, this._сlosePopupOnEscPress);

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => {
      if (this._mode === Mode.OPEN) {
        this._onCommentsChange(this, null, comment, this._film);
      }
    });

    appendChild(BODY, this._filmDetailsComponent);
    this._mode = Mode.OPEN;
  }

  _closePopupOnClick() {
    this._onViewChange();
    this._mode = Mode.CLOSED;
  }

  _closePopup() {
    this._filmDetailsNewCommentComponent.reset();
    removeChild(this._filmDetailsCommentsComponent);
    removeChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._сlosePopupOnEscPressHandler);
    this._filmDetailsNewCommentComponent.removeCommentHandler();
    this._mode = Mode.CLOSED;
    this._onDataChange(this, this._film, Adapter.clone(this._film));
  }

  _renderFilmCard(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardComponent.setClickHandler(this._showPopupOnClick);

    this._filmCardComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();

      const newFilm = Adapter.clone(film);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();

      const newFilm = Adapter.clone(film);
      newFilm.isInHistory = !newFilm.isInHistory;

      if (newFilm.isInHistory) {
        newFilm.watchingDate = new Date();
      } else {
        newFilm.watchingDate = null;
      }

      this._onDataChange(this, film, newFilm);
    });

    this._filmCardComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();

      const newFilm = Adapter.clone(film);
      newFilm.isInFavorites = !newFilm.isInFavorites;

      this._onDataChange(this, film, newFilm);
    });


    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  _renderFilmDetails(film) {
    this._film = film;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._renderFilmDetailsControls(film);
    this._newCommentContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._filmDetailsComponent.setClickHandler(this._closePopupOnClick);

    if (oldFilmDetailsComponent) {
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

      this._filmDetailsNewCommentComponent.rerender();
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentComponent);
    }
  }

  _renderFilmDetailsControls(film) {
    if (this._filmDetailsControlsComponent) {
      remove(this._filmDetailsControlsComponent);
    }

    this._filmDetailsControlsComponent = new FilmDetailsControlsComponent(film);
    render(this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`), this._filmDetailsControlsComponent);

    this._filmDetailsControlsComponent.setAddToWatchlistHandler((evt) => {
      evt.target.checked = !evt.target.checked ? evt.target.value : false;

      const newFilm = Adapter.clone(film);
      newFilm.isInWatchlist = !newFilm.isInWatchlist;
      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsControlsComponent.setAlreadyWatchedHandler((evt) => {
      evt.target.checked = !evt.target.checked ? evt.target.value : false;

      const newFilm = Adapter.clone(film);
      newFilm.isInHistory = !newFilm.isInHistory;

      if (newFilm.isInHistory) {
        newFilm.watchingDate = new Date();
      } else {
        newFilm.watchingDate = null;
      }

      this._onDataChange(this, film, newFilm);
    });

    this._filmDetailsControlsComponent.setAddToFavoritesHandler((evt) => {
      evt.target.checked = !evt.target.checked ? evt.target.value : false;

      const newFilm = Adapter.clone(film);
      newFilm.isInFavorites = !newFilm.isInFavorites;
      this._onDataChange(this, film, newFilm);
    });
  }

  render(film) {
    this._renderFilmCard(film);
    this._renderFilmDetails(film);
  }

  rerender(film) {
    this._renderFilmCard(film);
    this._renderFilmDetailsControls(film);
  }

  renderComments() {
    if (this._filmDetailsCommentsComponent) {
      remove(this._filmDetailsCommentsComponent);
    }

    this._api.getComment(this._film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments);
      this._comments = this._commentsModel.getComments();
      this._filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(this._comments);

      appendChild(this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`), this._filmDetailsCommentsComponent);

      this._filmDetailsCommentsComponent.setDeleteButtonHandler((index) => {
        this._onCommentsChange(this, this._comments[index], null, this._film);
      });

      appendChild(this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`), this._filmDetailsNewCommentComponent);
    });
=======
    this._oldPopupComponent = null;

    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._showPopupHandler = this._showPopupHandler.bind(this);
    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._changeData = this._changeData.bind(this);
  }

  render(film) {
    this._film = film;

    const oldCardControlsComponent = this._cardControlsComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._cardControlsComponent = new CardControlsComponent(film.controls);

    this._filmCardComponent.setClickHandlers(this._showPopupHandler);

    this._cardControlsComponent.setControlsClickHandler(this._changeData);

    if (oldCardControlsComponent && oldFilmPopupComponent) {
      replace(this._cardControlsComponent, oldCardControlsComponent);
      return;
    }

    render(this._container, this._filmCardComponent);
    render(this._filmCardComponent.getElement(), this._cardControlsComponent);
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      this._closePopupHandler();
    }
  }

  _changeData(field) {
    const changedData = Object.assign({},
        this._film.controls,
        {[field]: !this._film.controls[field]});

    this._dataChangeHandler(this._film,
        Object.assign({},
            this._film,
            {controls: changedData}
        ));
  }

  _showPopupHandler() {
    this._viewChangeHandler();
    this._filmPopupComponent = new FilmPopupComponent(this._film);
    render(document.body, this._filmPopupComponent);
    this._commentsPresenter = new CommentsPresenter(this._filmPopupComponent.getElement().querySelector(`form`), this._film.comments);
    this._commentsPresenter.render();

    this._filmPopupComponent.setCloseButtonClickHandler(this._closePopupHandler);

    document.body.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._escapeButtonHandler);
  }

  _closePopupHandler() {
    this._dataChangeHandler(this._film,
        Object.assign({},
            this._film,
            this._filmPopupComponent.getControlsStatus(),
            {comments: this._commentsPresenter.getComments()}
        ));
    this._commentsPresenter.destroy();
    this._deletePopup();
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _deletePopup() {
    if (this._filmPopupComponent) {
      remove(this._filmPopupComponent);
      document.removeEventListener(`keydown`, this._escapeButtonHandler);
      document.body.classList.remove(`hide-overflow`);
    }
  }

<<<<<<< HEAD
  shakeTextarea() {
    const textarea = this._filmDetailsNewCommentComponent.getElement().querySelector(`.film-details__comment-input`);
    textarea.disabled = false;
    textarea.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      textarea.style.animation = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeComment(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);
    const comment = this._filmDetailsCommentsComponent.getElement().querySelectorAll(`.film-details__comment`)[index];
    comment.disabled = false;
    comment.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      comment.style.animation = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  resetTextarea() {
    this._filmDetailsNewCommentComponent.reset();
=======
  setDefaultView() {
    this._deletePopup();
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611
  }
}
