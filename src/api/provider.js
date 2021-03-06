import AdapterModel from '../models/adapter-model.js';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
      .then((films) => {
        this._store.setItems(this._createStoreStructure(films));
        return AdapterModel.createFilms(films);
      });
    }
    const storeFilms = Object.values(this._store.getItems());
    return Promise.resolve(AdapterModel.createFilms(storeFilms));
  }

  getComment(id) {
    if (Provider.isOnline()) {
      return this._api.getComment(id);
    }

    return Promise.reject(`offline`);
  }

  updateFilm(id, film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(id, film)
      .then((newFilm) => {
        this._store.setItem(newFilm.id, newFilm);

        return AdapterModel.createFilm(newFilm);
      });
    }
    const localFilm = Object.assign({id}, film.adaptToServer());
    this._store.setItem(id, localFilm);
    return Promise.resolve(AdapterModel.createFilm(localFilm));
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
          const updatedFilms = response.updated;
          const items = this._createStoreStructure(updatedFilms);
          this._store.setItems(items);
        });
    }
    return Promise.reject(new Error(`Sync data failed`));
  }

  _createStoreStructure(items) {
    return items.reduce((acc, current) => {
      return Object.assign({}, acc, {
        [current.id]: current,
      });
    }, {});
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
