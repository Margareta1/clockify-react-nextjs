const getTodaysDate = () => {
  const today = new Date();
  const day = String(today.getDate());
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};

const parseDateDDMMYYYY = (date: string): Date => {
  const [day, month, year] = date.split(".").map(Number);
  return new Date(year, month - 1, day);
};

const parseDateYYYYMMDD = (date: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatStopwatchTime = (duration: number) => {
  const seconds = String(Math.floor((duration / 1000) % 60)).padStart(2, "0");
  const minutes = String(Math.floor((duration / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const hours = String(Math.floor(duration / (1000 * 60 * 60))).padStart(
    2,
    "0"
  );
  return `${hours}:${minutes}:${seconds}`;
};
export {
  getTodaysDate,
  formatStopwatchTime,
  parseDateDDMMYYYY,
  parseDateYYYYMMDD,
};
