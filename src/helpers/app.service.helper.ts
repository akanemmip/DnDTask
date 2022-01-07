export const serializeQuery = function (query) {
  let stringQuery = '';
  Object.keys(query).forEach((key) => {
    stringQuery += `/?${key}=${query[key]}`;
  });

  return stringQuery;
};
export const createStringHelper = function (results) {
  return results
    .map((f) => f.opening_crawl)
    .join(' ')
    .replace(/(\r\n)/gm, ' ')
    .replace(/[.,]|'s/gm, '')
    .replace(/\s{2,}/g, ' ');
};
