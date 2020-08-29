import {getUserTitle} from '../utils/utils.js';
import AbstractComponent from './abstract-component.js';

const createUserTitleTemplate = (films) => {
  const title = getUserTitle(films);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${title}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserTitle extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createUserTitleTemplate(this._films);
  }
}
