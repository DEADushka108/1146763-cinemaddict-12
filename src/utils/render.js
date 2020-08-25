export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

/**
  * Render element from template
  * @param {Element} container
  * @param {string} template
  * @param {string} position
  */
export const renderElement = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

/**
  * Create element from template
  * @param {string} template
  *
  * @return {Node}
  */
export const createElement = (template) => {
  let element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};


/**
  * Render element from component
  * @param {Element} container
  * @param {string} component
  * @param {string} position
  */
export const render = (container, component, position = RenderPosition.BEFOREEND) => {

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;

    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;

    default:
      throw new Error(`There are no this render position`);
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const removeChild = (childComponent) => {
  const parent = childComponent.getElement().parentElement;
  parent.removeChild(childComponent.getElement());
};

export const appendChild = (parent, childComponent) => {
  parent.appendChild(childComponent.getElement());
};

export const replace = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isExistElements = !!(newElement && oldElement && parentElement);

  if (isExistElements) {
    parentElement.replaceChild(newElement, oldElement);
  }
};
