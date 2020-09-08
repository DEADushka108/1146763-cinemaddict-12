import API from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatisticView from './view/footer-statistic.js';
import MenuView from './view/menu.js';
import FilmsModel from './models/films.js';
import PagePresenter from './presenter/movie-list.js';
import StatisticView from './view/statistic.js';
import {render} from './utils/render.js';
import UserPresenter from './presenter/user.js';
import {MenuItem} from './const.js';

const AUTHORIZATION = `Basic fvbdflmskncfvwlfm`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderPage = () => {
  pagePresenter.render();
  render(siteFooterElement, new FooterStatisticView(filmsModel.getAllFilms().length));
};

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();

const menuView = new MenuView();
render(siteMainElement, menuView);

new FilterPresenter(menuView.getElement(), filmsModel).render();

const statisticsView = new StatisticView(filmsModel);
statisticsView.hide();
render(siteMainElement, statisticsView);

const pagePresenter = new PagePresenter(siteMainElement, filmsModel, apiWithProvider);
pagePresenter.showPreloader();


menuView.setOnChangeHandler((menuItem) => {

  switch (menuItem) {
    case MenuItem.FILMS:
      statisticsView.hide();
      pagePresenter.show();
      break;

    case MenuItem.STATS:
      pagePresenter.hide();
      statisticsView.show();
      break;
  }
});

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pagePresenter.removePreloader();
    new UserPresenter(siteHeaderElement, filmsModel).render();
    renderPage();
  })
  .catch(() => {
    pagePresenter.removePreloader();
    renderPage();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
