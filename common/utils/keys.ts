export function getDateKey() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  return `${month}_${date.getFullYear()}`;
}
