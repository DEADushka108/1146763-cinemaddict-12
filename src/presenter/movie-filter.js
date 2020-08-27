import FilterComponent from '../components/filters.js';
import {FilterType} from '../const.js';
import {render, replace, RenderPosition} from '../utils/render.js';
import {getFiltredFilms} from '../utils/filters.js';

const createFilter = (filter, films, checkedFilter) => ({
  name: filter,
  count: getFiltredFilms(films, filter).length,
  isChecked: filter === checkedFilter,
});

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
    const filters = Object.values(FilterType).map((filterType) => createFilter(filterType, this._filmsModel.getAllFilms(), this._activeFilterType));
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._filterChangeHandler);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
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
