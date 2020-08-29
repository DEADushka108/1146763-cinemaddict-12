import AbstractComponent from './abstract-component.js';
import {MenuItem} from '../main.js';

export const NAVIGATION_ACTIVE = `main-navigation__item--active`;

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
    if (this.getElement().querySelector(`#${menuItem}`)) {
      this.getElement().querySelector(`#${menuItem}`).checked = true;
    }
  }

  setOnChange(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A` && evt.target.tagName !== `SPAN`) {
        return;
      }

      if (evt.target.id === MenuItem.STATS) {
        document.querySelectorAll(`#${MenuItem.FILMS}`).forEach((it) => {
          it.classList.remove(NAVIGATION_ACTIVE);
        });
      }

      callback(evt.target.id);
      evt.target.classList.add(NAVIGATION_ACTIVE);
    });
  }
}
