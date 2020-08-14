/**
 * Create random float number
 * @param {number} a from
 * @param {number} b to
 * @return {number}
 */
export const getRandomNumber = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return lower + Math.random() * (upper - lower);
};

/**
 * Generate random integer number
 * @param {number} a from
 * @param {number} b to
 * @return {number} random numder
 */
export const getRandomIntegerNumber = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Choose random array element
 * @param {array} array
 * @return {string|number} random array element
 */
export const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

/**
 * Create new random array in range from max to min values
 * @param {array} array
 * @param {number} min
 * @param {number} max
 * @return {array} random array
 */
export const getRandomArrayElements = (array, min, max) => {
  const randomMax = getRandomIntegerNumber(min, max);
  const newArray = array.slice();

  shuffleArray(newArray);

  return newArray.slice(0, randomMax);
};

/**
 * Create random date in range from start to end dates
 * @param {Date} start
 * @param {Date} end
 * @return {Date} random date
 */
export const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

/**
 * Generate new array
 * @param {number} count number of elements
 * @param {function} func
 * @return {array}
 */
export const generateArray = (count, func) => {
  return new Array(count).fill(``).map(func);
};
