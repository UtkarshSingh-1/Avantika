import type { MenuCategory, MenuItem } from "../types";

export const menuCategories: MenuCategory[] = [
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

export const menuItems: MenuItem[] = [
  {
    id: "s1",
    name: "Smoked Paneer Tikka",
    description: "Charred cottage cheese, mint foam, citrus chaat.",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
    spicy: true,
    popular: true,
    categoryId: "starters",
  },
  {
    id: "s2",
    name: "Tandoori Prawns",
    description: "Clay-oven prawns, saffron aioli, micro herbs.",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1604909052460-f0d6f64b6f41?q=80&w=1200&auto=format&fit=crop",
    spicy: true,
    popular: true,
    categoryId: "starters",
  },
  {
    id: "m1",
    name: "Avantika Food Mall Butter Chicken",
    description: "Creamy tomato gravy, kasoori methi, smoky notes.",
    price: 540,
    image:
      "https://images.unsplash.com/photo-1604908177522-4327f9d77cf8?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    popular: true,
    categoryId: "mains",
  },
  {
    id: "m2",
    name: "Malabar Fish Moilee",
    description: "Coconut curry, curry leaf oil, coastal spices.",
    price: 620,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "mains",
  },
  {
    id: "m3",
    name: "Awadhi Lamb Nihari",
    description: "Slow-braised lamb, saffron gravy, fried onions.",
    price: 690,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1200&auto=format&fit=crop",
    spicy: true,
    categoryId: "mains",
  },
  {
    id: "b1",
    name: "Royal Dum Biryani",
    description: "Long-grain basmati, caramelized onion, raita.",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1595228702420-2b2ee552c8d3?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "biryani",
  },
  {
    id: "br1",
    name: "Garlic Butter Naan",
    description: "Hand-stretched naan, roasted garlic, herbs.",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1626509653291-64a3c1f67f2d?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "breads",
  },
  {
    id: "br2",
    name: "Stuffed Kulcha",
    description: "Potato & cheese stuffing, tandoor baked.",
    price: 140,
    image:
      "https://images.unsplash.com/photo-1574653853027-5382a3d23a03?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "breads",
  },
  {
    id: "d1",
    name: "Rose Rabdi Sphere",
    description: "Milk reduction, pistachio crumble, rose mist.",
    price: 260,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "desserts",
  },
  {
    id: "d2",
    name: "Cardamom Kulfi",
    description: "Silky kulfi, toasted almonds, saffron syrup.",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1505253216365-5d5ae9a778e2?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "desserts",
  },
  {
    id: "bev1",
    name: "Sultanpur Sunset",
    description: "Blood orange, rose soda, basil.",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "beverages",
  },
  {
    id: "bev2",
    name: "Masala Chai Cloud",
    description: "Slow-steeped Assam, cardamom foam.",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
    spicy: false,
    categoryId: "beverages",
  },
];
