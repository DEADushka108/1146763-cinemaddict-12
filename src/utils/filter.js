import {FilterType} from "../const.js";

const getWatchlistFilms = (films) => films.filter((film) => film.isInWatchlist);

const getFavoriteFilms = (films) => films.filter((film) => film.isInFavorites);

export const getWatchedFilms = (films) => films.filter((film) => film.isInHistory);

export const getFilteredFilms = (films, filterType) => {
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
