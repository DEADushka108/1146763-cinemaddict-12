import UserProfileComponent from './components/user-profile.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/movie-filter.js';
import FilmsModel from './models/films.js';
import {generateFilmsCard} from './mock/film-cards.js';
import {render} from './utils/render.js';
import {CardCount} from './const.js';
import MovieStatisticComponent from './components/movie-statistic.js';

const films = generateFilmsCard(CardCount.DEFAULT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserProfileComponent(filmsModel));

const siteNavigationComponent = new SiteNavigationComponent();
render(siteMainElement, siteNavigationComponent);

new FilterPresenter(siteNavigationComponent.getElement(), filmsModel).render();

const pagePresenter = new MovieListPresenter(siteMainElement, filmsModel);
pagePresenter.render();

render(siteFooterElement, new MovieStatisticComponent(films.length));

const statisticsComponent = new StatisticsComponent(filmsModel);
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

siteNavigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pagePresenter.destroy();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pagePresenter.render();
  }
});
