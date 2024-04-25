import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: !!localStorage.getItem('token'),
  userRole: sessionStorage.getItem('userRole') || '',
  userId: sessionStorage.getItem('userId') || '', 

  login: (token, userRole, userId) => {
    localStorage.setItem('token', token);
    sessionStorage.setItem('userRole', userRole); 
    set({ isAuth: true, userRole, userId });
  },
  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('userRole'); 
    set({ isAuth: false, userRole: '', userId: '' });
  },
  checkAuth: () => set({ isAuth: !!localStorage.getItem('token') })
}));

export default useAuthStore;