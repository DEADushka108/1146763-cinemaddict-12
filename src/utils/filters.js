import {FilterType} from "../const.js";

export const getWatchlistFilms = (films) => films.filter((film) => film.controls.isInWatchlist);

export const getWatchedFilms = (films) => films.filter((film) => film.controls.isInHistory);

export const getFavoriteFilms = (films) => films.filter((film) => film.controls.isInFavorites);

export const getFiltredFilms = (films, filterType) => {
  let filteredFilms = [];

  switch (filterType) {
    case FilterType.ALL:
      filteredFilms = films.slice();
      break;

    case FilterType.WATCHLIST:
      filteredFilms = getWatchlistFilms(films);
      break;

    case FilterType.HISTORY:
      filteredFilms = getWatchedFilms(films);
      break;

    case FilterType.FAVORITES:
      filteredFilms = getFavoriteFilms(films);
      break;
  }

  return filteredFilms;
};
