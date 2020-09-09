import AbstractView from './abstract-view.js';

export default class FilmsView extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
