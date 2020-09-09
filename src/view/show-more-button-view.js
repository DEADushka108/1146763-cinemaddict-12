import AbstractView from './abstract-view.js';

export default class ShowMoreButtonView extends AbstractView {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, callback);
  }
}
