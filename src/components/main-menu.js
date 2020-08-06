import {createFilterTemplate} from './filter';

export const createMainMenuTemplate = (filtersArray) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${createFilterTemplate(filtersArray)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
