import type { NextApiRequest, NextApiResponse } from "next";
import { menuCategories, menuItems } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ categories: menuCategories, items: menuItems });
  }

  if (req.method === "POST") {
    const { name, description, price, image, spicy, popular, categoryId } =
      req.body || {};
    if (!name || !description || !categoryId || !Number.isFinite(Number(price))) {
      return res.status(400).json({ error: "Missing required dish fields" });
    }

    const item = {
      id: `m${Date.now()}`,
      name: String(name),
      description: String(description),
      price: Number(price),
      image: String(image || menuItems[0]?.image || ""),
      spicy: Boolean(spicy),
      popular: Boolean(popular),
      categoryId: String(categoryId),
    };
    menuItems.unshift(item);
    return res.status(201).json(item);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
