import AbstractView from './abstract-view.js';

export default class MostCommentedFilmsView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra">
          <h2 class="films-list__title">Most commented</h2>
          <div class="films-list__container">
          </div>
        </section>`
    );
  }
}
