import { create } from "zustand";

type UserState = {
  email: string;
  phone: string;
  otpVerified: boolean;
  isLoggedIn: boolean;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setOtpVerified: (value: boolean) => void;
  login: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  email: "",
  phone: "",
  otpVerified: false,
  isLoggedIn: false,
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setOtpVerified: (value) => set({ otpVerified: value }),
  login: () => set({ isLoggedIn: true }),
  logout: () =>
    set({ isLoggedIn: false, otpVerified: false, email: "", phone: "" }),
}));
