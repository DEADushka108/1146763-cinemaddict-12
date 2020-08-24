import FilterComponent from '../components/filter.js';
import {RenderPosition, render, replace} from '../utils/render.js';
import {getFiltredFilms} from '../utils/task.js';
import {FilterType} from '../const.js';

export default class MovieFilter {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange;
    this._onFilterChange = this._onFilterChange;

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const allFilms = this._moviesModel.allMovies;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFiltredFilms(allFilms, filterType).length,
        address: filterType.replace(/\s+/g, ``).trim().toLowerCase(),
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
