export const shortTitle = (title: string, length: number): string => {
  if (title.length > length) {
    const short = title.slice(0, length - 1);
    return `${short} ...`;
  }

  return title;
};
