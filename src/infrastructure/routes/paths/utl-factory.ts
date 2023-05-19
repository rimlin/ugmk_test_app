export const URL_FACTORY = {
  HOME: `/`,
  DETAIL: (factory: string, month: number) =>
    `${URL_FACTORY.HOME}details/${factory}/${month}`
};
