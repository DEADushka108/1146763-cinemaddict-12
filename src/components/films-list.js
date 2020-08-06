export const createFilmsListTemplate = (title, modifier = false) => {

  /**
   * Get section's class
   * @return {String} class
   */
  const getSectionClass = () => modifier ? `films-list--${modifier}` : `films-list`;

  /**
   * Get hidden block's class
   * @return {String} class
   */
  const getHiddenClass = () => modifier ? `` : `visually-hidden`;

  return (
    `<section class="${getSectionClass()}">
      <h2 class="films-list__title ${getHiddenClass()}">${title}</h2>
      <div class="films-list__container"></div>`
  );
};
