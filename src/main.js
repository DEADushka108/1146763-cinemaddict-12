import API from './api/api.js';
import CommentsModel from './models/comments.js';
import FilterPresenter from './presenter/filter.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import MenuComponent from './components/menu.js';
import FilmsModel from './models/films.js';
import PagePresenter from './presenter/movie-list.js';
import StatisticComponent from './components/statistic.js';
import {render} from './utils/render.js';

const AUTHORIZATION = `Basic dfnjsadjnfasdjfn`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export const MenuItem = {
  FILMS: `films`,
  STATS: `stats`,
};

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const renderPage = () => {
  pagePresenter.removePreloader();
  pagePresenter.render();
  render(siteFooterElement, new FooterStatisticComponent(filmsModel));
};

const api = new API(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();


const menuComponent = new MenuComponent();
render(siteMainElement, menuComponent);

const mainNavigation = siteMainElement.querySelector(`.main-navigation`);

const filterPresenter = new FilterPresenter(mainNavigation, filmsModel);
filterPresenter.render();

const statisticsComponent = new StatisticComponent(filmsModel);
statisticsComponent.hide();
render(siteMainElement, statisticsComponent);

const pagePresenter = new PagePresenter(filmsModel, commentsModel, api);
pagePresenter.showPreloader();


menuComponent.setOnChange((menuItem) => {

  switch (menuItem) {
    case MenuItem.FILMS:
      statisticsComponent.hide();
      pagePresenter.show();
      break;

    case MenuItem.STATS:
      pagePresenter.hide();
      statisticsComponent.show();
      break;
  }
});

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pagePresenter.renderUserTitle(films);
    renderPage();
  })
  .catch(() => {
    renderPage();
  });
