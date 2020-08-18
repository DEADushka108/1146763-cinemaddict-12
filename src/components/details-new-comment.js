import AbstractSmartComponent from './abstract-smart-component.js';

const EmojiAddress = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
};

const createFilmDetailsCommentSectionTemplate = (comment, emojiTemplate, emoji) => {

  const isCheckedEmoji = (checkedEmoji) => emoji === checkedEmoji ? `checked` : ``;
  const setImgTemplate = () => emojiTemplate ? emojiTemplate : ``;

  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${setImgTemplate()}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
        </label>
        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isCheckedEmoji(EmojiAddress.SMILE)}>
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isCheckedEmoji(EmojiAddress.SLEEPING)}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isCheckedEmoji(EmojiAddress.PUKE)}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isCheckedEmoji(EmojiAddress.ANGRY)}>
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>`
  );
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
  constructor() {
    super();

    this._emojiTemplate = null;
    this._emoji = null;
    this._textarea = null;

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

    const emojiArray = this.getElement().querySelectorAll(`input`);

    for (let i = 0; i < emojiArray.length; i++) {
      emojiArray[i].addEventListener(`change`, () => {
        this._emojiTemplate = createEmojiImageTemplate(Object.values(EmojiAddress)[i]);
        this._emoji = Object.values(EmojiAddress)[i];
        this.rerender();
      });
    }

    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.addEventListener(`input`, () => {
      this._comment = textarea.value;
    });
  }

  getTemplate() {
    return createFilmDetailsCommentSectionTemplate(this._comment, this._emojiTemplate, this._emoji);
  }
}
