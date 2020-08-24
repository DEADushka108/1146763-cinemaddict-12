import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

export const NAVIGATION_ACTIVE_CLASS = `main-navigation__item--active`;

const createFilters = (filtersArray) => {
  return filtersArray.map(({address, name, count, checked}) => {
    /**
     * Check block's name
     * @return {Boolean}
     */
    const isAllMovies = () => name === FilterType.ALL;

    /**
     * Get block's active state
     * @return {string}
     */
    const getActiveState = () => checked ? `main-navigation__item--active` : ``;

    /**
     * Get count template
     * @return {string}
     */
    const getCountTemplate = () => isAllMovies() || (count > 5) ? `` : `<span class="main-navigation__item-count">${count}</span>`;

    return (
      `<a href="#${address}"
       data-filter-type="${name}"
       class="main-navigation__item ${getActiveState()}">
      ${name}
      ${getCountTemplate()}
      </a>`
    );
  }).join(`\n`);
};


const createMainMenuTemplate = (filtersArray) => {
  return (
    `<div class="main-navigation__items">
        ${createFilters(filtersArray)}
      </div>`
  );
};

export default class MainMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainMenuTemplate(this._filters);
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
