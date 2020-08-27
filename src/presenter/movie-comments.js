import CommentsComponent from '../components/comments.js';
import {render, replace} from '../utils/render.js';

const createComment = (text, emoji) => {
  return {
    id: String(new Date() + Math.random()),
    text,
    emoji,
    author: `user`,
    date: new Date()
  };
};

export default class CommentsPresenter {
  constructor(container, comments) {
    this._container = container;
    this._currentComments = comments.slice();

    this._commentsComponent = null;

    this.destroy = this.destroy.bind(this);
    this._deleteComment = this._deleteComment.bind(this);
    this._addComment = this._addComment.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  render() {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(this._currentComments);

    this._commentsComponent.setDeleteHandler(this._deleteComment);
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

  _keydownHandler(evt) {
    if (evt.key === `Enter` && evt.ctrlKey) {
      this._commentsComponent.getInput(this._addComment);
    }
  }

  _addComment(text, emoji) {
    if (text && emoji) {
      this._currentComments.push(createComment(text, emoji));
      this.render();
    }
  }

  _deleteComment(id) {
    this._currentComments = this._currentComments.filter((it) => it.id !== id);
    this.render();
  }
}
