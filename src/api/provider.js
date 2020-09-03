import Adapter from '../models/adapter.js';

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
      .then((films) => {
        const items = createStoreStructure(films);
        this._store.setItems(items);
        return Adapter.createFilms(films);
      });
    }
    const storeFilms = Object.values(this._store.getItems());
    return Promise.resolve(Adapter.createFilms(storeFilms));
  }

  updateFilm(id, film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, newFilm);

        return Adapter.createFilm(newFilm);
      });
    }
    const localFilm = Object.assign(film, {id});
    this._store.setItem(id, localFilm);
    return Promise.resolve(Adapter.clone(localFilm));
  }

  getComment(id) {
    if (Provider.isOnline()) {
      return this._api.getComment(id);
    }

    return Promise.reject(`offline`);
  }

  addComment(id, comment) {
    if (Provider.isOnline()) {
      return this._api.addComment(id, comment);
    }

    return Promise.reject(`offline`);
  }

  deleteComment(id) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(`offline`);
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = getSyncedFilms(response.updated);
          const items = createStoreStructure(updatedFilms);
          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}