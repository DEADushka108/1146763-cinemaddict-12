import AbstractComponent from "./abstract-component";

const UserRating = {
  NOVICE: 10,
  MOVIE_BUFF: 20,
};

const UserTitles = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

export const getUserTitle = (watchedFilms) => {

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

export default class UserProfile extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this.refreshTitle = this.refreshTitle.bind(this);
    this._filmsModel.setDataChangeHandler(this.refreshTitle);
  }

  getTemplate() {
    return createUserProfileTemplate(this._filmsModel.getWatchedFilms().length);
  }
  refreshTitle() {
    this._element.querySelector(`.profile__rating`).textContent = getUserTitle(this._filmsModel.getWatchedFilms().length);
  }
}
