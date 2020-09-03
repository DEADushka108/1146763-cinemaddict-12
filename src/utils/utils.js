import {UserTitles} from '../const.js';

const FilmsNumber = {
  NOVICE: 1,
  FAN: 10,
  MOVIE_BUFF: 20,
};

export const getUserTitle = (watchedFilms) => {

  if (watchedFilms >= FilmsNumber.NOVICE && watchedFilms <= FilmsNumber.FAN) {
    return UserTitles.NOVICE;
  }

  if (watchedFilms > FilmsNumber.FAN && watchedFilms <= FilmsNumber.MOVIE_BUFF) {
    return UserTitles.FAN;
  }

  if (watchedFilms > FilmsNumber.MOVIE_BUFF) {
    return UserTitles.MOVIE_BUFF;
  }

  return ``;
};
