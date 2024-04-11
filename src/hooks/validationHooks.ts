import { useEffect, useState } from "react";

export interface ValidationSetup {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isConfirmPassword?: boolean;
  confirmPassword?: string;
}

interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const useInputValidation = (
  value: string,
  validations: ValidationSetup,
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
