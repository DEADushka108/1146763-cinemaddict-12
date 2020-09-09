import AbstractView from './abstract-view';

export default class TopRatedFilmsView extends AbstractView {
  getTemplate() {
    return (
      `<section class="films-list--extra">
          <h2 class="films-list__title">Top rated</h2>
          <div class="films-list__container">
          </div>
        </section>`
    );
  }
}
