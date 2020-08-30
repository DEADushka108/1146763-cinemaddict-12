import Adapter from '../models/adapter.js';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._sendRequest({
      url: `movies`
    })
    .then(Api.toJSON)
    .then(Adapter.createFilms);
  }

  updateFilm(id, film) {
    return this._sendRequest({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.adaptToServer()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(Adapter.createFilm);
  }

  getComment(id) {
    return this._sendRequest({
      url: `comments/${id}`
    })
    .then(Api.toJSON);
  }

  addComment(id, comment) {
    return this._sendRequest({
      url: `comments/${id}`,
      method: Method.POST,
      body: comment,
      headers: new Headers({"Content-Type": `application/json`})
    });
  }

  deleteComment(id) {
    return this._sendRequest({
      url: `comments/${id}`,
      method: Method.DELETE,
      headers: new Headers({'Content-Type': `application/json`}),
    });
  }

  _sendRequest({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
     .then(Api.checkStatus)
     .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
