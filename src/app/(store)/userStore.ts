import { Session, User } from '@supabase/auth-helpers-nextjs';
import {create} from 'zustand';

interface UserStore {
    user: User | null;
    session: Session | null;
    setUser: (user: User | null) => void;
    setSession: (session: Session | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    session: null,
    setUser: (user) => set((state) => ({  user })),
    setSession: (session) => set((state) => ({ session })),
}));