import {
  type ChangePasswordApiRequestData,
  type ChangePasswordRequestData,
} from "@/shared/types";

export const mapChangePasswordRequest = (
  data: ChangePasswordRequestData,
): ChangePasswordApiRequestData => {
  const { token, newPassword, confirmNewPassword } = data;

  return {
    token,
    new_password: newPassword,
    confirm_new_password: confirmNewPassword,
  };
};
