import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: !!localStorage.getItem('token'),
  userRole: '', // Add userRole state

  login: (token, userRole) => { // Modify login to accept userRole
    localStorage.setItem('token', token);
    set({ isAuth: true, userRole: userRole }); // Set userRole when logging in
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isAuth: false, userRole: '' }); // Clear userRole when logging out
  },
  checkAuth: () => set({ isAuth: !!localStorage.getItem('token') })
}));

export default useAuthStore;