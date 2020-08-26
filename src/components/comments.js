import AbstractComponent from './abstract-component.js';

import he from 'he';
import moment from 'moment';

const Emojis = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const createEmojiInputTemplate = (emojis) => {

  return (emojis.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  ).join(`\n`));
};

const createCommentTemplates = (comments) => {
  return comments.map((comment) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment.text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).format(`YYYY/MM/DD HH:mm`)}</span>
            <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createCommentsTemplate = (comments) => {
  const commentTemplates = createCommentTemplates(comments);
  const commentsCount = comments.length;

  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
        <ul class="film-details__comments-list">
          ${commentTemplates}
        </ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>
          <div class="film-details__emoji-list">
            ${createEmojiInputTemplate(Emojis)}
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
    const text = this.getElement().querySelector(`.film-details__comment-input`).value;

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

      imgContainerElement.innerHTML = `<img src="images/emoji/${this._pickedEmoji}.png" width="55" height="55" alt="emoji-${this._pickedEmoji}">`;
    });
  }
}
