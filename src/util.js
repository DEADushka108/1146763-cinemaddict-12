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

export {renderElement, createElement};
