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
    .then(Api.toJSON);
  }

  updateFilm(id, film) {
    return this._sendRequest({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.adaptToServer()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
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
      method: Method.DELETE
    });
  }

  sync(data) {
    return this._sendRequest({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then(Api.toJSON);
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
