import {FILM_GENRES} from '../const.js';
import AbstractComponent from './abstract-component.js';

const getStatisticInfo = (films) => {
  const filmsInHistory = films.filter((it) => it.isInHistory);
  let totalTime = 0;
  let genreRate = [];

  if (filmsInHistory.length > 0) {
    const allFilmsGenresCombined = filmsInHistory.reduce((sum, {genres}) => sum.concat(genres), []);

    FILM_GENRES.forEach((genreFromList) => {
      genreRate.push({
        [genreFromList]: allFilmsGenresCombined.filter((genre) => genre === genreFromList).length
      });
    });

    genreRate.sort((a, b) => Object.values(b) - Object.values(a));
  }

  totalTime = filmsInHistory.reduce((total, {duration}) => {
    return total + duration.hours * 60 + duration.minutes;
  }, 0);

  return {
    watched: filmsInHistory.length,
    duration: {
      hours: Math.trunc(totalTime / 60),
      minutes: totalTime % 60,
    },
    topGenre: filmsInHistory.length > 0 ? Object.keys(genreRate[0]) : ``,
  };
};

const createUserStatisticTemplate = (films) => {
  const {watched, duration, topGenre} = getStatisticInfo(films);
  return (
    `<section class="statistic">
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watched}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${duration.hours}<span class="statistic__item-description">h</span> ${duration.minutes}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class UserStatistic extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createUserStatisticTemplate(this._films);
  }
}
