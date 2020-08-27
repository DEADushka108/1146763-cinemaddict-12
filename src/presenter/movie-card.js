import FilmCardComponent from '../components/film-card.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsPresenter from '../presenter/movie-comments.js';
import CardControlsComponent from '../components/card-controls.js';
import {render, replace, remove} from '../utils/render.js';

export default class MovieCardPresenter {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;

    this._film = null;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._cardControlsComponent = null;
    this._commentsPresenter = null;

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

  setDefaultView() {
    this._deletePopup();
  }
}
