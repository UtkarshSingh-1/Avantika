import type { NextApiRequest, NextApiResponse } from "next";
import { menuItems } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const itemId = String(id);
  const index = menuItems.findIndex((item) => item.id === itemId);
  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }

  if (req.method === "PATCH") {
    const current = menuItems[index];
    const { name, description, price, image, spicy, popular, categoryId } =
      req.body || {};
    menuItems[index] = {
      ...current,
      name: name ?? current.name,
      description: description ?? current.description,
      price: Number.isFinite(Number(price)) ? Number(price) : current.price,
      image: image ?? current.image,
      spicy: typeof spicy === "boolean" ? spicy : current.spicy,
      popular: typeof popular === "boolean" ? popular : current.popular,
      categoryId: categoryId ?? current.categoryId,
    };
    return res.status(200).json(menuItems[index]);
  }

  if (req.method === "DELETE") {
    const [removed] = menuItems.splice(index, 1);
    return res.status(200).json(removed);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

