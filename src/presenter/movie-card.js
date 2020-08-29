import FilmCardComponent from '../components/film-card.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsPresenter from '../presenter/movie-comments.js';
import Adapter from '../models/client-server-adapter.js';
import {render, replace, remove} from '../utils/render.js';

export default class MovieCardPresenter {
  constructor(container, dataChangeHandler, api) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._api = api;

    this._film = null;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._showPopupHandler = this._showPopupHandler.bind(this);
    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._changeData = this._changeData.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(film);

    this._filmCardComponent.setClickHandlers(this._showPopupHandler);
    this._filmCardComponent.setControlsClickHandler(this._changeData);

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      return;
    }

    render(this._container, this._filmCardComponent);
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
    const newData = Adapter.clone(this._film);

    newData.controls = changedData;

    if (field === `isInHistory`) {
      newData.watchingDate = new Date();
    }

    this._dataChangeHandler(this._film, newData);
  }

  _showPopupHandler() {
    this._filmPopupComponent = new FilmPopupComponent(this._film);
    this._filmPopupComponent.setControlsHandler(this._changeData);
    render(document.body, this._filmPopupComponent);
    this._api.getComment(this._film.id)
      .then((response) => {
        this._film.comments = response;
        this._commentsPresenter = new CommentsPresenter(this._filmPopupComponent.getElement().querySelector(`form`), this._film.comments, this._commentDeleteHandler, this._commentAddHandler);
        this._commentsPresenter.render();
      });

    this._filmPopupComponent.setCloseButtonClickHandler(this._closePopupHandler);

    document.body.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._escapeButtonHandler);
  }

  _closePopupHandler() {
    this._commentsPresenter.destroy();
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._escapeButtonHandler);
    document.body.classList.remove(`hide-overflow`);
  }

  _commentAddHandler(comment) {
    this._commentsPresenter.disableInputs();
    this._api.addComment(this._film.id, JSON.stringify(comment))
      .then((res) => res.json())
      .then((response) => {
        this._film.comments = response[`comments`];
        this.render(this._film);
        this._commentsPresenter.setComments(this._film.comments);
      })
      .catch(() => {
        this._commentsPresenter.activateInputs();
        this._commentsPresenter.errorHandler();
      });
  }

  _commentDeleteHandler(id) {
    this._api.deleteComment(id)
      .then(() => {
        this._film.comments = this._film.comments.filter((comment) => comment.id !== id);
        this.render(this._film);
        this._commentsPresenter.setComments(this._film.comments);
      })
      .catch(() => {
        this._commentsPresenter.activateDeleteButtons();
      });
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
