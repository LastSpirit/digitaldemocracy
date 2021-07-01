export const badgeColorChanger = (percent) => {
  if (!!percent && percent >= 0 && percent <= 20) {
    return '#BE3B21';
  }
  if (!!percent && percent > 20 && percent <= 40) {
    return '#C9988E';
  }
  if (!!percent && percent > 40 && percent <= 60) {
    return '#C4C4C4';
  }
  if (!!percent && percent > 60 && percent <= 80) {
    return '#749C7E';
  }
  if (!!percent && percent > 80 && percent <= 100) {
    return '#248232';
  }
  return '#C4C4C4';
};

export default badgeColorChanger;
