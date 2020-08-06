import {
  getRandomNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRandomArrayElements,
  getRandomArrayItem,
  generateArray,
} from '../util';

const MonthNames = {
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

const filmTitles = [
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

const filmDescriptions = [
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

const filmPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const filmGenres = [
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

const directors = [
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

const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Ethan Coen and Joel Coen`,
  `Robert Towne`,
  `Francis Ford Coppola`,
  `Quentin Tarantino`,
];

const actors = [
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

const countries = [
  `USA`,
  `Canada`,
  `Russia`,
  `Spain`,
  `Italy`,
  `Poland`,
  `South Korea`,
  `Japan`,
];

const emojis = [
  `smile`,
  `angry`,
  `puke`,
  `sleeping`,
];

const authors = [
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
  `Александр Невский(Курицын)`,
  `Arnie`,
  `Imaguywithagun`,
];

const texts = [
  `10 из 10, Господи!`,
  `Зачем я потратил на это время???!`,
  `Актёры ужасные, режиссёрская работа отвратительная, саундтрек хуже некуда, сюжета нет. Однозначно рекомендую!`,
  `Фильм хороший, но я заснул...`,
  `Под пивко сойдёт!`,
  `У меня только два вопроса идиотам, сделавшим этот фильм: что они курили и чем они кололись?`,
  `Вот так вот!`,
  `Абсолютли`,
  `Это ШЕДЕВР!`,
  `Я-я-я-я-ЗЬ!`,
  `Я вообще ничего не понимаю.`,
  `May the force be with you`,
  `Да разве это кино?? Смотрите лучше фильмы со мной`,
  `I'm BATMAN`,
  `Годнота, всем рекомендую.`,
  `Фильм атстой! омерикосы снимать ни умеют, сморите лудше руское кино! `,
];

const filmAges = [`0+`, `6+`, `12+`, `16+`, `18+`];

const DescriptionLength = {
  MIN: 1,
  MAX: 5,
};
const CommentParameter = {
  MIN: 0,
  MAX: 20,
  YEAR: 1970,
  MONTH: 0,
  DAY: 1,
};

const RatingParameter = {
  MIN: 0,
  MAX: 10,
  FIXED: 1,
};

const DurationParameter = {
  HOUR: {
    MIN: 1,
    MAX: 4,
  },
  MINUTE: {
    MIN: 0,
    MAX: 59,
  }
};

const GenreParameter = {
  MIN: 1,
  MAX: 3,
};

const WriterParameter = {
  MIN: 1,
  MAX: 3,
};

const ActorParameter = {
  MIN: 2,
  MAX: 6
};

const FilmStartDate = {
  YEAR: 1900,
  MONTH: 0,
  DAY: 1,
};

/**
 * Create new comment object
 * @return {object} new comment
 */
const generateFilmComment = () => {
  const commentDate = getRandomDate(new Date(CommentParameter.YEAR, CommentParameter.MONTH, CommentParameter.DAY), new Date());
  return {
    emoji: getRandomArrayItem(emojis),
    text: getRandomArrayItem(texts),
    author: getRandomArrayItem(authors),
    date: `${commentDate.toLocaleDateString()} ${commentDate.toLocaleTimeString()}`,
  };
};

/**
 * Create new film object
 * @return {object} film card
 */
const generateFilmCard = () => {
  const filmDate = getRandomDate(new Date(FilmStartDate.YEAR, FilmStartDate.MONTH, FilmStartDate.DAY), new Date());
  return {
    title: getRandomArrayItem(filmTitles),
    poster: getRandomArrayItem(filmPosters),
    description: getRandomArrayElements(filmDescriptions, DescriptionLength.MIN, DescriptionLength.MAX).join(` `),
    comments: generateArray(getRandomIntegerNumber(CommentParameter.MIN, CommentParameter.MAX), generateFilmComment),
    rating: getRandomNumber(RatingParameter.MIN, RatingParameter.MAX).toFixed(RatingParameter.FIXED),
    year: filmDate.getFullYear(),
    duration: {
      hours: getRandomIntegerNumber(DurationParameter.HOUR.MIN, DurationParameter.HOUR.MAX),
      minutes: getRandomIntegerNumber(DurationParameter.MINUTE.MIN, DurationParameter.MINUTE.MAX),
    },
    genres: getRandomArrayElements(filmGenres, GenreParameter.MIN, GenreParameter.MAX),
    isInFavorites: Boolean(getRandomIntegerNumber()),
    isInWatchlist: Boolean(getRandomIntegerNumber()),
    isInHistory: Boolean(getRandomIntegerNumber()),
    additional: {
      age: getRandomArrayItem(filmAges),
      director: getRandomArrayItem(directors),
      writers: getRandomArrayElements(writers, WriterParameter.MIN, WriterParameter.MAX),
      actors: getRandomArrayElements(actors, ActorParameter.MIN, ActorParameter.MAX),
      releaseDate: `${filmDate.getDate()} ${MonthNames[filmDate.getMonth()]}`,
      country: getRandomArrayItem(countries),
    }
  };
};

export {filmGenres, generateFilmCard};