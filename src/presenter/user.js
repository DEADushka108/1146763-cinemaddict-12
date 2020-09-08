import UserTitleView from '../view/user-title.js';
import {render, replace} from '../utils/render.js';
import {getUserTitle} from '../utils/utils.js';

export default class UserPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._userView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._filmsModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const oldUserView = this._userView;
    this._userView = new UserTitleView(getUserTitle(this._filmsModel.getWatchedFilms().length));

    if (oldUserView) {
      replace(this._userView, oldUserView);
    } else {
      render(this._container, this._userView);
    }
  }

  _onDataChange() {
    this.render();
  }
}
