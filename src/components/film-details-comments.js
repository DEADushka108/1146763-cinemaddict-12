import AbstractSmartComponent from "./abstract-smart-component.js";
import moment from 'moment';
import he from 'he';

const createCommentsTemplate = (comments) => {
  return comments.map((comment) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).format(`YYYY/MM/DD hh:mm`)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createFilmDetailsCommentsTemplate = (comments) => {
  const commentsTemplate = createCommentsTemplate(comments);

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>
        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>
      </section>`
  );
};

export default class FilmDetailsComments extends AbstractSmartComponent {
  constructor(comments) {
    super();

    this._comments = comments;
  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._comments);
  }

  setDeleteButtonHandler(callback) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((button, index) => {
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        evt.target.disabled = true;
        evt.target.textContent = `Deleting...`;
        callback(index);
      });
    });
  }
}
