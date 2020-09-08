import AbstractView from './abstract-view.js';
import {SortType} from '../const.js';

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active"> Sort by default </a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button"> Sort by date </a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button"> Sort by rating </a></li>
    </ul>`
  );
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;

    this._resetActiveClass = this._resetActiveClass.bind(this);
    this._setActiveClass = this._setActiveClass.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._resetActiveClass();
      this._setActiveClass(evt.target);

      this._currentSortType = sortType;
      callback(this._currentSortType);
    });
  }

  setDefaultSortType() {
    this._currentSortType = SortType.DEFAULT;
    this._resetActiveClass();
    this._setActiveClass(this._element.querySelector(`a:first-child`));
  }

  _resetActiveClass() {
    this._element
      .querySelectorAll(`.sort__button`)
      .forEach((it) => it.classList.remove(`sort__button--active`));
  }

  _setActiveClass(element) {
    element.classList.add(`sort__button--active`);
  }
}
