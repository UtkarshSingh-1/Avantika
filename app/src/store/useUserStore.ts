import { create } from "zustand";

type UserState = {
  email: string;
  otpVerified: boolean;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  setOtpVerified: (value: boolean) => void;
  login: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  email: "",
  otpVerified: false,
  isLoggedIn: false,
  setEmail: (email) => set({ email }),
  setOtpVerified: (value) => set({ otpVerified: value }),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false, otpVerified: false, email: "" }),
}));
