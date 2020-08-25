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

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.getElement().querySelector(`[data-sort-type=${this._currentSortType}]`).classList.remove(`sort__button--active`);
      this.getElement().querySelector(`[data-sort-type=${sortType}]`).classList.add(`sort__button--active`);

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}
