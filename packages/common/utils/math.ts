export const createdAt = () => Date.now();
export const expireAt = (minutes: number) => Date.now() + minutes * 60000;
export const random4 = () =>
  (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
