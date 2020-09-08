import AbstractSmartView from './abstract-smart-view.js';
import {SHAKE_CLASS} from '../const.js';
import moment from 'moment';
import he from 'he';

const ButtonText = {
  DELETE: `Delete`,
  DELETING: `Deleting...`
};

const createCommentsTemplate = (allComments) => {
  return allComments.map(({emotion, comment, date, author, id}) => {
    const setDateView = () => new Date().setMonth(new Date().getMonth() - 1) > date ? moment(date).format(`YYYY/MM/DD HH:mm`) : moment(date).fromNow();
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${setDateView()}</span>
            <button data-id="${id}" class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createFilmDetailsCommentsTemplate = (comments) => {

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>
        <ul class="film-details__comments-list">
          ${createCommentsTemplate(comments)}
        </ul>
      </section>`
  );
};

export default class FilmDetailsComments extends AbstractSmartView {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._comments);
  }

  setDeleteButtonHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      const comment = evt.target.closest(`.film-details__comment`);
      if (comment.classList.contains(SHAKE_CLASS)) {
        comment.classList.remove(SHAKE_CLASS);
      }

      evt.preventDefault();
      evt.target.disabled = true;
      evt.target.textContent = ButtonText.DELETING;
      callback(comment.dataset.id);
    });
  }

  shakeComment(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);
    const comment = this.getElement().querySelectorAll(`.film-details__comment`)[index];
    const deleteButton = comment.querySelector(`.film-details__comment-delete`);

    comment.disabled = false;
    comment.classList.add(SHAKE_CLASS);
    deleteButton.disabled = false;
    deleteButton.textContent = ButtonText.DELETE;
  }
}
