import AbstractComponent from './abstract-component.js';

export default class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
