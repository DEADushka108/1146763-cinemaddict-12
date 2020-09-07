import AbstractComponent from './abstract-component.js';

export default class Films extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
