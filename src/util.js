/**
  * Render element from template
  * @param {Element} container
  * @param {string} template
  * @param {string} position
  */
const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

/**
  * Create element from template
  * @param {string} template
  *
  * @return {Node}
  */
const createElement = (template) => {
  let element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

/**
 * Create random float number
 * @param {number} a from
 * @param {number} b to
 * @return {number}
 */
const getRandomNumber = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return lower + Math.random() * (upper - lower);
};

/**
 * Generate random integer number
 * @param {number} a from
 * @param {number} b to
 * @return {number}
 */
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


export {
  renderElement,
  createElement,
  getRandomNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRandomArrayElements,
  getRandomArrayItem
};
