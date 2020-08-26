import AbstractComponent from './abstract-component.js';

const MAX_FILTER_COUNT = 5;

const createFiltersTemplate = (filters) => {
  return filters.map((filter, index) => {
    return `<a href="${filter.name}" 
    class="main-navigation__item ${filter.isChecked ? `main-navigation__item--active` : ``}">
    ${filter.name} ${(index > 0 && filter.count <= MAX_FILTER_COUNT) ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}
    </a>`;
  }).join(`\n`);
};

const createFilterTemplate = (filters) => {
  const filtersTemplate = createFiltersTemplate(filters);

  return (
    `<div class="main-navigation__items">
      ${filtersTemplate}
    </div>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `A` || evt.target.parentElement.tagName === `A`) {
        evt.preventDefault();

        const filterName = evt.target.tagName === `A` ? evt.target.getAttribute(`href`) : evt.target.parentElement.getAttribute(`href`);

        handler(filterName);
      }

      return;
    });
  }
}
