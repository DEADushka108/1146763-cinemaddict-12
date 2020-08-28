import BoardComponent from '../components/board.js';
import SortComponent from '../components/sort.js';
import MainFilmsListComponent from '../components/main-films-list.js';
import TopRatedFilmsComponent from '../components/top-rated-films.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import ShowMoreButtonComponent from '../components/show-more-btn.js';
import MovieCardPresenter from '../presenter/movie-card.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {SortType, CardCount} from '../const.js';
import {getSortedFilms} from '../utils/sort.js';

const renderFilms = (container, films, dataChangeHandler, viewChangeHandler, api) => {
  return films.map((it) => {
    const filmPresenter = new MovieCardPresenter(container, dataChangeHandler, viewChangeHandler, api);
    filmPresenter.render(it);

    return filmPresenter;
  });
};

export default class MovieListPresenter {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._currentFilmsControllers = [];
    this._currentFilms = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._currentFilmsCount = CardCount.ON_START;
    this._currentSortType = SortType.DEFAULT;

    this._boardComponent = new BoardComponent();
    this._sortComponent = new SortComponent();
    this._mainFilmsListComponent = new MainFilmsListComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._sortHandler = this._sortHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortComponent.setClickHandler(this._sortHandler);
    this._filmsModel.setFilterChangeHandler(this._filterChangeHandler);
  }

  render() {
    render(this._container, this._boardComponent);

    const container = this._boardComponent.getElement();

    if (!this._filmsModel.getAllFilms().length) {
      render(container, new MainFilmsListComponent(false));

      return;
    }

    render(container, this._sortComponent);
    render(container, this._mainFilmsListComponent);

    this._updateFilms();
  }

  destroy() {
    remove(this._boardComponent);
    this._removeFilms();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._currentFilmsCount >= this._currentFilms.length) {
      return;
    }
    render(this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`), this._showMoreButtonComponent, RenderPosition.AFTEREND);
    this._showMoreButtonComponent.setClickHandler((evt) => {
      evt.preventDefault();
      const prevFilmsCount = this._currentFilmsCount;
      this._currentFilmsCount += CardCount.STEP;
      const newFilms = renderFilms(this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`), this._currentFilms.slice(prevFilmsCount, this._currentFilmsCount), this._dataChangeHandler, this._viewChangeHandler, this._api);
      this._currentFilmsControllers = [...this._currentFilmsControllers, ...newFilms];

      if (this._currentFilmsCount >= this._currentFilms.length) {
        this._showMoreButtonComponent.getElement().remove();
      }
    });
  }

  _sortHandler(sortType) {
    this._currentSortType = sortType;
    this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    this._currentFilmsCount = CardCount.ON_START;
    this._currentFilms = getSortedFilms(this._filmsModel.getFilms(), sortType);
    this._renderFilms(this._currentFilms.slice(0, this._currentFilmsCount));

    this._renderShowMoreButton();
  }

  _dataChangeHandler(oldData, newData) {
    this._api.updateFilm(oldData.id, newData.adaptToServer())
      .then((film) => {
        this._filmsModel.updateFilm(oldData.id, film);
        this._updateFilms(false);
      });
  }

  _removeFilms() {
    this._currentFilmsControllers.forEach((filmController) => filmController.destroy());
    this._currentFilmsControllers = [];
  }

  _updateFilms(isDefaultCount = true) {
    this._removeFilms();

    if (isDefaultCount) {
      this._currentFilmsCount = CardCount.ON_START;
    }

    this._currentFilms = getSortedFilms(this._filmsModel.getFilms().slice(), this._currentSortType);

    this._renderMainFilmList();

    this._renderShowMoreButton();

    this._renderExtraFilmList();
  }

  _filterChangeHandler() {
    this._updateFilms();
  }

  _renderFilms(films) {
    const newFilms = renderFilms(this._mainFilmsListComponent.getElement().querySelector(`.films-list__container`), films, this._dataChangeHandler, this._viewChangeHandler, this._api);
    this._currentFilmsControllers = [...this._currentFilmsControllers, ...newFilms];
  }

  _renderMainFilmList() {
    this._renderFilms(this._currentFilms.slice(0, this._currentFilmsCount));
  }

  _renderExtraFilmList() {
    render(this._boardComponent.getElement(), this._topRatedFilmsComponent);
    render(this._boardComponent.getElement(), this._mostCommentedFilmsComponent);

    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING).slice(0, CardCount.EXTRA);

    const topRatedControllers = renderFilms(this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentTopRatedFilms, this._dataChangeHandler, this._viewChangeHandler, this._api);

    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS).slice(0, CardCount.EXTRA);

    const mostCommentedControllers = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentMostCommentedFilms, this._dataChangeHandler, this._viewChangeHandler, this._api);

    this._currentFilmsControllers = [...topRatedControllers, ...mostCommentedControllers, ...this._currentFilmsControllers];
  }

  _viewChangeHandler() {
    this._currentFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
