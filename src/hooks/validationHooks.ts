import { useEffect, useState } from "react";

export interface InputValidationSetup {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isDate?: boolean;
  isConfirmPassword?: boolean;
  confirmPassword?: string;
}

export interface CheckboxValidationSetup {
  isEmpty?: boolean;
  minCount?: number;
  maxCount?: number;
}

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const useInputValidation = (
  value: string,
  validations: InputValidationSetup,
): ValidationResult => {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(true);
    setError("");

    validationCycle: for (let validation in validations) {
      switch (validation) {
        case "isEmpty": {
          const { isEmpty } = validations;
          if (isEmpty && value.length === 0) {
            setIsValid(false);
            setError("Данное поле обязательно");
            break validationCycle;
          }
          break;
        }
        case "minLength": {
          const { minLength } = validations;
          if (minLength !== undefined && value.length < minLength) {
            setIsValid(false);
            setError(`Минимальная длина ${minLength} символов`);
            break validationCycle;
          }
          break;
        }
        case "maxLength": {
          const { maxLength } = validations;
          if (maxLength !== undefined && value.length > maxLength) {
            setIsValid(false);
            setError(`Максимальная длина ${maxLength} символов`);
            break validationCycle;
          }
          break;
        }
        case "isEmail": {
          const { isEmail } = validations;
          const reg =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (isEmail && !reg.test(value)) {
            setIsValid(false);
            setError("Введите корректный email");
            break validationCycle;
          }
          break;
        }
        case "isDate": {
          const { isDate, isEmpty } = validations;
          const reg =
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/;
          if (!(value === "" && !isEmpty) && isDate && !reg.test(value)) {
            setIsValid(false);
            setError("Введите корректную дату");
            break validationCycle;
          }
          break;
        }
        case "isConfirmPassword": {
          const { isConfirmPassword, confirmPassword } = validations;
          if (isConfirmPassword && value !== confirmPassword) {
            setIsValid(false);
            setError("Пароли не совпадают");
            break validationCycle;
          }
          break;
        }
      }
    }
  }, [value, validations.confirmPassword]);

  return { error, isValid };
};

export const useCheckboxValidation = (
  value: string[],
  validations: CheckboxValidationSetup,
): ValidationResult => {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setError("");
    setIsValid(true);

    validationCycle: for (let validation in validations) {
      switch (validation) {
        case "isEmpty": {
          const { isEmpty } = validations;
          if (isEmpty && value.length === 0) {
            setIsValid(false);
            setError("Данное поле обязательно");
            break validationCycle;
          }
          break;
        }
        case "minCount": {
          const { minCount } = validations;
          if (minCount !== undefined && value.length < minCount) {
            setIsValid(false);
            setError(`Выберите не менее ${minCount} пунктов`);
            break validationCycle;
          }
          break;
        }
        case "maxCount": {
          const { maxCount } = validations;
          if (maxCount !== undefined && value.length > maxCount) {
            setIsValid(false);
            setError(`Выберите не более ${maxCount} пунктов`);
            break validationCycle;
          }
          break;
        }
      }
    }
  }, [value]);

  return { error, isValid };
};
