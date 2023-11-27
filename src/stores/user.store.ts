import { LoginUser } from 'types';
import { create } from 'zustand';

interface UserStore {
    user: LoginUser | null;
    setUser: (user: LoginUser | null) => void;
    resetUser: () => void;
}

const useUserStore = create<UserStore>(set => ({
    user: null,
    setUser: (user: LoginUser | null) => {set((state) => ({ ...state, user }))},
    resetUser: () => set(state => ({ ...state, user: null }))
}));

export default useUserStore;
