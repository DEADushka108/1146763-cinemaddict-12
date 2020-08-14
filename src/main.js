import UserProfileComponent from './components/user-profile.js';
import UserStatisticComponent from './components/user-statistic.js';
import MainMenuComponent from './components/main-menu.js';
import MovieListComponent from './presenter/movie-list.js';
import MovieStatisticComponent from './components/movie-statistic.js';
import {render, RenderPosition} from './utils/render.js';
import {generateArray} from './utils/common.js';
import {generateFilmCard} from './mock/film-cards.js';
import {generateFilters} from './mock/filters.js';
import {CardCount} from './const.js';

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const films = generateArray(CardCount.DEFAULT, generateFilmCard);
let filters = generateFilters(films);

render(header, new UserProfileComponent(films), RenderPosition.BEFOREEND);
render(main, new MainMenuComponent(filters), RenderPosition.BEFOREEND);

new MovieListComponent().render(films);
render(footer, new MovieStatisticComponent(films.length), RenderPosition.BEFOREEND);

render(main, new UserStatisticComponent(films), RenderPosition.BEFOREEND);
