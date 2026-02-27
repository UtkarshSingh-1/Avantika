import { create } from "zustand";

type UserState = {
  phone: string;
  otpVerified: boolean;
  isLoggedIn: boolean;
  setPhone: (phone: string) => void;
  verifyOtp: (code: string) => boolean;
  login: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  phone: "",
  otpVerified: false,
  isLoggedIn: false,
  setPhone: (phone) => set({ phone }),
  verifyOtp: (code) => {
    const ok = code === "1234";
    set({ otpVerified: ok, isLoggedIn: ok });
    return ok;
  },
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, otpVerified: false }),
}));
