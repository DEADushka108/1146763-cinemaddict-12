import FilmsComponent from '../components/films.js';
import SortComponent from '../components/sort.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListContainerComponent from '../components/film-list-container.js';
import MostCommentedFilmsComponent from '../components/most-commented.js';
import TopRatedFilmsListComponent from '../components/top-rated.js';
import NoFilmsComponent from '../components/no-films.js';
import {render, remove} from '../utils/render.js';
import {SortType} from '../const.js';
import {getSortedFilms} from '../utils/sort.js';
import FilmPresenter from '../presenter/movie-card.js';
import FilmsLoadComponent from '../components/film-load.js';

const CardCount = {
  DEFAULT: 41,
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

    this._filmsLoadComponent = new FilmsLoadComponent();
    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsListComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandlers(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getAllFilms();
    render(this._container, this._sortComponent);
    render(this._container, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsListComponent);
    render(this._filmsListComponent.getElement(), this._filmsListContainerComponent);
    this._filmsListContainer = this._filmsListContainerComponent.getElement();

    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent);
      return;
    }

    this._renderFilms(this._films.slice(0, this._currentCardsCount), this._filmsListContainer);
    this._renderShowMoreButton();
    this._renderExtraFilmList();
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);
    if (this._currentCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const previousCardsCount = this._currentCardsCount;
    const films = this._filmsModel.getFilms();
    this._currentCardsCount += CardCount.STEP;
    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), previousCardsCount, this._currentCardsCount);
    this._renderFilms(sortedFilms, this._filmsListContainer);
    if (this._currentCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._currentCardsCount = CardCount.ON_START;
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, CardCount.ON_START);

    this._removeFilms();
    this._renderFilms(sortedFilms, this._filmsListContainer);
    this._renderShowMoreButton();
    this._renderExtraFilmList();
  }

  _onDataChange(filmPresenter, oldData, newData) {
    this._api.updateFilm(oldData.id, newData)
      .then((film) => {
        this._filmsModel.updateFilms(oldData.id, film);
        filmPresenter.rerender(film);
      });
  }

  _onViewChange() {
    this._currentFilmPresenters.forEach((presenter) => presenter.setDefaultView());
  }

  _onFilterChange() {
    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }
    this._sortComponent.setDefaultSortType();
    this._onSortTypeChange(SortType.DEFAULT);
  }

  _renderExtraFilmList() {
    render(this._filmsComponent.getElement(), this._topRatedFilmsComponent);
    render(this._filmsComponent.getElement(), this._mostCommentedFilmsComponent);
    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING, 0, CardCount.EXTRA);
    this._renderFilmPresenters(this._currentTopRatedFilms, this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`));
    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS, 0, CardCount.EXTRA);
    this._renderFilmPresenters(this._currentMostCommentedFilms, this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`));
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
      render(this._filmsListContainer, this._noFilmsComponent);
      return;
    }
    this._renderFilmPresenters(films, container);
  }

  _removeFilms() {
    this._currentFilmPresenters.forEach((filmPresenter) => filmPresenter.destroy());
    this._currentFilmPresenters = [];
  }

  hide() {
    this._sortComponent.hide();
    this._filmsComponent.hide();
  }

  show() {
    this._sortComponent.show();
    this._filmsComponent.show();
  }

  showPreloader() {
    render(this._container, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsLoadComponent);
  }

  removePreloader() {
    remove(this._filmsLoadComponent);
  }
}
