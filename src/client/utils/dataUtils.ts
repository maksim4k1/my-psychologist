const monthes = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноябра",
  "декабря",
];

export const calculateAge = (date: string): number => {
  if (isNaN(Date.parse(date))) {
    return 0;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthday = new Date(date);
  const birthdayInThisYear = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );

  let age = today.getFullYear() - birthday.getFullYear();

  if (today < birthdayInThisYear) {
    age -= 1;
  }

  return age;
};

export const mapAgeToText = (age: number): string => {
  const ageStr = String(age);
  if (age < 1 || age % 1 !== 0) return ageStr;
  const lastNumber: number = Number(ageStr.at(-1));

  const l = "лет";
  const g = "год";
  const ga = "года";

  if (age === 11 || age === 12 || age == 13 || age === 14)
    return ageStr + " " + l;
  else if (lastNumber === 1) return ageStr + " " + g;
  else if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4)
    return ageStr + " " + ga;

  return ageStr + " " + l;
};

export const mapDatetimeToText = (datetime: string): string => {
  const offset = -(new Date().getTimezoneOffset() / 60);
  const date = new Date(datetime);

  let hours = String(date.getHours() + offset);
  hours = hours.length === 1 ? "0" + hours : hours;

  let minutes = String(date.getMinutes());
  minutes = minutes.length === 1 ? "0" + minutes : minutes;

  const result = `${date.getDate()} ${
    monthes[date.getMonth()]
  } ${date.getFullYear()}, ${hours}:${minutes}`;
  return result;
};
