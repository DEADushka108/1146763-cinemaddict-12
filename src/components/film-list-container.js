import AbstractComponent from "./abstract-component";

export default class FilmListContainer extends AbstractComponent {

  getTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
