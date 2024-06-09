import { use, useEffect, useState } from "react";

export interface InputValidationSetup {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isDate?: boolean;
  isPhoneNumber?: boolean;
  isConfirmPassword?: boolean;
  confirmPassword?: string;
}

export interface CheckboxValidationSetup {
  isEmpty?: boolean;
  minCount?: number;
  maxCount?: number;
}

export interface FileInputValidationSetup {
  isEmpty?: boolean;
  minCount?: number;
  maxCount?: number;
  minSize?: number; // mbyte
  maxSize?: number; // mbyte
  formats?: string[];
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
        case "isPhoneNumber": {
          const { isPhoneNumber, isEmpty } = validations;
          const reg = /^\+[0-9]\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
          if (
            !(value === "" && !isEmpty) &&
            isPhoneNumber &&
            !reg.test(value)
          ) {
            setIsValid(false);
            setError("Введите корректный номер телефона");
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
  }, [value, validations]);

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
  }, [value, validations]);

  return { error, isValid };
};

export const useFileInputValidation = (
  value: FileList | undefined,
  validations: FileInputValidationSetup,
): ValidationResult => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsValid(true);
    setError("");

    validationCycle: for (let validation in validations) {
      switch (validation) {
        case "isEmpty": {
          const { isEmpty } = validations;
          if (isEmpty && (!value || value?.length === 0)) {
            setIsValid(false);
            setError("Необходимо выбрать файл");
            break validationCycle;
          }
          break;
        }
        case "minCount": {
          const { minCount } = validations;
          if (minCount && value && value?.length < minCount) {
            setIsValid(false);
            setError(`Выберите не менее ${minCount} файлов`);
            break validationCycle;
          }
          break;
        }
        case "maxCount": {
          const { maxCount } = validations;
          if (maxCount && value && value?.length > maxCount) {
            setIsValid(false);
            setError(`Выберите не более ${maxCount} файлов`);
            break validationCycle;
          }
          break;
        }
        case "minSize": {
          const { minSize } = validations;

          if (value && minSize) {
            for (let i = 0; i < value.length; i++) {
              let file = value[i];
              if (file.size / (1024 * 1024) < minSize) {
                setIsValid(false);
                setError(`Минимальный размер файла: ${minSize} Мб`);
                break validationCycle;
              }
            }
          }
          break;
        }
        case "maxSize": {
          const { maxSize } = validations;
          if (value && maxSize) {
            for (let i = 0; i < value.length; i++) {
              let file = value[i];
              if (file.size / (1024 * 1024) > maxSize) {
                setIsValid(false);
                setError(`Максимальный размер файла: ${maxSize} Мб`);
                break validationCycle;
              }
            }
          }
          break;
        }
        case "formats": {
          const { formats } = validations;
          if (value && formats) {
            for (let i = 0; i < value.length; i++) {
              let file = value[i];
              const fileFormat = file.name.split(".").at(-1);
              if (!fileFormat || !formats.includes(fileFormat)) {
                setIsValid(false);
                setError(`Недопустимый формат файла: ${fileFormat}`);
                break validationCycle;
              }
            }
          }
          break;
        }
      }
    }
  }, [value, validations]);

  return {
    isValid,
    error,
  };
};
