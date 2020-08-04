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
import {generateFilmCards} from './mock/films-mock';
import {generateFilters} from './mock/filters';

const CARD_COUNT = {
  DEAFULT: 20,
  ON_START: 5,
  STEP: 5,
  EXTRA: 2
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const filmsArray = generateFilmCards(CARD_COUNT.DEAFULT);
let currentFilmsArray = filmsArray.slice(0, CARD_COUNT.ON_START);
let filtersArray = generateFilters(filmsArray);
let showCardCount = CARD_COUNT.ON_START;

renderElement(headerElement, createUserProfileTemplate());
renderElement(mainElement, createMainMenuTemplate(filtersArray));
renderElement(mainElement, createSortTemplate());
renderElement(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

const renderFilmsBlock = (container, title, films, isExtra) => {
  const containerListElement = createElement(createFilmsListTemplate(title, isExtra ? `extra` : ``));
  const containerElement = containerListElement.querySelector(`.films-list__container`);
  container.appendChild(containerListElement);
  films.forEach((film) => {
    renderElement(containerElement, createFilmCardTemplate(film));
  });

  if (!isExtra) {
    renderElement(containerListElement, createShowMoreBtnTemplate());
  }
};

const getTopRatedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.rating - a.rating)
              .slice(0, CARD_COUNT.EXTRA);
};

const filmsSortedByRating = getTopRatedFilms(filmsArray);

const getTopCommentedFilms = (array) => {
  return array.slice()
              .sort((a, b) => b.comments.length - a.comments.length)
              .slice(0, CARD_COUNT.EXTRA);
};

const filmsSortedByComments = getTopCommentedFilms(filmsArray);

renderFilmsBlock(filmsElement, `All movies. Upcoming`, currentFilmsArray);

const button = mainElement.querySelector(`.films-list__show-more`);
const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

button.addEventListener(`click`, () => {
  let currentCardCount = showCardCount;
  showCardCount += CARD_COUNT.STEP;

  filmsArray.slice(currentCardCount, showCardCount).forEach((film) => {
    renderElement(filmsListContainerElement, createFilmCardTemplate(film));
  });

  filmCards = Array.from(mainElement.querySelectorAll(`.film-card`));
  addShowingPopupOnClick(filmCards.slice(currentCardCount, showCardCount));

  if (showCardCount >= filmsArray.length) {
    button.remove();
  }
});

renderFilmsBlock(filmsElement, `Top rated`, filmsSortedByRating, true);
renderFilmsBlock(filmsElement, `Most commented`, filmsSortedByComments, true);

const closePopup = (btn, popup) => {
  btn.addEventListener(`click`, () => {
    popup.remove();
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 27) {
      popup.remove();
    }
  });
};

const addShowingPopupOnClick = (cardArray) => {
  cardArray.forEach((it, i) => {

    it.addEventListener(`click`, () => {
      renderElement(footerElement, createDetailsTemplate(filmsArray[i]), `afterend`);

      const detailsCloseButton = document.querySelector(`.film-details__close-btn`);
      const details = document.querySelector(`.film-details`);

      closePopup(detailsCloseButton, details);
    });
  });
};

let filmCards = mainElement.querySelectorAll(`.film-card`);
addShowingPopupOnClick(filmCards);

renderElement(footerElement, createMovieStatisticTemplate(filmsArray.length));
