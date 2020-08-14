import AbstractComponent from './abstract-component.js';

const createFilterTemplate = (filtersArray) => {
  return filtersArray.map((filter) => {
    const {address, name, count} = filter;

    /**
     * Check block's name
     * @return {Boolean}
     */
    const isAllMovies = () => name === `All movies`;

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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
