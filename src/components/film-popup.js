import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createGenresTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);
};

<<<<<<< HEAD:src/components/film-details.js
const createFilmDetailsTemplate = (film) => {
  const {title, altTitle, poster, description, rating, releaseDate, duration, genres, age, director, writers, actors, country} = film;
=======
const createPopupTemplate = (film) => {
  const {title, poster, description, rating, releaseDate, duration, genres, age, director, writers, actors, country} = film;
  const {isInFavorites, isInWatchlist, isInHistory} = film.controls;
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611:src/components/film-popup.js

  const genresTemplate = createGenresTemplate(genres);

  const getPluralOrSingularWordGenre = () => genres.length > 1 ? `Genres` : `Genre`;

<<<<<<< HEAD:src/components/film-details.js
=======
  const getCheckedStatus = (isCheckedParameter) => isCheckedParameter ? `checked` : ``;

>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611:src/components/film-popup.js
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="${title}">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${altTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(releaseDate).format(`DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${Math.trunc(duration / 60)}h ${duration % 60}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${getPluralOrSingularWordGenre()}</td>
                  <td class="film-details__cell">
                    ${genresTemplate}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
<<<<<<< HEAD:src/components/film-details.js
        </div>

        <div class="form-details__bottom-container">

        </div>
=======

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" data-control="isInWatchlist" ${getCheckedStatus(isInWatchlist)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" data-control="isInHistory" ${getCheckedStatus(isInHistory)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" data-control="isInFavorites" ${getCheckedStatus(isInFavorites)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611:src/components/film-popup.js
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
    this._currentControls = film.controls;

    this._subscribeOnEvents();
  }

  getTemplate() {
<<<<<<< HEAD:src/components/film-details.js
    return createFilmDetailsTemplate(this._film, this._comments);
=======
    return createPopupTemplate(this._film);
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611:src/components/film-popup.js
  }

  getControlsStatus() {
    return this._currentControls;
  }
<<<<<<< HEAD:src/components/film-details.js
=======

  setClickHandler(callback) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, callback);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      this._currentControls[evt.target.dataset.control] = !this._currentControls[evt.target.dataset.control];
    });
  }
>>>>>>> 617a01152fa37880ea8a3df2c74c81863c650611:src/components/film-popup.js
}
