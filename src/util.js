const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

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
  * Render element from element
  * @param {Element} container
  * @param {string} element
  * @param {string} position
  */
const render = (container, element, position) => {

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
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
 * @return {number} random numder
 */
const getRandomIntegerNumber = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * Choose random array element
 * @param {array} array
 * @return {string|number} random array element
 */
const getRandomArrayItem = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

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
const getRandomArrayElements = (array, min, max) => {
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
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


/**
 * Generate new array
 * @param {number} count number of elements
 * @param {function} func
 * @return {array}
 */
const generateArray = (count, func) => {
  return new Array(count).fill(``).map(func);
};

export {
  renderElement,
  createElement,
  getRandomNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRandomArrayElements,
  getRandomArrayItem,
  generateArray,
  RenderPosition,
  render,
};
