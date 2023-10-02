function getAnchorDay(year: number) {
  const anchor = (((5 * (Math.floor(year / 100) % 4)) % 7) + 2) % 7;

  return anchor;
}
export default getAnchorDay;
