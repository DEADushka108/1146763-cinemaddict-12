import Observer from '../utils/observer.js';
import {FilterType} from '../const.js';
import {getFilteredFilms} from '../utils/filter.js';


export default class FilmsModel extends Observer {
  constructor() {
    super();
    this._films = [];
    this._activeFilterType = FilterType.ALL;
    this._filterChangeHandlers = [];
  }

  get() {
    return getFilteredFilms(this._films, this._activeFilterType);
  }

  getWatchedFilms() {
    return getFilteredFilms(this._films, FilterType.HISTORY);
  }

  getAll() {
    return this._films;
  }

  set(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandlers(handler) {
    this._filterChangeHandlers.push(handler);
  }

  update(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
  }
}
