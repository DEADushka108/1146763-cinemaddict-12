import FilmsView from '../view/films.js';
import SortView from '../view/sort.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmsListView from '../view/films-list.js';
import MostCommentedFilmsView from '../view/most-commented.js';
import TopRatedFilmsListView from '../view/top-rated.js';
import NoFilmsView from '../view/no-films.js';
import {render, remove, replace} from '../utils/render.js';
import {SortType} from '../const.js';
import {getSortedFilms} from '../utils/sort.js';
import FilmPresenter from '../presenter/movie-card.js';
import FilmsLoadView from '../view/film-load.js';

const CardCount = {
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

export default class PagePresenter {
  constructor(container, filmsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._api = api;

    this._currentFilmPresenters = [];
    this._currentCardsCount = CardCount.ON_START;

    this._filmsListContainer = null;

    this._films = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._filmsLoadView = new FilmsLoadView();
    this._sortView = new SortView(SortType.DEFAULT);
    this._filmsView = new FilmsView();
    this._filmsListView = new FilmsListView();
    this._noFilmsView = new NoFilmsView();
    this._showMoreButtonView = new ShowMoreButtonView();
    this._mostCommentedFilmsView = null;
    this._topRatedFilmsView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortView.setSortTypeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandlers(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getAllFilms();
    render(this._container, this._sortView);
    render(this._container, this._filmsView);

    if (this._films.length === 0) {
      render(this._filmsView.getElement(), this._noFilmsView);
      return;
    }

    render(this._filmsView.getElement(), this._filmsListView);
    this._filmsListContainer = this._filmsListView.getElement().querySelector(`.films-list__container`);
    this._renderFilms(this._films.slice(0, this._currentCardsCount), this._filmsListContainer);
    this._renderShowMoreButton();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonView);
    if (this._currentCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._filmsListView.getElement(), this._showMoreButtonView);
    this._showMoreButtonView.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const previousCardsCount = this._currentCardsCount;
    const films = this._filmsModel.getFilms();
    this._currentCardsCount += CardCount.STEP;
    const sortedFilms = getSortedFilms(films, this._sortView.getSortType(), previousCardsCount, this._currentCardsCount);
    this._renderFilms(sortedFilms, this._filmsListContainer);
    if (this._currentCardsCount >= films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _onDataChange(filmPresenter, id, newData) {
    this._api.updateFilm(id, newData)
      .then((film) => {
        this._filmsModel.updateFilms(id, film);
        filmPresenter.rerender(film);
        this._renderTopRatedFilmList();
        this._renderMostCommentedFilmList();
      });
  }

  _onViewChange() {
    this._currentFilmPresenters.forEach((presenter) => presenter.setDefaultView());
  }

  _updateList(sortType) {
    this._currentCardsCount = CardCount.ON_START;
    this._removeFilms();
    this._renderFilms(getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._currentCardsCount), this._filmsListContainer);
    this._renderShowMoreButton();
    this._renderTopRatedFilmList();
    this._renderMostCommentedFilmList();
  }

  _onSortTypeChange(sortType) {
    this._updateList(sortType);
  }

  _onFilterChange() {
    if (this._noFilmsView) {
      remove(this._noFilmsView);
    }
    this._sortView.setDefaultSortType();
    this._updateList(this._sortView.getSortType());
  }

  _renderMostCommentedFilmList() {
    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS, 0, CardCount.EXTRA);
    if (this._currentMostCommentedFilms.some((film) => film.comments.length !== 0)) {
      const oldMostCommentedView = this._mostCommentedFilmsView;
      this._mostCommentedFilmsView = new MostCommentedFilmsView();
      if (oldMostCommentedView) {
        replace(this._mostCommentedFilmsView, oldMostCommentedView);
      } else {
        render(this._filmsView.getElement(), this._mostCommentedFilmsView);
      }
      this._renderFilmPresenters(this._currentMostCommentedFilms, this._mostCommentedFilmsView.getElement().querySelector(`.films-list__container`));
    }
  }

  _renderTopRatedFilmList() {
    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING, 0, CardCount.EXTRA);
    if (this._currentTopRatedFilms.some((film) => film.rating !== 0)) {
      const oldTopRatedView = this._topRatedFilmsView;
      this._topRatedFilmsView = new TopRatedFilmsListView();
      if (oldTopRatedView) {
        replace(this._topRatedFilmsView, oldTopRatedView);
      } else {
        render(this._filmsView.getElement(), this._topRatedFilmsView);
      }
      this._renderFilmPresenters(this._currentTopRatedFilms, this._topRatedFilmsView.getElement().querySelector(`.films-list__container`));
    }
  }

  _renderFilmPresenters(films, container) {
    return films.map((film) => {
      const filmPresenter = new FilmPresenter(film, container, this._onDataChange, this._onViewChange, this._api);
      filmPresenter.render(film);
      this._currentFilmPresenters.push(filmPresenter);
    });
  }

  _renderFilms(films, container) {
    this._films = films;
    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsView);
      return;
    }
    this._renderFilmPresenters(films, container);
  }

  _removeFilms() {
    this._currentFilmPresenters.forEach((filmPresenter) => filmPresenter.destroy());
    this._currentFilmPresenters = [];
  }

  hide() {
    this._sortView.setDefaultSortType();
    this._sortView.hide();
    this._filmsView.hide();
  }

  show() {
    this._sortView.show();
    this._filmsView.show();
  }

  showPreloader() {
    render(this._container, this._filmsView);
    render(this._filmsView.getElement(), this._filmsLoadView);
  }

  removePreloader() {
    remove(this._filmsLoadView);
  }
}
