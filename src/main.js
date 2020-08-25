import UserProfileComponent from './components/user-profile.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import BoardComponent from './components/board.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/movie-filter.js';
import FilmsModel from './models/films.js';
import {generateFilmsCard} from './mock/film-cards.js';
import {render} from './utils/render.js';
import {CardCount} from './const.js';

const films = generateFilmsCard(CardCount.DEFAULT);
console.log(films[0].comments);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserProfileComponent(filmsModel));
const siteNavigationComponent = new SiteNavigationComponent();
render(siteMainElement, siteNavigationComponent);

const filterController = new FilterPresenter(siteNavigationComponent.getElement(), filmsModel);
filterController.render();

const boardComponent = new BoardComponent();
const pageController = new MovieListPresenter(boardComponent, filmsModel);
render(siteMainElement, boardComponent);
pageController.render(films);

const dateTo = new Date();
const dateFrom = (() => {
  return new Date(dateTo).setDate(dateTo.getDate() - 7);
})();

const statisticsComponent = new StatisticsComponent(filmsModel, dateFrom, dateTo);
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

siteNavigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pageController.hide();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pageController.show();
  }
});
