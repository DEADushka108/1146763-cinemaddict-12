/**
  * Генерирует элемент из шаблона
  * @param {element} container контейнер для генерации
  * @param {str} template шаблон для генерации
  * @param {str} position положение для вставки
  */
const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

/**
  * Создает элемент из шаблона
  * @param {str} template шаблон
  *
  * @return {Node} готовый элемент
  */
const createElement = (template) => {
  let element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

export {renderElement, createElement};
