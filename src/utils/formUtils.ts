import {
  InputHookReturnValue,
  MaskedInputHookReturnValue,
  CheckboxHookReturnValue,
} from "../hooks/inputHooks";

type InputHook =
  | InputHookReturnValue
  | MaskedInputHookReturnValue
  | CheckboxHookReturnValue
  | null;

export function checkFormDataValidation(...inputs: InputHook[]): boolean {
  let res = true;
  for (let input of inputs) {
    if (input && input.checkValidation) {
      res = input.checkValidation() && res;
    }
  }
  return res;
}
