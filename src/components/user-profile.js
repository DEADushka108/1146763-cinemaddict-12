import {createElement} from '../util.js';

const UserRating = {
  NOVICE: 10,
  MOVIE_BUFF: 20,
};

const UserTitles = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const getUserTitle = (films) => {
  const watchedFilms = films.filter((it) => it.isInHistory).length;

  if (watchedFilms <= UserRating.NOVICE) {
    return UserTitles.NOVICE;
  } else if (watchedFilms > UserRating.NOVICE && watchedFilms <= UserRating.MOVIE_BUFF) {
    return UserTitles.FAN;
  } else if (watchedFilms > UserRating.MOVIE_BUFF) {
    return UserTitles.MOVIE_BUFF;
  } else {
    return ``;
  }
};

const createUserProfileTemplate = (films) => {
  const title = getUserTitle(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createUserProfileTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
