import UserProfileComponent from './components/user-profile.js';
import SiteNavigationComponent from './components/site-navigation.js';
import StatisticsComponent from './components/statistics.js';
import BoardComponent from './components/board.js';
import MovieListPresenter from './presenter/movie-list.js';
import FilterPresenter from './presenter/movie-filter.js';
import FilmsModel from './models/films.js';
import {render, remove} from './utils/render.js';
import MovieStatisticComponent from './components/movie-statistic.js';
import Api from './api/api.js';
// import LoadComponent from './components/load-films.js';

const AUTHORIZATION = `Basic djknflsdakjfnslazdjk`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();

const siteNavigationComponent = new SiteNavigationComponent();
const filterPresenter = new FilterPresenter(siteNavigationComponent.getElement(), filmsModel);
const boardComponent = new BoardComponent();
const pagePresenter = new MovieListPresenter(boardComponent, filmsModel, api);
const statisticsComponent = new StatisticsComponent(filmsModel);
// const loadComponent = new LoadComponent();

render(siteHeaderElement, new UserProfileComponent(filmsModel));
filterPresenter.render();
render(siteMainElement, siteNavigationComponent);
render(siteMainElement, boardComponent);
boardComponent.getElement().innerHTML = `<h2 class="films-list__title">Loading...</h2>`;
pagePresenter.render();
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

api.getFilms()
  .then((films) => {
    boardComponent.getElement().innerHTML = ``;
    filmsModel.setFilms(films);
    pagePresenter.render(films);
    render(siteFooterElement, new MovieStatisticComponent(films.length));
  });

siteNavigationComponent.setClickHandler((isStatistics) => {
  if (isStatistics) {
    pagePresenter.hide();
    statisticsComponent.show();
  } else {
    statisticsComponent.hide();
    pagePresenter.show();
  }
});
