import AbstractComponent from './abstract-component.js';

const createControlsTemplate = ({isInWatchlist, isInHistory, isInFavorites}) => {

  const getElementState = (isChecked) => isChecked ? `film-card__controls-item--active` : ``;

  return (
    `<form class="film-card__controls">
      <button data-control="isInWatchlist" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getElementState(isInWatchlist)}">Add to watchlist</button>
      <button data-control="isInHistory" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getElementState(isInHistory)}">Mark as watched</button>
      <button data-control="isInFavorites" class="film-card__controls-item button film-card__controls-item--favorite ${getElementState(isInFavorites)}">Mark as favorite</button>
    </form>`
  );
};

export default class CardControls extends AbstractComponent {
  constructor(options) {
    super();

    this._options = options;
  }

  getTemplate() {
    return createControlsTemplate(this._options);
  }

  setControlsClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      evt.preventDefault();

      handler(evt.target.dataset.control);
    });
  }
}
