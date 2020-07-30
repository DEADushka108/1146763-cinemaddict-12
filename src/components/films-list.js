export const createFilmsListTemplate = (title, modifier = false) => {
  return (
    `<section class="${ modifier ? `films-list--${ modifier }` : `films-list`}">
      <h2 class="films-list__title ${ modifier ? `` : `visually-hidden`}">${ title }</h2>
      <div class="films-list__container"></div>`
  );
};
