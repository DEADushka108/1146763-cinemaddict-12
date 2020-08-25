import AbstractSmartComponent from './abstract-smart-component.js';
import {getUserTitle} from './user-profile.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, stats) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: stats.map((stat) => stat.genre),
      datasets: [{
        data: stats.map((stat) => stat.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getTimeRange = (filter) => {
  const dateTo = new Date();
  let dateFrom = new Date();

  switch (filter) {
    case `all-time`:
      dateFrom = null;
      break;

    case `today`:
      dateFrom.setDate(dateTo.getDate() - 1);
      break;

    case `week`:
      dateFrom.setDate(dateTo.getDate() - 7);
      break;

    case `month`:
      dateFrom.setMonth(dateTo.getMonth() - 1);
      break;

    case `year`:
      dateFrom.setFullYear(dateTo.getFullYear() - 1);
      break;
  }

  return [dateFrom, dateTo];
};

const sortByGenre = (films) => {
  const uniqGenres = [];
  const genresOfEveryFilm = films.map((film) => film.genres);

  genresOfEveryFilm.forEach((genres) => {
    genres.forEach((genre) => {
      if (!uniqGenres.some((uniqGenre) => uniqGenre === genre)) {
        uniqGenres.push(genre);
      }
    });
  });

  const genresStat = [];

  uniqGenres.forEach((uniqGenre) => {
    const uniqGenreCount = genresOfEveryFilm.reduce((acc, genres) => {
      const isThere = genres.some((genre) => genre === uniqGenre);

      if (isThere) {
        return acc + 1;
      }

      return acc;
    }, 0);

    genresStat.push({
      genre: uniqGenre,
      count: uniqGenreCount,
    });
  });

  return genresStat.sort((a, b) => b.count - a.count);
};

const getFilmsByTimeRange = (films, filter) => {
  const [dateFrom, dateTo] = getTimeRange(filter);

  if (!(dateFrom instanceof Date)) {
    return films;
  }

  return films.filter((film) => {
    return film.watchingDate >= dateFrom && film.watchingDate <= dateTo;
  });
};

const createTotalDurationMarkup = (films) => {
  const totalDuration = films.reduce((sum, film) => {
    return sum + film.duration;
  }, 0);

  const hours = totalDuration >= 60 ? `${moment.duration(totalDuration, `minutes`).hours()} <span class="statistic__item-description">h</span>` : ``;

  const minutes = totalDuration > 0 ? `${moment.duration(totalDuration, `minutes`).minutes()} <span class="statistic__item-description">m</span>` : ``;

  return hours && minutes ? `${hours} ${minutes}` : null;
};

const createStatisticsTemplate = (films, activeFilter) => {
  const userTitle = getUserTitle(films);

  const filteredFilms = getFilmsByTimeRange(films, activeFilter);

  const filteredFilmsCount = filteredFilms.length;

  const sortedByGenre = sortByGenre(filteredFilms);

  const topGenre = filteredFilmsCount ? sortedByGenre[0].genre : null;

  const totalDurationMarkup = createTotalDurationMarkup(filteredFilms);

  return (
    `<section class="statistic">
      ${userTitle ?
      `<p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userTitle}</span>
      </p>` : ``}
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${activeFilter === `all-time` ? `checked` : ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${activeFilter === `today` ? `checked` : ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${activeFilter === `week` ? `checked` : ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${activeFilter === `month` ? `checked` : ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${activeFilter === `year` ? `checked` : ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${filteredFilmsCount} <span class="statistic__item-description">movies</span></p>
        </li>
      ${filteredFilmsCount ?
      ` <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDurationMarkup}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
      ` : ``}
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000" height="${BAR_HEIGHT * sortedByGenre.length}"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._activeFilter = `all-time`;

    this._filmsChart = null;
    this._statisticCtx = null;

    this._setFilterClickHandler();
    this._renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmsModel.getWatchedFilms(), this._activeFilter);
  }

  show() {
    super.show();

    this._activeFilter = `all-time`;

    this.rerender();
  }

  restoreHandlers() {
    this._setFilterClickHandler();
  }

  rerender() {
    super.rerender();

    this._renderChart();
  }

  _setFilterClickHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      this._activeFilter = evt.target.value;

      this.rerender();
    });
  }

  _renderChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    this._resetCharts();

    const filteredFilms = getFilmsByTimeRange(this._filmsModel.getWatchedFilms(), this._activeFilter);

    const genresStats = sortByGenre(filteredFilms);

    this._statisticCtx = renderChart(statisticCtx, genresStats);
  }

  _resetCharts() {
    if (this._filmsChart) {
      this._filmsChart.destroy();
      this._filmsChart = null;
    }
  }
}
