import {
  type UserUsername,
  type UserPassword,
  type UserEmail,
} from "~/types/models/user";

export type LoginPayload = {
  username: UserUsername;
  password: UserPassword;
};

export type RegisterPayload = {
  email: UserEmail;
  password: UserPassword;
};
