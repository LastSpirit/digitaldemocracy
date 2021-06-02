export const endOfWords = (obj, string) => {
  if ([...obj.toString()].length >= 2) {
    if (
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '11' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '12' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] ===
        '13' ||
      [...obj.toString()][[...obj.toString()].length - 2] + [...obj.toString()][[...obj.toString()].length - 1] === '14'
    ) {
      return `${string}ов`;
    }
  }
  if ([...obj.toString()][[...obj.toString()].length - 1] === '1') {
    return `${string}`;
  }
  if (
    [...obj.toString()][[...obj.toString()].length - 1] === '2' ||
    [...obj.toString()][[...obj.toString()].length - 1] === '3' ||
    [...obj.toString()][[...obj.toString()].length - 1] === '4'
  ) {
    return `${string}а`;
  }
  return `${string}ов`;
};
