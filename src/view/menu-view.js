import AbstractView from './abstract-view.js';
import {MenuItem, NAVIGATION_ACTIVE_CLASS} from '../const.js';

export default class MenuView extends AbstractView {

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <a href="#stats" data-id="${MenuItem.STATS}" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  setOnChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A` && evt.target.tagName !== `SPAN`) {
        return;
      }

      if (evt.target.dataset.id === MenuItem.STATS) {
        document.querySelectorAll(`.main-navigation__item`).forEach((it) => {
          it.classList.remove(NAVIGATION_ACTIVE_CLASS);
        });
      }

      callback(evt.target.dataset.id);
      evt.target.classList.add(NAVIGATION_ACTIVE_CLASS);
    });
  }
}
