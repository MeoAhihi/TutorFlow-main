import { day2Index } from "../constants/date";

export const day2Date = (day) => {
  const d = new Date(),
    today = d.getDay(),
    year = d.getFullYear(),
    monthIndex = d.getMonth(),
    date = d.getDate();

  return new Date(year, monthIndex, date - today + day2Index[day]);
};

export function toTime(ms) {
  const s = Math.floor(ms / 1000) - 31;
  const seconds = ("0" + (s % 60)).slice(-2);
  const m = Math.floor((s - seconds) / 60);
  const minutes = ("0" + (m % 60)).slice(-2);
  const hours = Math.floor((m - minutes) / 60);
  return (
    (hours ? hours + "h" : "") + (minutes ? minutes + "m" : "") + seconds + "s"
  );
}
