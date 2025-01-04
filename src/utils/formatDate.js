import { day2Index } from "../constants/date";

export const day2Date = (day) => {
  const d = new Date(),
    today = d.getDay(),
    year = d.getFullYear(),
    monthIndex = d.getMonth(),
    date = d.getDate();

  return new Date(year, monthIndex, date - today + day2Index[day]);
};
