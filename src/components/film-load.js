import AbstractComponent from './abstract-component.js';

export default class FilmsLoad extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>`;
  }
}
