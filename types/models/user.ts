export type UserId = string;
export type UserEmail = string;
export type UserUsername = string;
export type UserPassword = string;

export type UserAccessToken = string;
export type UserSession = {
  id: UserId;
  email: UserEmail;
  is_active: Boolean;
  is_superuser: Boolean;
  is_verified: Boolean;
};
