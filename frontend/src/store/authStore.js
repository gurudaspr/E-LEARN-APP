import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: !!localStorage.getItem('token'),
  userRole: sessionStorage.getItem('userRole') || '', // Initialize userRole with stored value or empty string

  login: (token, userRole) => {
    localStorage.setItem('token', token);
    sessionStorage.setItem('userRole', userRole); // Store userRole in sessionStorage
    set({ isAuth: true, userRole });
  },
  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userRole'); // Remove userRole from sessionStorage on logout
    set({ isAuth: false, userRole: '' });
  },
  checkAuth: () => set({ isAuth: !!localStorage.getItem('token') })
}));

export default useAuthStore;
