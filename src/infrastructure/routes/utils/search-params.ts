type Item = string | undefined | null;

const isValidValue = (value: unknown): value is string | number =>
  value !== undefined && value !== null && value !== '';

export const addSearchParams = (
  data: Record<string, Item | Array<Item>>,
  searchParams: URLSearchParams
) => {
  Object.keys(data).forEach(key => {
    if (isValidValue(data[key])) {
      if (Array.isArray(data[key])) {
        (data[key] as Array<Item>).forEach(value => {
          if (isValidValue(value)) {
            searchParams.append(key, value);
          }
        });
      } else {
        searchParams.set(key, data[key] as string);
      }
    }
  });
};
