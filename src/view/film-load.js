import AbstractView from './abstract-view.js';

export default class FilmsLoadView extends AbstractView {
  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>`;
  }
}
