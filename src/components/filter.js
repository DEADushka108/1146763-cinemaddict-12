export const createFilterTemplate = (filtersArray) => {
  return filtersArray.map((filter) => {
    const {address, name, count} = filter;
    return (
      `<a href="#${address}" class="main-navigation__item ${name === `All movies` ? `main-navigation__item--active` : ``}">
      ${name}
      ${name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`}
      </a>`
    );
  }).join(`\n`);
};
