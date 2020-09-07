import FilterView from '../view/filter.js';
import {RenderPosition, render, replace} from '../utils/render.js';
import {getFilteredFilms} from '../utils/filter.js';
import {FilterType} from '../const.js';

export default class FilterPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const oldFilterView = this._filterView;
    this._filterView = new FilterView(this._createFilters());
    this._filterView.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterView) {
      replace(this._filterView, oldFilterView);
    } else {
      render(this._container, this._filterView, RenderPosition.AFTERBEGIN);
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
