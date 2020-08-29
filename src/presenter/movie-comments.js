import CommentsComponent from '../components/comments.js';
import {render, replace} from '../utils/render.js';

const TIMEOUT = {
  ANIMATION: 600,
  STATIC: 2000
};

const createComment = (comment, emotion) => {
  return {
    comment,
    emotion,
    date: new Date()
  };
};

export default class CommentsPresenter {
  constructor(container, comments, commentDeleteHandler, commentAddHandler) {
    this._container = container;
    this._comments = comments;
    this._commentDeleteHandler = commentDeleteHandler;
    this._commentAddHandler = commentAddHandler;

    this._commentsComponent = null;

    this.destroy = this.destroy.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  render() {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(this._comments);

    this._commentsComponent.setDeleteHandler(this._commentDeleteHandler);
    document.addEventListener(`keydown`, this._keydownHandler);

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);

      return;
    }

    render(this._container, this._commentsComponent);
  }

  destroy() {
    this._commentsComponent.removeElement();
    document.removeEventListener(`keydown`, this._keydownHandler);
  }

  getComments() {
    return this._currentComments;
  }

  setComments(comments) {
    this._comments = comments;
    this.render();
  }

  _keydownHandler(evt) {
    if (evt.key === `Enter` && evt.ctrlKey) {
      this._commentAddHandler(createComment(...Object.values(this._commentsComponent.getInput())));
    }
  }

  activateDeleteButtons() {
    this._commentsComponent.activateDeleteButtons();
  }

  disableInputs() {
    this._commentsComponent.disableInputs();
  }

  activateInputs() {
    this._commentsComponent.activateInputs();
  }

  errorHandler() {
    this._commentsComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = `shake ${TIMEOUT.ANIMATION / 1000}s`;
    setTimeout(() => {
      this._commentsComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = ``;
    }, TIMEOUT.STATIC);
  }
}
