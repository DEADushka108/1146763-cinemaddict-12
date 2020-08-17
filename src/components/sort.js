import AbstractComponent from './abstract-component.js';
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

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
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

      const sortList = evt.currentTarget;
      const sortElement = evt.target;
      const sortElements = Array.from(sortList.querySelectorAll(`.sort__button`));
      sortElements.forEach((element) => element.classList.remove(`sort__button--active`));
      sortElement.classList.add(`sort__button--active`);

      this._currentSortType = sortType;
      callback(this._currentSortType);
    });
  }
}
