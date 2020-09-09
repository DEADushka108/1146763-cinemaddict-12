import UserTitleView from '../view/user-title-view.js';
import {render, replace} from '../utils/render.js';
import {getUserTitle} from '../utils/utils.js';

export default class UserPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._userTitleView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._filmsModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const oldUserTitleView = this._userTitleView;
    this._userTitleView = new UserTitleView(getUserTitle(this._filmsModel.getWatchedFilms().length));

    if (oldUserTitleView) {
      replace(this._userTitleView, oldUserTitleView);
    } else {
      render(this._container, this._userTitleView);
    }
  }

  _onDataChange() {
    this.render();
  }
}
