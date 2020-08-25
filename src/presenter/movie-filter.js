import FilterComponent from '../components/filters.js';
import {FilterType} from '../const.js';
import {render, replace} from '../utils/render.js';
import {getFiltredFilms} from '../utils/filters.js';

const FILTERS = [`All movies`, `Watchlist`, `History`, `Favorites`];

export default class FilterPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);

    this._filmsModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getAllFilms();
    const filters = Object.values(FilterType).map((filterType, i) => {
      return {
        link: filterType,
        name: FILTERS[i],
        count: getFiltredFilms(allFilms, filterType).length,
        isChecked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, `afterbegin`);
    }
  }

  _filterChangeHandler(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _dataChangeHandler() {
    this.render();
  }
}
