export interface ChangePasswordRequestData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordApiRequestData {
  token: string;
  new_password: string;
  confirm_new_password: string;
}
