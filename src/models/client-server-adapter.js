export default class Adapter {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.altTitle = data[`film_info`][`alternative_title`];
    this.poster = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.release = new Date(data[`film_info`][`release`][`date`]);
    this.duration = data[`film_info`][`runtime`];
    this.description = data[`film_info`][`description`];
    this.age = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.actors = data[`film_info`][`actors`];
    this.writers = data[`film_info`][`writers`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.genres = data[`film_info`][`genre`];
    this.watchingDate = new Date(data[`user_details`][`watchin_date`]);

    this.controls = {
      isInWatchlist: data[`user_details`][`watchlist`],
      isInHistory: data[`user_details`][`already_watched`],
      isInFavorites: data[`user_details`][`favorite`],
    };

    this.comments = data[`comments`];
  }

  adaptToServer() {
    return {
      "id": this.id,
      "comments": this.comments.map((comment) =>{
        if (comment instanceof Object) {
          return comment.id;
        }
        return comment;
      }),
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
          "date": this.release,
          "release_country": this.country,
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.controls.isInWatchlist,
        "already_watched": this.controls.isInHistory,
        "watching_date": this.watchingDate,
        "favorite": this.controls.isInFavorites,
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
