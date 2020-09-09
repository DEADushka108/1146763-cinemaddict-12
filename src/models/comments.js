import Observer from '../utils/observer.js';

export default class CommentsModel extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  get() {
    return this._comments;
  }

  set(comments) {
    this._comments = [...comments];
    this._callHandlers(this._dataChangeHandlers);
  }

  remove(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      return;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
  }
}
