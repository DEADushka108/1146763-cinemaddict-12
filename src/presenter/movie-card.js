import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import FilmDetailsCommentsComponent from '../components/film-details-comments.js';
import FilmDetailsControlsComponent from '../components/film-details-controls.js';
import FilmDetailsNewCommentComponent from '../components/film-details-new-comment.js';
import CommentsModel from '../models/comments.js';
import Adapter from '../models/adapter.js';
import {render, removeChild, appendChild, replace, remove} from '../utils/render.js';

const ESC_KEYCODE = 27;

const Mode = {
  CLOSED: `closed`,
  OPEN: `open`,
};

const Field = {
  HISTORY: `isInHistory`,
  FAVORITE: `isInFavorites`,
  WATCHLIST: `isInWatchlist`,
};

export default class FilmPresenter {
  constructor(film, container, onDataChange, onViewChange, api) {
    this._film = film;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._comments = null;
    this._mode = Mode.CLOSED;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._filmDetailsControlsComponent = null;
    this._filmDetailsCommentsComponent = null;
    this._filmDetailsNewCommentComponent = new FilmDetailsNewCommentComponent();
    this._newCommentContainer = null;
    this._commentsModel = new CommentsModel();

    this._closePopupOnEscPress = this._closePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
    this._changeData = this._changeData.bind(this);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    remove(this._filmDetailsNewCommentComponent);

    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
  }

  _closePopupOnEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._onViewChange();

      this._mode = Mode.CLOSED;
    }
  }

  _showPopupOnClick() {
    this._onViewChange();
    this._renderComments();

    document.addEventListener(`keydown`, this._closePopupOnEscPress);

    this._filmDetailsNewCommentComponent.setAddCommentHandler((comment) => {
      if (this._mode === Mode.OPEN) {
        this._api.addComment(this._film.id, JSON.stringify(comment))
        .then((res) => res.json())
        .then((response) => {
          this._commentsModel.setComments(response.comments);
          this._resetTextarea();
          this._renderComments();
        })
        .catch(() => {
          this._filmDetailsNewCommentComponent.shakeBlock();
        });
      }
    });

    appendChild(document.body, this._filmDetailsComponent);
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
    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
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
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmCardComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmCardComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.FAVORITE);
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

    const {isInWatchlist, isInHistory, isInFavorites} = film;
    this._filmDetailsControlsComponent = new FilmDetailsControlsComponent({isInWatchlist, isInHistory, isInFavorites});
    render(this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`), this._filmDetailsControlsComponent);

    this._filmDetailsControlsComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmDetailsControlsComponent.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmDetailsControlsComponent.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.FAVORITE);
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

  _renderComments() {
    if (this._filmDetailsCommentsComponent) {
      remove(this._filmDetailsCommentsComponent);
    }

    this._api.getComment(this._film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments);
      this._comments = this._commentsModel.getComments();
      this._filmDetailsCommentsComponent = new FilmDetailsCommentsComponent(this._comments);

      appendChild(this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`), this._filmDetailsCommentsComponent);

      this._filmDetailsCommentsComponent.setDeleteButtonHandler((commentId) => {
        if (this._mode === Mode.OPEN) {
          this._api.deleteComment(commentId)
          .then(() => {
            this._commentsModel.removeComment(commentId);
            this._renderComments();
            this._filmsModel.updateFilms(commentId, this._film);
          })
          .catch(() => {
            this._filmDetailsCommentsComponent.shakeComment(commentId);
          });
        }
      });

      appendChild(this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-wrap`), this._filmDetailsNewCommentComponent);
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }

  _resetTextarea() {
    this._filmDetailsNewCommentComponent.reset();
  }

  _changeData(film, field) {
    const newFilm = Adapter.clone(film);
    newFilm[field] = !newFilm[field];

    if (field === Field.HISTORY) {
      if (newFilm[field]) {
        newFilm.watchingDate = new Date();
      } else {
        newFilm.watchingDate = null;
      }
    }

    this._onDataChange(this, film, newFilm);
  }
}
