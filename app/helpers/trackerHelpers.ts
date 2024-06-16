const getTodaysDate = () => {
  const today = new Date();
  const day = String(today.getDate());
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};


const formatStopwatchTime = (duration: number) => {
  const milliseconds = String(duration % 1000).padStart(3, '0');
  const seconds = String(Math.floor((duration / 1000) % 60)).padStart(2, '0');
  const minutes = String(Math.floor((duration / (1000 * 60)) % 60)).padStart(2, '0');
  const hours = String(Math.floor(duration / (1000 * 60 * 60))).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};
export { getTodaysDate, formatStopwatchTime };