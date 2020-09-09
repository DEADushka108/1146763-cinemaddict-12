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

const Url = {
  MOVIES: `movies`,
  COMMENTS: `comments`,
  SYNC: `movies/sync`,
};

const HEADER = {"Content-Type": `application/json`};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._sendRequest({
      url: Url.MOVIES,
    })
    .then(Api.toJSON);
  }

  getComment(id) {
    return this._sendRequest({
      url: `${Url.COMMENTS}/${id}`
    })
    .then(Api.toJSON);
  }

  updateFilm(id, film) {
    return this._sendRequest({
      url: `${Url.MOVIES}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.adaptToServer()),
      headers: new Headers(HEADER)
    })
      .then(Api.toJSON);
  }

  addComment(id, comment) {
    return this._sendRequest({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.POST,
      body: comment,
      headers: new Headers(HEADER)
    })
      .then(Api.toJSON);
  }

  deleteComment(id) {
    return this._sendRequest({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.DELETE
    });
  }

  sync(films) {
    return this._sendRequest({
      url: Url.SYNC,
      method: Method.POST,
      body: JSON.stringify(films),
      headers: new Headers(HEADER)
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
