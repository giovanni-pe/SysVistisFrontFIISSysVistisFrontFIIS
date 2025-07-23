import { defineStore } from 'pinia';
import type { IAuthState, IUser } from '../Interfaces/IAuth';
import { login as loginApi, register as registerApi } from '../Services/authService';
import type { ILoginRequest, IRegisterRequest } from '../Interfaces/IAuth';
import { jwtDecode } from "jwt-decode";


export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    user: null,
    token: localStorage.getItem('token') || '',
    tokenExpiresAt: null,
    loading: false,
    error: null,
    registerSuccess: false,
    registerError: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(payload: ILoginRequest) {
      this.loading = true;
      this.error = null;
      try {
        const data = await loginApi(payload);
        this.token = data.token;
        localStorage.setItem('token', data.token);
        const decoded: any = jwtDecode(data.token);
        this.user = {
          id: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          roles: decoded.roles || [],
        };
        this.tokenExpiresAt = decoded.exp ? decoded.exp * 1000 : null;
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Login fallido';
        this.token = '';
        this.user = null;
        this.tokenExpiresAt = null;
      } finally {
        this.loading = false;
      }
    },
    async register(payload: IRegisterRequest) {
      this.loading = true;
      this.registerError = null;
      this.registerSuccess = false;
      try {
        const data = await registerApi(payload);
        if (data.success) {
          this.registerSuccess = true;
        } else {
          this.registerError = data.message || 'Registro fallido';
        }
      } catch (e: any) {
        this.registerError = e.response?.data?.message || 'Registro fallido';
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      this.tokenExpiresAt = null;
      localStorage.removeItem('token');
    },
    loadUserFromToken() {
      if (this.token) {
        try {
          const decoded: any = jwtDecode(this.token);
          this.user = {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            roles: decoded.roles || [],
          };
          this.tokenExpiresAt = decoded.exp ? decoded.exp * 1000 : null;
        } catch {
          this.logout();
        }
      }
    },
  }
});
