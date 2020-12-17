const normalize = (val, max, min) => {
  if (max - min === 0) return 1;
  return ((val - min) / (max - min)) * 10;
};

const convertTime = (t) => {
  const z = t.getTimezoneOffset() * 60 * 1000;
  const tLocal = t - z;
  const dateLocal = new Date(tLocal);
  const iso = dateLocal.toISOString();
  return iso.slice(0, 19);
};

export { normalize, convertTime };
