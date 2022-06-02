// добавляет альфацифрам 200 к коду, так что их вес будет больше чем всех спецсимволов
const charWeight = (char: string): number => {
  const wordRegex = /[\wа-яА-Я]/;
  if (wordRegex.test(char[0])) return char.charCodeAt(0) + 200;
  return char.charCodeAt(0);
};

// cравнивает строки по весу символов
export const compareStrings = (
  firstString: string,
  secondString: string,
): number => {
  for (
    let i = 0;
    i < Math.min(firstString.length, secondString.length);
    i += 1
  ) {
    const diff = charWeight(firstString[i]) - charWeight(secondString[i]);
    if (diff !== 0) return diff;
  }
  return 0;
};

export const compareDates = (
  firstDate: string | null,
  secondDate: string | null,
) => {
  if (firstDate === null) {
    return -1;
  }
  if (secondDate === null) {
    return 1;
  }
  if (firstDate.toLowerCase() < secondDate.toLowerCase()) {
    return -1;
  }
  if (firstDate.toLowerCase() === secondDate.toLowerCase()) {
    return 0;
  }
  return 1;
};
