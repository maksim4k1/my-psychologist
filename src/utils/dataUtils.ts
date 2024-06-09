export const calculateAge = (date: string): number => {
  if (isNaN(Date.parse(date))) {
    return 0;
  }

  let now = new Date();
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let birthday = new Date(date);
  let birthdayInThisYear = new Date(
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
