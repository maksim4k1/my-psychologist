import {
  useInputValidation,
  InputValidationSetup,
  useCheckboxValidation,
  CheckboxValidationSetup,
  FileInputValidationSetup,
  useFileInputValidation,
} from "./validationHooks";
import { ChangeEvent, FocusEvent, useState } from "react";

interface ValidationData {
  isValid: boolean;
  error: string;
  checkValidation: () => boolean;
}

export interface InputHookReturnValue extends ValidationData {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface MaskedInputHookReturnValue extends ValidationData {
  value: string;
  onAccept: (value: any, mask: any) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

export interface CheckboxHookReturnValue extends ValidationData {
  value: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FileInputHookReturnValue extends ValidationData {
  value: FileList | undefined;
  onChoose: (input: HTMLInputElement) => void;
}

function checkInputValidation(
  value: string | string[] | FileList,
  validations: InputValidationSetup | CheckboxValidationSetup,
  isValid: boolean,
  setIsDirty: (value: boolean) => void,
) {
  if (!validations.isEmpty && value.length === 0) {
    setIsDirty(false);
  } else {
    setIsDirty(true);
  }

  return isValid;
}

export const useInput = (
  initialValue: string = "",
  validations: InputValidationSetup = {},
): InputHookReturnValue => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const { isValid, error } = useInputValidation(value, validations);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsDirty(!(!validations.isEmpty && value === ""));
  };

  const checkValidation = () =>
    checkInputValidation(value, validations, isValid, setIsDirty);

  return {
    value,
    isValid: !isDirty && isValid,
    error: isDirty ? error : "",
    onChange,
    onBlur,
    checkValidation,
  };
};

export const useMaskedInput = (
  initialValue: string = "",
  validations: InputValidationSetup = {},
): MaskedInputHookReturnValue => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const { isValid, error } = useInputValidation(value, validations);

  const onAccept = (value: any, mask: any) => {
    setValue(value);
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsDirty(!(!validations.isEmpty && value === ""));
  };

  const checkValidation = () =>
    checkInputValidation(value, validations, isValid, setIsDirty);

  return {
    value,
    isValid: !isDirty && isValid,
    error: isDirty ? error : "",
    onAccept,
    onBlur,
    checkValidation,
  };
};

export const useCheckbox = (
  initialValue: string[] = [],
  validations: CheckboxValidationSetup = {},
): CheckboxHookReturnValue => {
  const [value, setValues] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const { isValid, error } = useCheckboxValidation(value, validations);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    const set: Set<string> = new Set(value);

    if (set.has(inputValue)) {
      set.delete(inputValue);
    } else {
      set.add(inputValue);
    }

    setValues(Array.from(set.values()));
  };

  const checkValidation = () =>
    checkInputValidation(value, validations, isValid, setIsDirty);

  return {
    value,
    isValid: !isDirty && isValid,
    error: isDirty ? error : "",
    onChange,
    checkValidation,
  };
};

export const useFileInput = (
  initialValue: FileList | undefined = undefined,
  validations: FileInputValidationSetup = {},
): FileInputHookReturnValue => {
  const [value, setValue] = useState<FileList | undefined>(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const { isValid, error } = useFileInputValidation(value, validations);

  const onChoose = (input: HTMLInputElement) => {
    if (input.files) {
      setValue(input.files);
      setIsDirty(true);
    }
  };

  const checkValidation = () => {
    if (value !== undefined) {
      return checkInputValidation(value, validations, isValid, setIsDirty);
    } else {
      setIsDirty(true);
      return !validations.isEmpty;
    }
  };

  return {
    value,
    isValid: !isDirty && isValid,
    error: isDirty ? error : "",
    onChoose,
    checkValidation,
  };
};
