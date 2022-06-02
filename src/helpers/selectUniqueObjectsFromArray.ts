export const selectUniqueObjectsFromArray = <T>(
  array: Array<T>,
  key: string,
): Array<T> => {
  const uniqueProperties: Array<string> = [];
  const uniqueObjects: Array<T> = [];

  array.forEach((object) => {
    if (!uniqueProperties.includes(object[key])) {
      uniqueProperties.push(object[key]);
      uniqueObjects.push(object);
    }
  });

  return uniqueObjects;
};
