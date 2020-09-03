import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = [...comments];
    this._callHandlers(this._dataChangeHandlers);
  }

  removeComment(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      return;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
  }
}
