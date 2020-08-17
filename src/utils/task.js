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
      sortedFilms = shownFilms.sort((a, b) => b.year - a.year);
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

/**
* Get sorted array by rating
* @param {Array} array
* @return {Array} sorted array
*/
export const getTopRatedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.rating - a.rating);
};

/**
* Get sorted array by comments
* @param {Array} array
* @return {Array} sorted array
*/
export const getTopCommentedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.comments.length - a.comments.length);
};


