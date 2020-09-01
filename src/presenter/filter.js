import FilterComponent from '../components/filter.js';
import {RenderPosition, render, replace} from '../utils/render.js';
import {getFilteredFilms} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class FilterPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(this._createFilters());
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _createFilters() {
    return Object.values(FilterType).map((filterType) => ({
      name: filterType,
      count: getFilteredFilms(this._filmsModel.getAllFilms(), filterType).length,
      address: filterType.replace(/\s+/g, ``).trim().toLowerCase(),
      isChecked: filterType === this._activeFilterType,
    })
    );
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
