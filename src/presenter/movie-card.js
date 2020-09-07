import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import FilmDetailsCommentsView from '../view/film-details-comments.js';
import FilmDetailsControlsView from '../view/film-details-controls.js';
import FilmDetailsNewCommentView from '../view/film-details-new-comment.js';
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

    this._filmCardView = null;
    this._filmDetailsView = null;
    this._filmDetailsControlsView = null;
    this._filmDetailsCommentsView = null;
    this._filmDetailsNewCommentView = new FilmDetailsNewCommentView();
    this._newCommentContainer = null;
    this._commentsModel = new CommentsModel();

    this._closePopupOnEscPress = this._closePopupOnEscPress.bind(this);
    this._showPopupOnClick = this._showPopupOnClick.bind(this);
    this._closePopupOnClick = this._closePopupOnClick.bind(this);
    this._changeData = this._changeData.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
  }

  destroy() {
    remove(this._filmCardView);
    remove(this._filmDetailsView);
    remove(this._filmDetailsNewCommentView);

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

    this._filmDetailsNewCommentView.setAddCommentHandler(this._addComment);

    appendChild(document.body, this._filmDetailsView);
    this._mode = Mode.OPEN;
  }

  _closePopupOnClick() {
    this._onViewChange();
    this._mode = Mode.CLOSED;
  }

  _closePopup() {
    this._filmDetailsNewCommentView.reset();
    if (this._filmDetailsCommentsView) {
      removeChild(this._filmDetailsCommentsView);
    }
    removeChild(this._filmDetailsView);
    document.removeEventListener(`keydown`, this._closePopupOnEscPress);
    this._filmDetailsNewCommentView.removeCommentHandler();
    this._mode = Mode.CLOSED;
    this._onDataChange(this, this._film, Adapter.clone(this._film));
  }

  _renderFilmCard(film) {
    this._film = film;

    const oldFilmCardView = this._filmCardView;
    this._filmCardView = new FilmCardView(film);
    this._filmCardView.setClickHandler(this._showPopupOnClick);

    this._filmCardView.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmCardView.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmCardView.setAddToFavoritesHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.FAVORITE);
    });


    if (oldFilmCardView) {
      replace(this._filmCardView, oldFilmCardView);
    } else {
      render(this._container, this._filmCardView);
    }
  }

  _renderFilmDetails(film) {
    this._film = film;
    const oldFilmDetailsView = this._filmDetailsView;

    this._filmDetailsView = new FilmDetailsView(film);
    this._renderFilmDetailsControls(film);
    this._newCommentContainer = this._filmDetailsView.getElement().querySelector(`.form-details__bottom-container`);
    this._filmDetailsView.setClickHandler(this._closePopupOnClick);

    if (oldFilmDetailsView) {
      replace(this._filmDetailsView, oldFilmDetailsView);

      this._filmDetailsNewCommentView.rerender();
      appendChild(this._newCommentContainer, this._filmDetailsNewCommentView);
    }
  }

  _renderFilmDetailsControls(film) {
    if (this._filmDetailsControlsView) {
      remove(this._filmDetailsControlsView);
    }

    const {isInWatchlist, isInHistory, isInFavorites} = film;
    this._filmDetailsControlsView = new FilmDetailsControlsView({isInWatchlist, isInHistory, isInFavorites});
    render(this._filmDetailsView.getElement().querySelector(`.form-details__top-container`), this._filmDetailsControlsView);

    this._filmDetailsControlsView.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.WATCHLIST);
    });

    this._filmDetailsControlsView.setAlreadyWatchedHandler((evt) => {
      evt.preventDefault();
      this._changeData(film, Field.HISTORY);
    });

    this._filmDetailsControlsView.setAddToFavoritesHandler((evt) => {
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
    if (this._filmDetailsCommentsView) {
      remove(this._filmDetailsCommentsView);
    }

    this._api.getComment(this._film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments);
      this._comments = this._commentsModel.getComments();
      this._filmDetailsCommentsView = new FilmDetailsCommentsView(this._comments);

      appendChild(this._filmDetailsView.getElement().querySelector(`.form-details__bottom-container`), this._filmDetailsCommentsView);

      this._filmDetailsCommentsView.setDeleteButtonHandler(this._deleteComment);

      appendChild(this._filmDetailsView.getElement().querySelector(`.film-details__comments-wrap`), this._filmDetailsNewCommentView);
    });
  }

  _addComment(comment) {
    if (this._mode === Mode.OPEN) {
      this._api.addComment(this._film.id, JSON.stringify(comment))
      .then((res) => res.json())
      .then((response) => {
        this._commentsModel.setComments(response.comments);
        this._resetTextarea();
        this._renderComments();
      })
      .catch(() => {
        this._filmDetailsNewCommentView.shakeBlock();
      });
    }
  }

  _deleteComment(commentId) {
    this._api.deleteComment(commentId)
        .then(() => {
          this._commentsModel.removeComment(commentId);
          this._renderComments();
        })
        .catch(() => {
          this._filmDetailsCommentsView.shakeComment(commentId);
        });
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSED) {
      this._closePopup();
    }
  }

  _resetTextarea() {
    this._filmDetailsNewCommentView.reset();
  }

  _changeData(film, field) {
    film[field] = !film[field];

    if (field === Field.HISTORY) {
      film.watchingDate = film[field] ? new Date() : null;
    }

    this._onDataChange(this, film.id, film);
  }
}
