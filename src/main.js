import {createUserProfileTemplate} from './components/user-profile';
import {createMainMenuTemplate} from './components/main-menu';
import {createSortTemplate} from './components/sort';
import {createFilmsTemplate} from './components/films';
import {createFilmsListTemplate} from './components/films-list';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreBtnTemplate} from './components/show-more-btn';
import {createDetailsTemplate} from './components/details';
import {createMovieStatisticTemplate} from './components/movie-statistic';
import {renderElement, createElement, generateArray} from './util';
import {generateFilmCard} from './mock/film-cards';
import {generateFilters} from './mock/filters';

const CardCount = {
  DEAFULT: 21,
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

const KeyCode = {
  ESC: 27,
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const films = generateArray(CardCount.DEAFULT, generateFilmCard);
let currentFilmsArray = films.slice(0, CardCount.ON_START);
let filtersArray = generateFilters(films);
let showCardCount = CardCount.ON_START;

renderElement(headerElement, createUserProfileTemplate());
renderElement(mainElement, createMainMenuTemplate(filtersArray));
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

/**
 * Render films block
 * @param {Element} container
 * @param {String} title
 * @param {Array} array data array
 * @param {Boolean} isExtra
 */
const renderFilmsBlock = (container, title, array, isExtra) => {
  const containerListElement = createElement(createFilmsListTemplate(title, isExtra ? `extra` : ``));
  const containerElement = containerListElement.querySelector(`.films-list__container`);
  container.appendChild(containerListElement);
  array.forEach((arr) => {
    renderElement(containerElement, createFilmCardTemplate(arr));
  });

  if (!isExtra) {
    renderElement(containerListElement, createShowMoreBtnTemplate());
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

const filmsSortedByRating = getTopRatedFilms(films);

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

const filmsSortedByComments = getTopCommentedFilms(films);

renderFilmsBlock(filmsElement, `All movies. Upcoming`, currentFilmsArray);

/**
 * Close popup on mouse click and ESC button
 * @param {Element} closeBtn DOM element
 * @param {Element} popup DOM element which must be closed
 */
const closePopup = (closeBtn, popup) => {
  closeBtn.addEventListener(`click`, () => {
    popup.remove();
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === KeyCode.ESC) {
      popup.remove();
    }
  });
};


/**
 * Add eventListeners on rendered cards
 * @param {Array} cardArray
 * @param {Array} data
 */
const addCardPopupOnClick = (cardArray, data) => {
  cardArray.forEach((it, i) => {

    it.addEventListener(`click`, () => {
      renderElement(footerElement, createDetailsTemplate(data[i]), `afterend`);

      const detailsCloseButton = document.querySelector(`.film-details__close-btn`);
      const details = document.querySelector(`.film-details`);

      closePopup(detailsCloseButton, details);
    });
  });
};

const filmListElement = document.querySelector(`.films-list`);
let filmCards = Array.from(filmListElement.querySelectorAll(`.film-card`));

addCardPopupOnClick(filmCards, currentFilmsArray);

const showMoreBtn = mainElement.querySelector(`.films-list__show-more`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

/**
 * Render new cards on show-more-btn click
 */
const onShowMoreBtnMouseClick = () => {
  let currentCardCount = showCardCount;
  showCardCount += CardCount.STEP;
  currentFilmsArray = films.slice(currentCardCount, showCardCount);

  currentFilmsArray.forEach((film) => {
    renderElement(filmsListContainerElement, createFilmCardTemplate(film));
  });

  filmCards = Array.from(filmListElement.querySelectorAll(`.film-card`));
  addCardPopupOnClick(filmCards.slice(currentCardCount, showCardCount), currentFilmsArray);

  if (showCardCount >= films.length) {
    showMoreBtn.remove();
  }
};

showMoreBtn.addEventListener(`click`, onShowMoreBtnMouseClick);

renderFilmsBlock(filmsElement, `Top rated`, filmsSortedByRating, true);
renderFilmsBlock(filmsElement, `Most commented`, filmsSortedByComments, true);

const filmListExtraElements = Array.from(document.querySelectorAll(`.films-list--extra`));

addCardPopupOnClick(Array.from(filmListExtraElements[0].querySelectorAll(`.film-card`)), filmsSortedByRating);
addCardPopupOnClick(Array.from(filmListExtraElements[1].querySelectorAll(`.film-card`)), filmsSortedByComments);

renderElement(footerElement, createMovieStatisticTemplate(films.length));
