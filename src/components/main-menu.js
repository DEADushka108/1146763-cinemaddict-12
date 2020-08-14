import AbstractComponent from './abstract-component.js';

const createFilters = (filtersArray) => {
  return filtersArray.map(({address, name, count}) => {
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

export default class MainMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainMenuTemplate(this._filters);
  }
}
