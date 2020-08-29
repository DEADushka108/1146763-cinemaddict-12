import AbstractSmartComponent from './abstract-smart-component.js';
import {SHAKE_ANIMATION_TIMEOUT} from '../presenter/movie-card.js';

const EmojiAddress = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const createEmojiInputTemplate = (emojis, checkedEmoji) => {

  return (emojis.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji === checkedEmoji ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  ).join(`\n`));
};

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}" data-emoji-type="${emoji ? emoji : `none`}">`;
};

const createFilmDetailsCommentSectionTemplate = (comment, emojiTemplate, emoji) => {

  const setImgTemplate = () => emojiTemplate ? emojiTemplate : ``;

  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${setImgTemplate()}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
        </label>
        <div class="film-details__emoji-list">
        ${createEmojiInputTemplate(Object.values(EmojiAddress), emoji)}
        </div>
      </div>`
  );
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._emojiTemplate = null;
    this._emoji = null;
    this._comment = null;

    this._subscribeOnEvents();
  }

  reset() {
    this._emojiTemplate = null;
    this._emoji = null;
    this._comment = null;

    this.rerender();
  }

  restoreHandlers() {
    this._subscribeOnEvents();
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.restoreHandlers();
  }

  _subscribeOnEvents() {
    this.getElement().querySelectorAll(`input`).forEach((emoji) => {
      emoji.addEventListener(`change`, (evt) => {
        this._emoji = evt.target.value;
        this._emojiTemplate = createEmojiImageTemplate(this._emoji);
        this.rerender();
      });
    });

    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, (evt) => {
        this._comment = evt.target.value;
      });
  }

  getTemplate() {
    return createFilmDetailsCommentSectionTemplate(this._comment, this._emojiTemplate, this._emoji);
  }

  setAddCommentHandler(callback) {
    this._callback = callback;
    document.addEventListener(`keydown`, this.newCommentSubmitHandler);
  }

  removeCommentHandler() {
    document.removeEventListener(`keydown`, this.newCommentSubmitHandler);
  }

  newCommentSubmitHandler(evt) {

    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    const isCtrlAndEnterPressed = evt.ctrlKey && evt.key === `Enter`;

    const isEmojiChosen = this.getElement().querySelector(`.film-details__add-emoji-label img`) ? this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType : false;

    const isTextWritten = textarea.value;

    if (isCtrlAndEnterPressed && isEmojiChosen && isTextWritten) {
      textarea.disabled = true;

      const comment = {
        'emotion': this.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emojiType,
        'comment': textarea.value,
        'date': new Date(),
      };
    } else {
      textarea.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

      setTimeout(() => {
        textarea.style.animation = ``;
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  }
}
