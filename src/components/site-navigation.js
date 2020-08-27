import AbstractComponent from './abstract-component.js';

export default class SiteNavigation extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation">
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      handler(evt.target.getAttribute(`href`) === `#stats`);
    });
  }
}
