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
      const api = useApi();
      const { getSession } = useAuth();
      const { setToken } = useAuthState();

      // Do login & update session
      const response = await api.login(payload);
      setToken(response.access_token);
      await getSession();
    },
    async sign_out() {
      const api = useApi();
      const { getSession } = useAuth();
      const { clearToken } = useAuthState();

      // Do logout & update session
      await api.logout();
      clearToken();
      await getSession();
    },
  },
});
