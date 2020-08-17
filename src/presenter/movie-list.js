
import SortComponent from '../components/sort.js';
import FilmsComponent from '../components/films.js';
import LoadFilmsComponent from '../components/load-films.js';
import FilmsListComponent from '../components/films-list.js';
import MostCommentedFilmsComponent from '../components/most-commented-films-list.js';
import TopRatedFilmsComponent from '../components/top-rated-films-list.js';
import FilmCardComponent from '../components/film-card.js';
import NoFilmsComponent from '../components/no-films.js';
import ShowMoreBtnComponent from '../components/show-more-btn.js';
import DetailsComponent from '../components/details.js';
import {render, RenderPosition, removeChild, appendChild, remove} from '../utils/render.js';
import {getSortedFilms} from '../utils/task.js';
import {SortType, CardCount} from '../const.js';

const KeyCode = {
  ESC: 27,
};

const body = document.querySelector(`body`);
const main = document.querySelector(`.main`);

export default class MovieList {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent(SortType.DEFAULT);
    this._loadFilmsComponent = new LoadFilmsComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._noFilmsListComponent = new NoFilmsComponent();
    this._showMoreBtnComponent = new ShowMoreBtnComponent();
    this._topRatedFilmsComponent = new TopRatedFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
  }

  /**
 * Render film's card and film's additional info into container
 * @param {Element} container
 * @param {Object} film
 */
  _renderFilm(container, film) {

    const filmCardComponent = new FilmCardComponent(film);
    const filmDetailsComponent = new DetailsComponent(film);

    const onMouseDownClosePopup = (evt) => {
      evt.preventDefault();
      removeChild(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KeyCode.ESC) {
        onMouseDownClosePopup(evt);
      }
    };

    const onMouseDownShowPopup = () => {
      appendChild(body, filmDetailsComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCardComponent.setClickHandler(onMouseDownShowPopup);
    filmDetailsComponent.setClickHandler(onMouseDownClosePopup);

    render(container, filmCardComponent, RenderPosition.BEFOREEND);
  }

  render(films) {
    this._currentFilms = films.slice(0, CardCount.ON_START);
    this._showCardCount = CardCount.ON_START;

    render(main, this._sortComponent, RenderPosition.BEFOREEND);
    render(main, this._filmsComponent, RenderPosition.BEFOREEND);

    const filmsElement = document.querySelector(`.films`);
    render(filmsElement, this._loadFilmsComponent, RenderPosition.BEFOREEND);
    render(filmsElement, this._filmsListComponent, RenderPosition.BEFOREEND);

    const filmsList = filmsElement.querySelector(`.films-list`);
    const containerElement = filmsElement.querySelector(`.films-list__container`);

    if (films.length === 0) {
      render(containerElement, this._noFilmsListComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._currentFilms.forEach((film) => {
      this._renderFilm(containerElement, film);
    });

    if (films.length > CardCount.ON_START) {
      render(filmsList, this._showMoreBtnComponent, RenderPosition.BEFOREEND);

      this._showMoreBtnComponent.setClickHandler(() => {
        let previousCardCount = this._showCardCount;
        this._showCardCount = this._showCardCount + CardCount.STEP;
        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), 0, this._showCardCount);
        this._currentFilms = sortedFilms.slice(previousCardCount, this._showCardCount);

        this._currentFilms.forEach((film) => {
          this._renderFilm(containerElement, film);
        });

        if (this._showCardCount >= films.length) {
          remove(this._showMoreBtnComponent);
        }
      });
    }

    this._sortComponent.setSortTypeHandler((sortType) => {
      const sortedFilms = getSortedFilms(films, sortType, 0, this._showCardCount);
      containerElement.innerHTML = ` `;

      sortedFilms.forEach((film) => {
        this._renderFilm(containerElement, film);
      });
    });


    if (films.length !== 0) {
      /**
      * Render top rated films block
      */
      const filmsSortedByRating = getSortedFilms(films, SortType.RATING, 0, CardCount.EXTRA);

      render(filmsElement, this._topRatedFilmsComponent, RenderPosition.BEFOREEND);
      const topRatedFilmsContainer = document.querySelector(`.films-list--extra .films-list__container`);
      filmsSortedByRating.forEach((film) => {
        this._renderFilm(topRatedFilmsContainer, film);
      });

      /**
      * render most commented films block
      */
      const filmsSortedByComments = getSortedFilms(films, SortType.COMMENTS, 0, CardCount.EXTRA);

      render(filmsElement, this._mostCommentedFilmsComponent, RenderPosition.BEFOREEND);

      const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);
      filmsSortedByComments.forEach((film) => {
        this._renderFilm(mostCommentedFilmsContainer, film);
      });
    }
  }
}
