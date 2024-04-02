import { defineStore } from "pinia";
import { type RegisterPayload } from "~/types/payloads/authentication";

export const useAuthentication = defineStore("authentication", {
  actions: {
    async sign_up(payload: RegisterPayload) {
      const api = useApi();

      // Do register
      await api.register(payload);
    },
  },
});
