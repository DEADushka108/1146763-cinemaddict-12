import AbstractComponent from './components/abstract-component.js';
import {NAVIGATION_ACTIVE_CLASS} from './components/filter.js';
import {MenuItem} from './const.js';

const createMenuTemplate = () => {

  return (
    `<nav class="main-navigation">
      <a href="#stats" id="${MenuItem.STATS}" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);
    if (item) {
      item.checked = true;
    }
  }

  setOnChange(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      if (evt.target.id === MenuItem.STATS) {
        document.querySelectorAll(`#${MenuItem.FILMS}`).forEach((item) => {
          item.classList.remove(NAVIGATION_ACTIVE_CLASS);
        });
      }
      callback(evt.target.id);
      evt.target.classList.add(NAVIGATION_ACTIVE_CLASS);
    });
  }
}
