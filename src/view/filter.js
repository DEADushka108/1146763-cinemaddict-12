import AbstractView from './abstract-view';
import {FilterType, MenuItem, NAVIGATION_ACTIVE_CLASS} from '../const.js';

const createFiltersTemplate = (filters) => {
  return filters.map(({address, name, count, isChecked}) => {
    return (
      `<a href="#${address}"
         data-id="${MenuItem.FILMS}"
         data-filter-type="${name}"
         class="main-navigation__item${isChecked ? ` ${NAVIGATION_ACTIVE_CLASS}` : ``}">
         ${name}
         ${name === FilterType.ALL ? `` : `<span  class="main-navigation__item-count">${count}</span>`}
      </a>`
    );
  }).join(`\n`);
};

const createFilterTemplate = (filters) => {
  return (
    `<div class="main-navigation__items">
      ${createFiltersTemplate(filters)}
    </div>`
  );
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(callback) {

    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      document.querySelector(`.main-navigation__additional`).classList.remove(NAVIGATION_ACTIVE_CLASS);

      callback(evt.target.dataset.filterType);
    });
  }
}
