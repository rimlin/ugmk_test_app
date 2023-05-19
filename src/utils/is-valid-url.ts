export const isValidUrl = (url: string | undefined) => {
  if (!url) {
    return false;
  }

  try {
    new URL(url);
  } catch (e) {
    return false;
  }

  return true;
};
