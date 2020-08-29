import {getUserTitle} from '../utils/utils.js';
import {TimePeriod} from '../const.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getFiltersMarkup = (timePeriod, isChecked) => {
  const filters = Object.values(timePeriod);

  return filters.map((filter) => {
    const filterLabel = (filter.charAt(0).toUpperCase() + filter.slice(1)).replace(`-`, ` `);

    return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
            id="statistic-${filter}" value="${filter}" ${filter === isChecked ? `checked` : ``}>
            <label for="statistic-${filter}" class="statistic__filters-label">${filterLabel}</label>`;
  }).join(`\n`);
};

const createStatisticTemplate = (films, activeItem) => {
  const statistic = getStatisticInfo(films);
  const {watched, duration, topGenre} = statistic;
  const title = getUserTitle(films);
  const filtersMarkup = getFiltersMarkup(TimePeriod, activeItem);

  return (
    `<section class="statistic">
      ${title ? `
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">${title}</span>
        </p>` : ``}

        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
          ${filtersMarkup}
        </form>

        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${watched}<span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text">${duration.hours}<span class="statistic__item-description">h</span>${duration.minutes}<span class="statistic__item-description">m</span></p>
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

const getGenreRates = (films) => {
  const filmsInHistory = films.filter((film) => film.isInHistory);

  let filmGenres = [];
  films.map((film) => film.genres.forEach((genre) => filmGenres.push(genre)));
  filmGenres = filmGenres.filter((genre, index) => {
    return filmGenres.indexOf(genre) === index;
  });

  let genreRates = [];

  if (filmsInHistory.length > 0) {
    filmGenres.map((filmGenre) => {
      const key = filmGenre;
      const genreRate = {
        [key]: filmsInHistory.reduce((sum, film) => sum.concat(film.genres), []).filter((genre) => genre === key).length
      };
      genreRates.push(genreRate);
    });
    genreRates = genreRates.sort((a, b) => Object.values(b) - Object.values(a));
  }

  return genreRates;
};

const getStatisticInfo = (films) => {
  const filmsInHistory = films.filter((film) => film.isInHistory);
  const genreRates = getGenreRates(films);

  let filmDurationHours = 0;
  let filmDurationMinutes = 0;

  filmsInHistory.forEach((film) => {
    filmDurationMinutes += film.duration;
  });

  filmDurationHours = filmDurationMinutes / 60;
  filmDurationMinutes = filmDurationMinutes % 60;

  return {
    watched: filmsInHistory.length,
    duration: {
      hours: Math.floor(filmDurationHours),
      minutes: filmDurationMinutes
    },
    topGenre: filmsInHistory.length > 0 ? Object.keys(genreRates[0]) : ``,
  };
};

const getGenresSortedByWatches = ((films) => { // раскидать все просмотренные фильмы по жанрам и вернуть отсортированный массив (от самого популярного к менее популярному)
  const genreRates = getGenreRates(films);
  const sortedGenreRates = [];

  genreRates.forEach((rate) => {
    if (Object.values(rate) > 0) { // отсеять непросмотренные жанры
      sortedGenreRates.push(Object.keys(rate).join()); // взять ключи из массива объектов
    }
  });

  return sortedGenreRates;
});

const getGenresNumberSortedByWatches = ((films) => { // взять количество посмотренных фильмов для каждого жанра и вернуть массив с ними
  const genreRates = getGenreRates(films);
  const sortedGenreRates = [];

  genreRates.forEach((rate) => {
    if (Object.values(rate) > 0) { // отсеять непросмотренные жанры
      sortedGenreRates.push((Object.values(rate)).join()); // взять значения из массива объектов и отправить в обычный массив
    }
  });

  return sortedGenreRates;
});

const getFilmsByPeriod = (allFilms, dateFrom) => {
  return allFilms.filter((film) => {
    return film.watchingDate > dateFrom;
  });
};

export default class Statistic extends AbstractSmartComponent {
  constructor(filmsModel) {
    super();
    this._filmsModel = filmsModel;

    this._films = this._filmsModel.getAllFilms();
    this._activeItem = TimePeriod.ALL_TIME;

    this._sortedGenres = getGenresSortedByWatches(this._filmsModel.getAllFilms());
    this._sortedGenresNumber = getGenresNumberSortedByWatches(this._filmsModel.getAllFilms());

    this._renderCharts();
    this._onPeriodChange();
  }

  getTemplate() {
    return createStatisticTemplate(this._films, this._activeItem);
  }

  _renderStatistics() {
    const BAR_HEIGHT = 50;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * this._sortedGenres.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._sortedGenres,
        datasets: [{
          data: this._sortedGenresNumber,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
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
  }

  _renderCharts() {
    this._resetCharts();
    this._renderStatistics();
  }

  _resetCharts() {
    if (this._statisticsChart) {
      this._statisticsChart.destroy();
      this._sortedGenres = null;
      this._sortedGenresNumber = null;
    }
  }

  _onPeriodChange() {
    this.getElement().querySelector(`form`).addEventListener(`change`, (evt) => {

      switch (evt.target.value) {
        case TimePeriod.ALL_TIME:
          this._activeItem = TimePeriod.ALL_TIME;
          this.rerender(this._moviesModel.getMoviesAll());
          break;

        case TimePeriod.TODAY:
          this._activeItem = TimePeriod.TODAY;
          const today = new Date(Number(new Date()) - Number(new Date().getHours()) * 60 * 60 * 1000 - Number(new Date().getMinutes()) * 60 * 1000 - Number(new Date().getSeconds()) * 1000); // c 00: 00 сегодняшнего дня
          this.rerender(getFilmsByPeriod(this._moviesModel.getMoviesAll(), today));
          break;

        case TimePeriod.WEEK:
          this._activeItem = TimePeriod.WEEK;
          const week = new Date(Number(new Date()) - 7 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.getMoviesAll(), week));
          break;

        case TimePeriod.MONTH:
          this._activeItem = TimePeriod.MONTH;
          const month = new Date(Number(new Date()) - 30 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.getMoviesAll(), month));
          break;

        case TimePeriod.YEAR:
          this._activeItem = TimePeriod.YEAR;
          const year = new Date(Number(new Date()) - 365 * 24 * 60 * 60 * 1000);
          this.rerender(getFilmsByPeriod(this._moviesModel.getMoviesAll(), year));
          break;
      }
    });

  }

  restoreHandlers() {
    this._onPeriodChange();
  }

  rerender(films) {
    this._films = films;
    this._sortedGenres = getGenresSortedByWatches(films);
    this._sortedGenresNumber = getGenresNumberSortedByWatches(films);
    super.rerender();
    this._renderCharts();
  }

  show() {
    super.show();
    this._activeItem = TimePeriod.ALL_TIME;
    this.rerender(this._moviesModel.getMoviesAll());
  }
}
