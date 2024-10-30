import {
  type CheckboxHookReturnValue,
  type FileInputHookReturnValue,
  type InputHookReturnValue,
  type MaskedInputHookReturnValue,
} from "../hooks";

type InputHook =
  | InputHookReturnValue
  | MaskedInputHookReturnValue
  | CheckboxHookReturnValue
  | FileInputHookReturnValue
  | null;

export function checkFormDataValidation(...inputs: InputHook[]): boolean {
  let res = true;
  for (const input of inputs) {
    if (input && input.checkValidation) {
      res = input.checkValidation() && res;
    }
  }
  return res;
}
