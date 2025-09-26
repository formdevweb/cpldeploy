import { reactive } from 'vue';

export const store = reactive({
  token: localStorage.getItem('token') || null,
  isAdmin: localStorage.getItem('isAdmin') === 'true',

  setToken(newToken) {
    this.token = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
      this.setIsAdmin(true);
    } else {
      localStorage.removeItem('token');
      this.setIsAdmin(false);
    }
  },

  setIsAdmin(status) {
    this.isAdmin = status;
    localStorage.setItem('isAdmin', String(status));
  },

  clearAuth() {
    this.setToken(null);
    this.setIsAdmin(false);
  },
});