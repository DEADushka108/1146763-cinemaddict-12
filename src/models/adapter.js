export default class Adapter {
  constructor(film) {
    this.id = film[`id`];
    this.comments = film[`comments`];
    this.title = film[`film_info`][`title`];
    this.altTitle = film[`film_info`][`alternative_title`];
    this.poster = film[`film_info`][`poster`];
    this.description = film[`film_info`][`description`];
    this.rating = film[`film_info`][`total_rating`];
    this.releaseDate = new Date(film[`film_info`][`release`][`date`]);
    this.country = film[`film_info`][`release`][`release_country`];
    this.duration = film[`film_info`][`runtime`];
    this.genres = film[`film_info`][`genre`];
    this.age = film[`film_info`][`age_rating`];
    this.director = film[`film_info`][`director`];
    this.writers = film[`film_info`][`writers`];
    this.actors = film[`film_info`][`actors`];
    this.isInFavorites = film[`user_details`][`favorite`];
    this.isInWatchlist = film[`user_details`][`watchlist`];
    this.isInHistory = film[`user_details`][`already_watched`];
    this.watchingDate = new Date(film[`user_details`][`watching_date`]);
  }

  adaptToServer() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.altTitle,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate,
          "release_country": this.country,
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.isInWatchlist,
        "already_watched": this.isInHistory,
        "watching_date": this.watchingDate,
        "favorite": this.isInFavorites,
      }
    };
  }

  static createFilm(data) {
    return new Adapter(data);
  }

  static createFilms(data) {
    return data.map(Adapter.createFilm);
  }

  static clone(data) {
    return new Adapter(data.adaptToServer());
  }
}
