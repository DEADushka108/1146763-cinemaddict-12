
import SortComponent from '../components/sort.js';
import FilmsComponent from '../components/films.js';
import LoadFilmsComponent from '../components/load-films.js';
import FilmsListComponent from '../components/films-list.js';
import MostCommentedFilmsComponent from '../components/most-commented-films-list.js';
import TopRatedFilmsComponent from '../components/top-rated-films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreBtnComponent from '../components/show-more-btn.js';
import MovieCard from './movie-card.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {getSortedFilms} from '../utils/task.js';
import {SortType, CardCount} from '../const.js';

const main = document.querySelector(`.main`);

const renderFilms = (filmsContainer, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieCard = new MovieCard(filmsContainer, onDataChange, onViewChange);
    movieCard.render(film);
    return movieCard;
  });
};

export default class MovieListController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._currentFilmsControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._loadFilmsComponent = new LoadFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsListComponent = new NoFilmsComponent();
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
  }

  render(films) {
    this._currentCardCount = CardCount.ON_START;
    this._films = films;
    this._currentFilms = films.slice(0, this._currentCardCount);

    render(main, this._sortComponent, RenderPosition.BEFOREEND);
    render(main, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = document.querySelector(`.films`);
    render(filmsElement, this._loadFilmsComponent, RenderPosition.BEFOREEND);
    render(filmsElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmsListElement = filmsElement.querySelector(`.films-list`);
    const containerElement = filmsElement.querySelector(`.films-list__container`);

    if (films.length === 0) {
      render(containerElement, this._noFilmsListComponent, RenderPosition.BEFOREEND);
      return;
    }

    let newFilms = renderFilms(containerElement, this._currentFilms, this._onDataChange, this._onViewChange);
    this._currentFilmsControllers = this._currentFilmsControllers.concat(newFilms);

    if (films.length > CardCount.ON_START) {
      render(filmsListElement, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

      this._showMoreBtnComponent.setClickHandler(() => {
        let prevCardCount = this._currentCardCount;
        this._currentCardCount = this._currentCardCount + CardCount.STEP;
        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), 0, this._currentCardCount);

        newFilms = renderFilms(containerElement, sortedFilms.slice(prevCardCount, this._currentCardCount), this._onDataChange, this._onViewChange);
        this._currentFilmsControllers = this._currentFilmsControllers.concat(newFilms);

        if (this._currentCardCount >= films.length) {
          remove(this._showMoreBtnComponent);
        }
      });
    }

    this._sortComponent.setSortTypeHandler((sortType) => {
      this._currentCardCount = CardCount.ON_START;
      const sortedFilms = getSortedFilms(films, sortType, 0, this._currentCardCount);
      containerElement.innerHTML = ` `;

      newFilms = renderFilms(containerElement, sortedFilms, this._onDataChange, this._onViewChange);
      this._currentFilmsControllers = this._currentFilmsControllers.concat(newFilms);
    });


    if (films.length !== 0) {
      /**
      * Render top rated films block
      */
      const filmsSortedByRating = getSortedFilms(films, SortType.RATING, 0, CardCount.EXTRA);

      render(filmsElement, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topRatedFilmsContainer = document.querySelector(`.films-list--extra .films-list__container`);

      newFilms = renderFilms(topRatedFilmsContainer, filmsSortedByRating, this._onDataChange, this._onViewChange);
      this._currentFilmsControllers = this._currentFilmsControllers.concat(newFilms);

      /**
      * render most commented films block
      */
      const filmsSortedByComments = getSortedFilms(films, SortType.COMMENTS, 0, CardCount.EXTRA);

      render(filmsElement, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

      const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);

      newFilms = renderFilms(mostCommentedFilmsContainer, filmsSortedByComments, this._onDataChange, this._onViewChange);
      this._currentFilmsControllers = this._currentFilmsControllers.concat(newFilms);
    }
  }
  _onDataChange(movieCard, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieCard.render(this._films[index]);
  }

  _onViewChange() {
    this._currentFilmsControllers.forEach((it) => it.setDefaultView());
  }
}
