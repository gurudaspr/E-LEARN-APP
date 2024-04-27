import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';

const updateStoreWithToken = (set) => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const { userId, userRole } = decodedToken;
    set({ isAuth: true, userId, userRole });
  }
};

const useAuthStore = create((set) => ({
  isAuth: !!localStorage.getItem('token'),
  userRole: null,
  userId: null,

  login: (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    const { userId, userRole } = decodedToken;
    set({ isAuth: true, userId, userRole });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ isAuth: false, userId: null, userRole: null });
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const { userId, userRole } = decodedToken;
      set({ isAuth: true, userId, userRole });
    } else {
      set({ isAuth: false, userId: null, userRole: null });
    }
  }
}));

updateStoreWithToken(useAuthStore.setState);

export default useAuthStore;
