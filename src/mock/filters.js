import {FilterType} from '../const.js';

const filterAddresses = [`all`, `watchlist`, `history`, `favorites`];

const filterValues = Object.values(FilterType);

/**
 * Calculate how much filter's name contains array
 * @param {String} filterName
 * @param {Array} filmsArray
 * @return {Number} count
 */
const calculateCount = (filterName, filmsArray) => {
  let count;

  switch (filterName) {
    case FilterType.ALL:
      count = filmsArray.length;
      break;
    case FilterType.WATCHLIST:
      count = filmsArray.filter((it) => it.isInWatchlist).length;
      break;
    case FilterType.HISTORY:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
    case FilterType.FAVORITES:
      count = filmsArray.filter((it) => it.isInFavorites).length;
      break;

    default:
      throw new Error(`No matching filters`);
  }

  return count;
};

/**
 * Generate filters info
 * @param {Array} filmsArray
 * @return {Object}
 */
export const generateFilters = (filmsArray) => {
  return filterValues.map((it, i) => {
    return {
      name: it,
      address: filterAddresses[i],
      count: calculateCount(filterValues[i], filmsArray),
    };
  });
};
