export const getItem = (item: string) => localStorage.getItem(item);

export const setItem = (item: string, value: any) => {
  if (typeof value !== 'string') {
    localStorage.setItem(item, JSON.stringify(value));
  } else {
    localStorage.setItem(item, value);
  }
};

export const removeItem = (item: string) => localStorage.removeItem(item);
