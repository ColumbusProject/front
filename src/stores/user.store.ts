import { LoginUser, LoginUser2 } from 'types';
import { create } from 'zustand';

interface UserStore {
    user: LoginUser2 | null;
    setUser: (user: LoginUser2 | null) => void;
}

const useUserStore = create<UserStore>(set => ({
    user: null,
    setUser: (user: LoginUser2 | null) => {set((state) => ({ ...state, user }))},
}));

export default useUserStore;
