import AbstractComponent from './abstract-component.js';

export default class LoadFilms extends AbstractComponent {
  getTemplate() {
    return `<h2 class="films-list__title">Loading...</h2>`;
  }
}
