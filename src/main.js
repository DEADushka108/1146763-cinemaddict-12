import UserProfileComponent from './components/user-profile.js';
import UserStatisticComponent from './components/user-statistic.js';
import MainMenuComponent from './components/main-menu.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';
import LoadFilmsComponent from './components/load-films.js';
import FilmsListComponent from './components/films-list.js';
import MostCommentedFilmsComponent from './components/most-commented-films-list.js';
import TopRatedFilmsComponent from './components/top-rated-films-list.js';
import FilmCardComponent from './components/film-card.js';
import NoFilmsComponent from './components/no-films.js';
import ShowMoreBtnComponent from './components/show-more-btn.js';
import DetailsComponent from './components/details.js';
import MovieStatisticComponent from './components/movie-statistic.js';
import {render, RenderPosition, generateArray} from './util';
import {generateFilmCard} from './mock/film-cards';
import {generateFilters} from './mock/filters';

const CardCount = {
  DEAFULT: 2,
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

const KeyCode = {
  ESC: 27,
};

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const films = generateArray(CardCount.DEAFULT, generateFilmCard);
let currentFilms = films.slice(0, CardCount.ON_START);
let filters = generateFilters(films);
let showCardCount = CardCount.ON_START;

/**
 * Render film's card and film's additional info into container
 * @param {Element} container
 * @param {Object} film
 */
const renderFilm = (container, film) => {

  const filmCard = new FilmCardComponent(film).getElement();
  const filmPoster = filmCard.querySelector(`.film-card__poster`);
  const filmTitle = filmCard.querySelector(`.film-card__title`);
  const filmComments = filmCard.querySelector(`.film-card__comments`);

  const filmDetails = new DetailsComponent(film).getElement();
  const filmDetailsCloseBtn = filmDetails.querySelector(`.film-details__close-btn`);

  const onMouseDownClosePopup = (evt) => {
    evt.preventDefault();
    body.removeChild(filmDetails);
    document.removeEventListener(`keydown`, OnEscKeyDown);
  };

  const OnEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      onMouseDownClosePopup(evt);
    }
  };

  const onMouseDownShowPopup = () => {
    body.appendChild(filmDetails);
    document.addEventListener(`keydown`, OnEscKeyDown);
  };

  filmPoster.addEventListener(`mousedown`, onMouseDownShowPopup);
  filmTitle.addEventListener(`mousedown`, onMouseDownShowPopup);
  filmComments.addEventListener(`mousedown`, onMouseDownShowPopup);

  filmDetailsCloseBtn.addEventListener(`mousedown`, onMouseDownClosePopup);

  render(container, filmCard, RenderPosition.BEFOREEND);
};

/**
 * Render films block
 */
const renderFilms = () => {

  const filmsElement = main.querySelector(`.films`);

  render(filmsElement, new LoadFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsList = filmsElement.querySelector(`.films-list`);
  const containerElement = filmsElement.querySelector(`.films-list__container`);

  if (films.length === 0) {
    render(containerElement, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  currentFilms.forEach((film) => {
    renderFilm(containerElement, film);
  });

  if (films.length > CardCount.ON_START) {
    render(filmsList, new ShowMoreBtnComponent().getElement(), RenderPosition.BEFOREEND);

    const button = filmsElement.querySelector(`.films-list__show-more`);

    const onShowMoreBtnMouseClick = () => {
      let previousCardCount = showCardCount;
      showCardCount = showCardCount + CardCount.STEP;
      currentFilms = films.slice(previousCardCount, showCardCount);

      currentFilms.forEach((film) => {
        renderFilm(containerElement, film);
      });

      if (showCardCount >= films.length) {
        button.remove();
      }
    };

    button.addEventListener(`click`, onShowMoreBtnMouseClick);
  }
};

/**
 * Get sorted array by rating
 * @param {Array} array
 * @return {Array} sorted array
 */
const getTopRatedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.rating - a.rating)
              .slice(0, CardCount.EXTRA);
};

/**
 * Get sorted array by comments
 * @param {Array} array
 * @return {Array} sorted array
 */
const getTopCommentedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.comments.length - a.comments.length)
              .slice(0, CardCount.EXTRA);
};

/**
 * Render top rated films block
 */
const renderTopRatedFilms = () => {

  const filmsElement = main.querySelector(`.films`);
  const filmsSortedByRating = getTopRatedFilms(films);

  if (films.length !== 0) {
    render(filmsElement, new TopRatedFilmsComponent().getElement(), RenderPosition.BEFOREEND);
    const topRatedFilmsContainer = document.querySelector(`.films-list--extra .films-list__container`);
    filmsSortedByRating.forEach((film) => {
      renderFilm(topRatedFilmsContainer, film);
    });
  }

};

/**
 * render most commented films block
 */
const renderMostCommentedFilms = () => {

  const filmsElement = main.querySelector(`.films`);
  const filmsSortedByComments = getTopCommentedFilms(films);

  if (films.length !== 0) {
    render(filmsElement, new MostCommentedFilmsComponent().getElement(), RenderPosition.BEFOREEND);

    const mostCommentedFilmsContainer = document.querySelector(`.films-list--extra:last-child .films-list__container`);
    filmsSortedByComments.forEach((film) => {
      renderFilm(mostCommentedFilmsContainer, film);
    });
  }
};

render(header, new UserProfileComponent(films).getElement(), RenderPosition.BEFOREEND);
render(main, new MainMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(main, new SortComponent().getElement(), RenderPosition.BEFOREEND);
render(main, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);
renderFilms();
renderTopRatedFilms();
renderMostCommentedFilms();
render(footer, new MovieStatisticComponent(films.length).getElement(), RenderPosition.BEFOREEND);

render(main, new UserStatisticComponent(films).getElement(), RenderPosition.BEFOREEND);
