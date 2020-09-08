import AbstractView from './abstract-view.js';

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }

  removeClickHandler(callback) {
    this._element.removeEventListener(`click`, callback);
  }
}
