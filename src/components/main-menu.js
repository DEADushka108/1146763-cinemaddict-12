import {createElement} from '../util.js';

const createFilters = (filtersArray) => {
  return filtersArray.map((filter) => {
    const {address, name, count} = filter;

    /**
     * Check block's name
     * @return {Boolean}
     */
    const isAllMovies = () => name === `All movies` ? true : false;

    /**
     * Get block's active state
     * @return {string}
     */
    const getActiveState = () => isAllMovies() ? `main-navigation__item--active` : ``;

    /**
     * Get count template
     * @return {string}
     */
    const getCountTemplate = () => isAllMovies() ? `` : `<span class="main-navigation__item-count">${count}</span>`;

    return (
      `<a href="#${address}" class="main-navigation__item ${getActiveState()}">
      ${name}
      ${getCountTemplate()}
      </a>`
    );
  }).join(`\n`);
};


const createMainMenuTemplate = (filtersArray) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilters(filtersArray)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainMenu {
  constructor(filters) {
    this._filters = filters;
    this.element = null;
  }

  getTemplate() {
    return createMainMenuTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
