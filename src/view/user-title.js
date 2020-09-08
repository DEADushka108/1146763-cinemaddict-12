import AbstractView from './abstract-view.js';

export default class UserTitle extends AbstractView {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._title}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
