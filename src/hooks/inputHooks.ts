import { useInputValidation, ValidationSetup } from "./validationHooks";
import { ChangeEvent, FocusEvent, useState } from "react";

interface InputHookReturnValue {
  value: string;
  isValid: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

interface CheckboxHookReturnValue {
  value: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (
  initialValue: string = "",
  validations: ValidationSetup = {},
): InputHookReturnValue => {
  const [value, setValue] = useState(initialValue);
  const [isWasFocused, setIsWasFocused] = useState(false);
  const { isValid, error } = useInputValidation(value, validations);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    setIsWasFocused(true);
  }

  return {
    value,
    isValid,
    error: isWasFocused ? error : "",
    onChange,
    onBlur,
  };
};

export const useCheckbox = (
  initialValue: string[] = [],
): CheckboxHookReturnValue => {
  const [value, setValues] = useState(initialValue);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue: string = event.target.value;
    const set: Set<string> = new Set(value);

    if (set.has(inputValue)) {
      set.delete(inputValue);
    } else {
      set.add(inputValue);
    }

    setValues(Array.from(set.values()));
  }

  return { value, onChange };
};
