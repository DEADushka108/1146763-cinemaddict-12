const FILTER = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};
const FILTER_ADDRESS = [`all`, `watchlist`, `history`, `favorites`];

const filterValues = Object.values(FILTER);

/**
 * Calculate how much filter's name contain in data
 * @param {String} filterName
 * @param {Array} filmsArray
 * @return {Number} count
 */
const calculateCount = (filterName, filmsArray) => {
  let count;

  switch (filterName) {
    case FILTER.ALL:
      count = filmsArray.length;
      break;
    case FILTER.WATCHLIST:
      count = filmsArray.filter((it) => it.isInWatchlist).length;
      break;
    case FILTER.HISTORY:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
    case FILTER.FAVORITES:
      count = filmsArray.filter((it) => it.isInFavorites).length;
      break;
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
      adress: FILTER_ADDRESS[i],
      count: calculateCount(filterValues[i], filmsArray),
    };
  });
};

export {generateFilters};
