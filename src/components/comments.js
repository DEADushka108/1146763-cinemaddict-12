import {formatDate} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

import {encode} from 'he';

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${formatDate(comment.date)}</span>
            <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createCommentsTemplate = (comments) => {
  const commentsMarkup = createCommentsMarkup(comments);
  const commentsCount = comments.length;

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>`
  );
};

export default class Comments extends AbstractComponent {
  constructor(comments) {
    super();

    this._comments = comments;

    this._pickedEmoji = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createCommentsTemplate(this._comments);
  }

  setDeleteHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      evt.preventDefault();

      handler(evt.target.dataset.id);
    });
  }

  getInput(handler) {
    const text = encode(this.getElement().querySelector(`.film-details__comment-input`).value);

    handler(text, this._pickedEmoji);
  }

  _subscribeOnEvents() {
    const newCommentContainerElement = this.getElement().querySelector(`.film-details__new-comment`);

    newCommentContainerElement.addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const imgContainerElement = newCommentContainerElement.querySelector(`.film-details__add-emoji-label`);

      this._pickedEmoji = evt.target.value;

      imgContainerElement.innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}">`;
    });
  }
}
