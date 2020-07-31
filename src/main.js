import {createUserProfileTemplate} from './components/user-profile';
import {createMainMenuTemplate} from './components/main-menu';
import {createSortTemplate} from './components/sort';
import {createFilmsTemplate} from './components/films';
import {createFilmsListTemplate} from './components/films-list';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreBtnTemplate} from './components/show-more-btn';
import {createDetailsTemplate} from './components/details';
import {createMovieStatisticTemplate} from './components/movie-statistic';
import {renderElement, createElement} from './util';

const CARD_COUNT = 5;
const CARD_COUNT_EXTRA = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

/**
  * Get number of render cards
  * @param {boolean} isExtra contain modifier
  *
  * @return {int} number of cards
  */
const getCardCount = (isExtra) => isExtra ? CARD_COUNT_EXTRA : CARD_COUNT;

/**
  * Render film cards
  * @param {boolean} isExtra contain modifier
  * @param {element} container
  */
const renderCards = (isExtra, container) => {
  let count = getCardCount(isExtra);

  for (let i = 0; i < count; i++) {
    renderElement(container, createFilmCardTemplate());
  }

};

renderElement(headerElement, createUserProfileTemplate());
renderElement(mainElement, createMainMenuTemplate());
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

/**
  * Render films block element
  * @param {Element} container
  * @param {string} title of block
  * @param {boolean} isExtra contain modifier
  */
const renderFilmsBlock = (container, title, isExtra) => {
  const containerListElement = createElement(createFilmsListTemplate(title, isExtra ? `extra` : ``));
  const containerElement = containerListElement.querySelector(`.films-list__container`);
  container.appendChild(containerListElement);
  renderCards(isExtra, containerElement);

  if (!isExtra) {
    renderElement(containerListElement, createShowMoreBtnTemplate());
  }

};

renderFilmsBlock(filmsElement, `All movies. Upcoming`);
renderFilmsBlock(filmsElement, `Top rated`, true);
renderFilmsBlock(filmsElement, `Most commented`, true);
renderElement(footerElement, createMovieStatisticTemplate());
renderElement(document.body, createDetailsTemplate());
