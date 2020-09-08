import AbstractView from './abstract-view.js';

export default class Films extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
