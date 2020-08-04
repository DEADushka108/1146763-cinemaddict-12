const FILTER_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];
const FILTER_ADDRESS = [`all`, `watchlist`, `history`, `favorites`];

const calculateCount = (filterName, filmsArray) => {
  let count;

  switch (filterName) {
    case `All movies`:
      count = filmsArray.length;
      break;
    case `Watchlist`:
      count = filmsArray.filter((it) => it.isInWatchlist).length;
      break;
    case `History`:
      count = filmsArray.filter((it) => it.isInHistory).length;
      break;
    case `Favorites`:
      count = filmsArray.filter((it) => it.isInFavorites).length;
      break;
  }

  return count;
};

const generateFilters = (filmsArray) => {
  return FILTER_NAMES.map((it, i) => {
    return {
      name: it,
      adress: FILTER_ADDRESS[i],
      count: calculateCount(FILTER_NAMES[i], filmsArray),
    };
  });
};

export {generateFilters};
