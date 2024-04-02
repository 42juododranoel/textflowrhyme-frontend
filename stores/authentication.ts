import { defineStore } from "pinia";
import {
  type RegisterPayload,
  type LoginPayload,
} from "~/types/payloads/authentication";

export const useAuthentication = defineStore("authentication", {
  actions: {
    async sign_up(payload: RegisterPayload) {
      const api = useApi();

      // Do register
      await api.register(payload);

      // Call login
      const login_payload = {
        username: payload.email,
        password: payload.password,
      };
      await this.sign_in(login_payload);
    },
    async sign_in(payload: LoginPayload) {
      console.log("sign_in will be there", payload);
    },
    async sign_out() {
      console.log("sign_out will be there");
    },
  },
});
