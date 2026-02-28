export let menuCategories = [
  {
    id: "starters",
    name: "Signature Starters",
    description: "Aromatic bites inspired by Avantika Food Mall heritage.",
  },
  {
    id: "mains",
    name: "Royal Mains",
    description: "Slow-cooked curries and tandoor classics.",
  },
  {
    id: "biryani",
    name: "Biryani & Rice",
    description: "Fragrant basmati with house masalas.",
  },
  {
    id: "breads",
    name: "Artisan Breads",
    description: "Tandoor-fresh breads to pair perfectly.",
  },
  {
    id: "desserts",
    name: "Dessert Atelier",
    description: "Silky sweets and modern Indian desserts.",
  },
  {
    id: "beverages",
    name: "Glass Bar",
    description: "Coolers, mocktails, and masala chai.",
  },
];

export let menuItems = [
  {
    id: "s1",
    name: "Smoked Paneer Tikka",
    description: "Charred cottage cheese, mint foam, citrus chaat.",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1761315412830-2f59480377b0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: true,
    popular: true,
    categoryId: "starters",
  },
  {
    id: "s2",
    name: "Tandoori Mushrooms",
    description: "Clay-oven mushrooms, saffron aioli, micro herbs.",
    price: 380,
    image:
      "https://images.unsplash.com/photo-1761315413508-1a416a41b9f5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: true,
    popular: true,
    categoryId: "starters",
  },
  {
    id: "m1",
    name: "Paneer Lababdar",
    description: "Creamy tomato gravy, kasoori methi, smoky notes.",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1761315414522-a732eb715497?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    popular: true,
    categoryId: "mains",
  },
  {
    id: "m2",
    name: "Malabar Vegetable Moilee",
    description: "Coconut curry, curry leaf oil, coastal spices.",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1761315414522-a732eb715497?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "mains",
  },
  {
    id: "m3",
    name: "Awadhi Jackfruit Nihari",
    description: "Slow-braised kathal, saffron gravy, fried onions.",
    price: 560,
    image:
      "https://images.unsplash.com/photo-1761315413508-1a416a41b9f5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: true,
    categoryId: "mains",
  },
  {
    id: "b1",
    name: "Royal Veg Dum Biryani",
    description: "Long-grain basmati, caramelized onion, raita.",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1666819691822-29a09f0992e5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: true,
    popular: true,
    categoryId: "biryani",
  },
  {
    id: "b2",
    name: "Saffron Jeera Rice",
    description: "Golden rice, toasted cumin, ghee finish.",
    price: 210,
    image:
      "https://images.unsplash.com/photo-1611019249277-9663e7d6eeb7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "biryani",
  },
  {
    id: "br1",
    name: "Garlic Butter Naan",
    description: "Hand-stretched naan, roasted garlic, herbs.",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1725483990150-61a9fbd746d1?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "breads",
  },
  {
    id: "br2",
    name: "Stuffed Kulcha",
    description: "Potato & cheese stuffing, tandoor baked.",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1725483990150-61a9fbd746d1?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "breads",
  },
  {
    id: "d1",
    name: "Rose Rabdi Sphere",
    description: "Milk reduction, pistachio crumble, rose mist.",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "desserts",
  },
  {
    id: "d2",
    name: "Cardamom Kulfi",
    description: "Silky kulfi, toasted almonds, saffron syrup.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "desserts",
  },
  {
    id: "bev1",
    name: "Sultanpur Sunset",
    description: "Blood orange, rose soda, basil.",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1654074518402-9e003b32b2ee?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "beverages",
  },
  {
    id: "bev2",
    name: "Masala Chai Cloud",
    description: "Slow-steeped Assam, cardamom foam.",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1617266983060-5b7c6fc19b30?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600",
    spicy: false,
    categoryId: "beverages",
  },
];

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
};

export type Order = {
  id: string;
  table: string | null;
  items: OrderItem[];
  total: number;
  dineIn: boolean;
  status: "pending" | "confirmed" | "preparing" | "served" | "completed";
  createdAt: string;
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
  createdAt: string;
};

export type Table = {
  id: string;
  occupied: boolean;
};

export let orders: Order[] = [];
export let reservations: Reservation[] = [];
export let tables: Table[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `T${i + 1}`,
  occupied: false,
}));
