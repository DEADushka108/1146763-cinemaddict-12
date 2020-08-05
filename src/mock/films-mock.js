import {
  getRandomNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRandomArrayElements,
  getRandomArrayItem,
  generateArray,
} from '../util';

const MONTH_NAMES = {
  0: `January`,
  1: `Fabruary`,
  2: `March`,
  3: `April`,
  4: `May`,
  5: `June`,
  6: `July`,
  7: `August`,
  8: `September`,
  9: `October`,
  10: `November`,
  11: `December`,
};

const FILM_TITLES = [
  `Knokin' on heaven doors`,
  `Fight club`,
  `Filth`,
  `Back to the Future`,
  `Ghostbusters`,
  `The Gentlemen`,
  `Green book`,
  `1+1`,
  `Joker`,
  `Leon`,
  `Fifth Element`,
  `Coherence`,
  `Shining`,
  `The Mask`,
  `FAQ about time travel`,
  `Alien`,
  `Revolver`,
  `Lock, stock and two smokin' barrels`,
  `Silent Hill`,
  `14/08`,
  `Spirited Away`,
  `Howl's Moving Castle`,
  `My Neighbor Totoro`,
  `The Terminator`,
  `They Live`,
  `1984`,
  `The Nacked Gun`,
  `Hot Shots!`,
  `Star Wars`,
  `Star Trek`,
  `Inglorious Bustard`,
  `Pulp Fiction`,
  `The Hateful Eight`,
  `From Dusk Till Down`,
  `Three Rooms`,
  `Reservoir Dogs`,
  `Old Boy`,
];

const FILM_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const FILM_POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const FILM_GENRES = [
  `Horror`,
  `Action`,
  `Adventure`,
  `Musical`,
  `Comedy`,
  `Thriller`,
  `Detective`,
  `Anime`,
  `Drama`,
  `Melodrama`,
  `Art house`,
  `Fantasy`,
  `Space opera`,
];

const FILM_DIRECTORS = [
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Quentin Tarantino`,
  `Orson Welles`,
  `Woody Allen`,
  `Clint Eastwood`,
  `Robert Wide`,
  `Christopher Nolan`,
  `David Lynch`,
  `Peter Jackson`,
  `Park Chen-wook`,
];

const FILM_WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Ethan Coen and Joel Coen`,
  `Robert Towne`,
  `Francis Ford Coppola`,
  `Quentin Tarantino`,
];

const FILM_ACTORS = [
  `Jack Nicholson`,
  `Tom Hardy`,
  `Joaquin Phoenix`,
  `Hugh Jackman`,
  `Bradley Cooper`,
  `Josh Brolin`,
  `Mahershala Ali`,
  `Robert Downey Jr.`,
  `Leonardo DiCaprio`,
  `Christian Bale`,
  `Johnny Depp`,
  `Brad Pitt`,
  `Andjelina Joly`
];

const FILM_COUNTRIES = [
  `USA`,
  `Canada`,
  `Russia`,
  `Spain`,
  `Italy`,
  `Poland`,
  `South Korea`,
  `Japan`,
];

const EMOJI = [
  `smile`,
  `angry`,
  `puke`,
  `sleeping`,
];

const AUTHOR = [
  `Антон Логвинов`,
  `Алексей Навальный`,
  `Movie MAker`,
  `ItchyTritchyFingerNiggaz`,
  `MWA`,
  `Ilya_Nagibator2006`,
  `Kitty_12`,
  `Boom_pow_wow`,
  `Serinity1234`,
  `Magnolia_Fan`,
  `Kevin_Smith`,
  `Batman2000`,
];

const TEXT = [
  `10 из 10, Господи!`,
  `Зачем я потратил на это время???!`,
  `Актёры ужасные, режиссёрская работа отвратительная, саундтрек хуже некуда, сюжета нет. Однозначно рекомендую!`,
  `Фильм хороший, но я заснул...`,
  `Под пивко сойдёт!`,
  `У меня только два вопроса идиотам, сделавшим этот фильм: что они курили и чем они кололись?`,
  `И есть ещё такая категория людей, которые пишут: «Да этот мудак... Ему вообще ничего не нравится,
    он по жизни недоволен, как будто месячные постоянно». Нет, мне много чего нравится, на самом деле. Мне много чего нравится,
    например, азиатки. Так что не надо так про меня говорить, я хороший.`,
  `Да разве это кино?? Смотрите лучше фильмы со мной`,
  `I'm BATMAN`,
  `Годнота, всем рекомендую.`,
  `Фильм атстой! омерикосы снимать ни умеют, сморите лудше руское кино! `,
];

const FILM_AGES = [`0+`, `6+`, `12+`, `16+`, `18+`];

const DESCRIPTION_LENGTH = {
  MIN: 1,
  MAX: 5,
};
const COMMENT_PARAMETER = {
  MIN: 0,
  MAX: 20,
  YEAR: 1970,
  MONTH: 0,
  DAY: 1,
};

const RATING_PARAMETER = {
  MIN: 0,
  MAX: 10,
  FIXED: 1,
};

const DURATION_PARAMETERS = {
  HOUR: {
    MIN: 1,
    MAX: 4,
  },
  MINUTE: {
    MIN: 0,
    MAX: 59,
  }
};

const GENRE_PARAMETER = {
  MIN: 1,
  MAX: 3,
};

const WRITER_PARAMETER = {
  MIN: 1,
  MAX: 3,
};

const ACTOR_PARAMETER = {
  MIN: 2,
  MAX: 6
};

const FILM_START_DATE = {
  YEAR: 1900,
  MONTH: 0,
  DAY: 1,
};

/**
 * Create new comment object
 * @return {object} new comment
 */
const generateFilmComment = () => {
  const commentDate = getRandomDate(new Date(COMMENT_PARAMETER.YEAR, COMMENT_PARAMETER.MONTH, COMMENT_PARAMETER.DAY), new Date());
  return {
    emoji: getRandomArrayItem(EMOJI),
    text: getRandomArrayItem(TEXT),
    author: getRandomArrayItem(AUTHOR),
    date: `${commentDate.toLocaleDateString()} ${commentDate.toLocaleTimeString()}`,
  };
};

/**
 * Create new film object
 * @return {object} film card
 */
const generateFilmCard = () => {
  const filmDate = getRandomDate(new Date(FILM_START_DATE.YEAR, FILM_START_DATE.MONTH, FILM_START_DATE.DAY), new Date());
  return {
    title: getRandomArrayItem(FILM_TITLES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: getRandomArrayElements(FILM_DESCRIPTIONS, DESCRIPTION_LENGTH.MIN, DESCRIPTION_LENGTH.MAX).join(` `),
    comments: generateArray(getRandomIntegerNumber(COMMENT_PARAMETER.MIN, COMMENT_PARAMETER.MAX), generateFilmComment),
    rating: getRandomNumber(RATING_PARAMETER.MIN, RATING_PARAMETER.MAX).toFixed(RATING_PARAMETER.FIXED),
    year: filmDate.getFullYear(),
    duration: {
      hours: getRandomIntegerNumber(DURATION_PARAMETERS.HOUR.MIN, DURATION_PARAMETERS.HOUR.MAX),
      minutes: getRandomIntegerNumber(DURATION_PARAMETERS.MINUTE.MIN, DURATION_PARAMETERS.MINUTE.MAX),
    },
    genres: getRandomArrayElements(FILM_GENRES, GENRE_PARAMETER.MIN, GENRE_PARAMETER.MAX),
    isInFavorites: Boolean(getRandomIntegerNumber()),
    isInWatchlist: Boolean(getRandomIntegerNumber()),
    isInHistory: Boolean(getRandomIntegerNumber()),
    additional: {
      age: getRandomArrayItem(FILM_AGES),
      director: getRandomArrayItem(FILM_DIRECTORS),
      writers: getRandomArrayElements(FILM_WRITERS, WRITER_PARAMETER.MIN, WRITER_PARAMETER.MAX).join(`, `),
      actors: getRandomArrayElements(FILM_ACTORS, ACTOR_PARAMETER.MIN, ACTOR_PARAMETER.MAX).join(`, `),
      releaseDate: `${filmDate.getDate()} ${MONTH_NAMES[filmDate.getMonth()]}`,
      country: getRandomArrayItem(FILM_COUNTRIES),
    }
  };
};

export {FILM_GENRES, generateFilmCard};
