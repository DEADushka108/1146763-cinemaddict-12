import API from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatisticView from './view/footer-statistic.js';
import MenuView from './view/menu.js';
import FilmsModel from './models/films.js';
import PagePresenter from './presenter/page.js';
import StatisticView from './view/statistic.js';
import {render} from './utils/render.js';
import UserPresenter from './presenter/user.js';
import {MenuItem} from './const.js';

const AUTHORIZATION = `Basic 12312312;dfsd'f;g,s'fdl,v`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const StoreParameters = {
  PREFIX: `cinemaddict-localstorage`,
  VER: `v1`,
};

const STORE_NAME = `${StoreParameters.PREFIX}-${StoreParameters.VER}`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderPage = () => {
  pagePresenter.removePreloader();
  pagePresenter.render();
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
    filmsModel.set(films);
    new UserPresenter(siteHeaderElement, filmsModel).render();
    renderPage();
    render(siteFooterElement, new FooterStatisticView(filmsModel.getAll().length));
  })
  .catch(() => {
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
