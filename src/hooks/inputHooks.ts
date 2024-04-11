import { ChangeEvent, useState } from "react";

export const useInput = (
  initialValue: string = "",
): [string, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initialValue);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return [value, onChangeHandler];
};

export const useCheckbox = (
  initialValue: string[] = [],
): [string[], (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [values, setValues] = useState(initialValue);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    const set: Set<string> = new Set(values);

    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }

    setValues(Array.from(set.values()));
  }

  return [values, onChangeHandler];
};
