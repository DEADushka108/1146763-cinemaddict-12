import UserProfileComponent from './components/user-profile.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/movie-filter.js';
import FilmsModel from './models/films.js';
import {render} from './utils/render.js';
import API from './api/api.js';
import MovieStatisticComponent from './components/movie-statistic.js';

const AUTHORIZATION = `Basic kjjhdsFIF45h`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const filmsModel = new FilmsModel();

const api = new API(END_POINT, AUTHORIZATION);

const siteNavigationComponent = new SiteNavigationComponent();
const pagePresenter = new MovieListPresenter(siteMainElement, filmsModel, api);


render(siteMainElement, siteNavigationComponent);
const statisticsComponent = new StatisticsComponent(filmsModel);
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    render(siteHeaderElement, new UserProfileComponent(filmsModel));
    new FilterPresenter(siteNavigationComponent.getElement(), filmsModel).render();
    pagePresenter.render();
    render(siteFooterElement, new MovieStatisticComponent(films.length));
  });

siteNavigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pagePresenter.destroy();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pagePresenter.render();
  }
});
