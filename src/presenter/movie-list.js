import FilmsComponent from '../components/films.js';
import SortComponent from '../components/sort.js';
import ShowMoreButtonComponent from '../components/show-more-btn.js';
import FilmsListComponent from '../components/films-list.js';
import FilmsListContainerComponent from '../components/film-list-container.js';
import MostCommentedFilmsComponent from '../components/most-commented.js';
import TopRatedFilmsListComponent from '../components/top-rated.js';
import NoFilmsComponent from '../components/no-films.js';
import UserTitleComponent from '../components/user-title.js';
import {render, remove} from '../utils/render.js';
import {SortType} from '../const.js';
import FilmPresenter from '../presenter/movie-card.js';
import FilmsLoadComponent from '../components/film-load.js';

const CardCount = {
  DEFAULT: 41,
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = document.querySelector(`.header`);

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const shownFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = shownFilms.sort((a, b) => b.releaseDate - a.releaseDate);
      break;
    case SortType.RATING:
      sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = shownFilms;
      break;
    case SortType.COMMENTS:
      sortedFilms = shownFilms.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }
  return sortedFilms.slice(from, to);
};

const renderFilms = (filmsListContainer, films, onDataChange, onViewChange, onCommentsChange, api, commentsModel) => {
  return films.map((film) => {
    const filmPresenter = new FilmPresenter(film, filmsListContainer, onDataChange, onViewChange, onCommentsChange, api, commentsModel);
    filmPresenter.render(film);

    return filmPresenter;
  });
};

export default class PagePresenter {
  constructor(filmsModel, commentsModel, api) {
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._currentFilmPresenters = [];
    this._currentCardsCount = CardCount.ON_START;

    this._filmsList = null;
    this._filmsListContainer = null;

    this._films = [];
    this._comments = [];
    this._currentTopRatedFilms = [];
    this._currentMostCommentedFilms = [];

    this._userTitleComponent = null;
    this._filmsLoadComponent = new FilmsLoadComponent();
    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListContainerComponent = new FilmsListContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsListComponent();

    this._onCommentsChange = this._onCommentsChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);


    this._sortComponent.setSortTypeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getAllFilms();

    const currentFilms = this._films.slice(0, this._currentCardsCount);

    render(siteMainElement, this._sortComponent);
    render(siteMainElement, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsListComponent);

    this._filmsList = document.querySelector(`.films-list`);
    render(this._filmsListComponent.getElement(), this._filmsListContainerComponent);

    this._filmsListContainer = document.querySelector(`.films-list__container`);

    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent);
      document.querySelector(`.films-list:first-child`).remove();
      return;
    }

    this._renderFilms(currentFilms);
    this._renderShowMoreButton();
    this._renderExtraFilmList();
  }

  _renderFilms(films) {
    this._films = films;
    if (this._films.length === 0) {
      render(this._filmsListContainer, this._noFilmsComponent);
      return;
    }
    const newFilms = renderFilms(this._filmsListContainer, films, this._onDataChange, this._onViewChange, this._onCommentsChange, this._api, this._commentsModel);
    this._currentFilmPresenters = this._currentFilmPresenters.concat(newFilms);
  }

  renderUserTitle(films) {
    if (this._userTitleComponent) {
      remove(this._userTitleComponent);
    }
    this._userTitleComponent = new UserTitleComponent(films);
    render(siteHeaderElement, this._userTitleComponent);
  }

  _removeFilms() {
    this._currentFilmPresenters.forEach((filmController) => filmController.destroy());
    this._currentFilmPresenters = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
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
    const previouseCardCount = this._currentCardsCount;
    const films = this._filmsModel.getFilms();

    this._currentCardsCount += CardCount.STEP;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), previouseCardCount, this._currentCardsCount);
    this._renderFilms(sortedFilms);

    if (this._currentCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._currentCardsCount = CardCount.ON_START;
    const sortedFilms = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, CardCount.ON_START);

    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowMoreButton();
    this._renderExtraFilmList();
  }

  _onDataChange(filmPresenter, oldData, newData) {

    this._api.updateFilm(oldData.id, newData)
      .then((film) => {
        const isSuccess = this._filmsModel.updateFilms(oldData.id, film);
        if (isSuccess) {
          filmPresenter.rerender(film);
          this.renderUserTitle(this._filmsModel.getAllFilms());
        }
      });
  }

  _onCommentsChange(filmPresenter, oldData, newData, film) {
    if (oldData === null) {
      this._api.addComment(film.id, JSON.stringify(newData))
        .then((res) => res.json())
        .then((response) => {
          const isSuccess = this._commentsModel.setComments(response.comments);
          if (isSuccess) {
            filmPresenter.resetTextarea();
            filmPresenter.renderComments();
          }
        })
        .catch(() => {
          filmPresenter.shakeTextarea();
        });
    } else if (newData === null) {
      this._api.deleteСomment(oldData.id)
        .then(() => {
          const isSuccess = this._commentsModel.removeComment(oldData);
          if (isSuccess) {
            filmPresenter.renderComments();
            this._filmsModel.updateFilms(oldData.id, film);
          }
        })
        .catch(() => {
          filmPresenter.shakeComment(oldData);
        });
    }

    this._currentFilms = getSortedFilms(this._filmsModel.getFilms().slice(), this._currentSortType);

    this._renderMainFilmList();

    this._renderShowMoreButton();

    this._renderExtraFilmList();
  }

  _onViewChange() {
    this._currentFilmPresenters.forEach((presenter) => presenter.setDefaultView());
  }

  _onFilterChange() {
    this._sortComponent.setDefaultSortType();
    this._onSortTypeChange(SortType.DEFAULT);
    this._updateFilms(CardCount.ON_START);
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
    render(siteMainElement, this._filmsComponent);
    render(this._filmsComponent.getElement(), this._filmsLoadComponent);
  }

  removePreloader() {
    this._filmsLoadComponent.removeElement();
    if (document.querySelector(`.films-list:first-child`)) {
      document.querySelector(`.films-list:first-child`).remove();
    }
  }

  _renderExtraFilmList() {
    render(document.querySelector(`.films`), this._topRatedFilmsComponent);
    render(document.querySelector(`.films`), this._mostCommentedFilmsComponent);

    this._currentTopRatedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.RATING, 0, CardCount.EXTRA);

    const topRatedFilms = renderFilms(this._topRatedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentTopRatedFilms, this._onDataChange, this._onViewChange, this._onCommentsChange, this._api, this._commentsModel);

    this._currentFilmPresenters = this._currentFilmPresenters.concat(topRatedFilms);

    this._currentMostCommentedFilms = getSortedFilms(this._filmsModel.getAllFilms(), SortType.COMMENTS, 0, CardCount.EXTRA);

    const mostCommentedFilms = renderFilms(this._mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`), this._currentMostCommentedFilms, this._onDataChange, this._onViewChange, this._onCommentsChange, this._api, this._commentsModel);

    this._currentFilmPresenters = this._currentFilmPresenters.concat(mostCommentedFilms);
  }
}
