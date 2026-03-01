export type MenuCategory = {
  id: string;
  name: string;
  description: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  spicy: boolean;
  popular?: boolean;
  categoryId: string;
};

export type CartItem = {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
};

export type Order = {
  id: string;
  table: string | null;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "preparing" | "served" | "completed";
  createdAt: string;
  dineIn: boolean;
};

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: "pending" | "approved" | "cancelled";
  createdAt?: string;
};

export type Table = {
  id: string;
  occupied: boolean;
};
