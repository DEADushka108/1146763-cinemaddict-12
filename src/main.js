import {createUserProfileTemplate} from './components/user-profile';
import {createMainMenuTemplate} from './components/main-menu';
import {createSortTemplate} from './components/sort';
import {createFilmsTemplate} from './components/films';
import {createFilmsListTemplate} from './components/films-list';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreBtnTemplate} from './components/show-more-btn';
import {createDetailsTemplate} from './components/details';
import {createMovieStatisticTemplate} from './components/movie-statistic';

const CARD_COUNT = 5;
const CARD_COUNT_EXTRA = 2;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const createElement = (template) => {
  let element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};
const setCount = (isExtra) => {
  return isExtra ? CARD_COUNT_EXTRA : CARD_COUNT;
};
const renderCards = (isExtra, container) => {
  let count = setCount(isExtra);
  for (let i = 0; i < count; i++) {
    renderElement(container, createFilmCardTemplate());
  }
};

renderElement(headerElement, createUserProfileTemplate());
renderElement(mainElement, createMainMenuTemplate());
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

const renderFilmsBlock = (container, title, modifier) => {
  const containerListElement = createElement(createFilmsListTemplate(title, modifier));
  const containerElement = containerListElement.querySelector(`.films-list__container`);
  container.appendChild(containerListElement);
  renderCards(modifier, containerElement);
  if (!modifier) {
    renderElement(containerListElement, createShowMoreBtnTemplate());
  }
};

renderFilmsBlock(filmsElement, `All movies. Upcoming`);
renderFilmsBlock(filmsElement, `Top rated`, `extra`);
renderFilmsBlock(filmsElement, `Most commented`, `extra`);
renderElement(footerElement, createMovieStatisticTemplate());
renderElement(document.body, createDetailsTemplate());
