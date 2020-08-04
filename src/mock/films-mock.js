const MONTH_NAMES = [
  `January`,
  `Fabruary`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

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

const getRandomNumber = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return lower + Math.random() * (upper - lower);
};

const getRandomIntegerNumber = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomIntegerNumber(0, array.length);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const getRandomArrayElements = (array, min, max) => {
  const randomMax = getRandomIntegerNumber(min, max);
  const newArray = array.slice();

  shuffleArray(newArray);

  return newArray.slice(0, randomMax);
};

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const generateFilmComment = () => {
  return {
    emoji: getRandomArrayItem(EMOJI),
    text: getRandomArrayItem(TEXT),
    author: getRandomArrayItem(AUTHOR),
    date: getRandomDate(new Date(1970, 0, 1), new Date()),
  };
};

const generateFilmComments = (count) => {
  return new Array(count).fill(``).map(generateFilmComment);
};

const generateFilmCard = () => {
  return {
    title: getRandomArrayItem(FILM_TITLES),
    poster: getRandomArrayItem(FILM_POSTERS),
    description: getRandomArrayElements(FILM_DESCRIPTIONS, 1, 5).join(` `),
    comments: generateFilmComments(getRandomIntegerNumber(0, 20)),
    rating: getRandomNumber(0, 10).toFixed(1),
    year: getRandomIntegerNumber(1900, 2020),
    duration: {
      hours: getRandomIntegerNumber(1, 3),
      minutes: getRandomIntegerNumber(0, 60),
    },
    genres: getRandomArrayElements(FILM_GENRES, 1, 3),
    isInFavorites: Boolean(getRandomIntegerNumber()),
    isInWatchlist: Boolean(getRandomIntegerNumber()),
    isInHistory: Boolean(getRandomIntegerNumber()),
    additional: {
      age: getRandomArrayItem(FILM_AGES),
      director: getRandomArrayItem(FILM_DIRECTORS),
      writers: getRandomArrayElements(FILM_WRITERS, 1, 2).join(`, `),
      actors: getRandomArrayElements(FILM_ACTORS, 2, 6).join(`, `),
      releaseDate: `${getRandomIntegerNumber(1, 30)} ${getRandomArrayItem(MONTH_NAMES)}`,
      country: getRandomArrayItem(FILM_COUNTRIES),
    }
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};

export {FILM_GENRES, generateFilmCards};
