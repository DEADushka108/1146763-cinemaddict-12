import {FilterType} from '../const.js';
import {getFilteredFilms} from '../utils/filter.js';


export default class Films {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilteredFilms(this._films, this._activeFilterType);
  }

  getWatchedFilms() {
    return getFilteredFilms(this._films, FilterType.HISTORY);
  }

  getAllFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setDataChangeHandlers(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
