import AbstractComponent from "./abstract-component";
import {FilterType} from '../const.js';
import {MenuItem} from '../main.js';
import {NAVIGATION_ACTIVE} from './menu.js';

const createFiltersTemplate = (filters) => {
  return filters.map((filter) => {
    const {address, name, count, checked} = filter;
    return (
      `<a href="#${address}"
         id="${MenuItem.FILMS}"
         data-filter-type="${name}"
         class="main-navigation__item${checked ? ` ${NAVIGATION_ACTIVE}` : ``}">
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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._currenFilterType = FilterType.ALL;
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
      document.querySelector(`.main-navigation__additional`).classList.remove(NAVIGATION_ACTIVE);

      callback(evt.target.dataset.filterType);
    });
  }
}
