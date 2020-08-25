import {SortType} from "../const.js";

/**
 * Create sorted sliced araay
 * @param {Array} films
 * @param {String} sortType
 * @param {Number} from
 * @param {Number} to
 * @return {Array}
 */
export const getSortedFilms = (films, sortType) => {
  let sortedFilms = [];
  const shownFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = shownFilms.sort((a, b) => b.release - a.release);
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
  return sortedFilms;
};

/**
* Get sorted array by rating
* @param {Array} array
* @return {Array} sorted array
*/
// export const getTopRatedFilms = (array) => {
//   return array.slice()
//               .sort((a, b) => b.rating - a.rating);
// };

/**
* Get sorted array by comments
* @param {Array} array
* @return {Array} sorted array
*/
// export const getTopCommentedFilms = (array) => {
//   return array.slice()
//               .sort((a, b) => b.comments.length - a.comments.length);
// };
