import { type UserAccessToken } from "~/types/models/user";

export type LoginResult = {
  access_token: UserAccessToken;
  token_type: string;
};
