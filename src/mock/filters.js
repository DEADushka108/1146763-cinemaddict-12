const Filter = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};
const filterAddresses = [`all`, `watchlist`, `history`, `favorites`];

const filterValues = Object.values(Filter);

/**
 * Calculate how much filter's name contains array
 * @param {String} filterName
 * @param {Array} filmsArray
 * @return {Number} count
 */
const calculateCount = (filterName, filmsArray) => {
  let count;

  switch (filterName) {
    case Filter.ALL:
      count = filmsArray.length;
      break;
    case Filter.WATCHLIST:
      count = filmsArray.filter((it) => it.isInWatchlist).length;
      break;
    case Filter.HISTORY:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
    case Filter.FAVORITES:
      count = filmsArray.filter((it) => it.isInFavorites).length;
      break;

    default:
      count = -1;
  }

  return count;
};

/**
 * Generate filters info
 * @param {Array} filmsArray
 * @return {Object}
 */
const generateFilters = (filmsArray) => {
  return filterValues.map((it, i) => {
    return {
      name: it,
      address: filterAddresses[i],
      count: calculateCount(filterValues[i], filmsArray),
    };
  });
};

export {generateFilters};
