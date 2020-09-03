import {SortType} from "../const.js";

/**
 * Create sorted sliced araay
 * @param {Array} films
 * @param {String} filterType
 * @param {Number} from
 * @param {Number} to
 * @return {Array}
 */
export const getSortedFilms = (films, filterType, from, to) => {
  let sortedFilms = [];
  const shownFilms = films.slice();

  switch (filterType) {
    case SortType.DATE:
      sortedFilms = shownFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = shownFilms;
      break;
    case SortType.COMMENTS:
      sortedFilms = shownFilms.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  return sortedFilms.slice(from, to);
};
