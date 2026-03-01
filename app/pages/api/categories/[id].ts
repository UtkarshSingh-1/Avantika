import type { NextApiRequest, NextApiResponse } from "next";
import { menuCategories, menuItems } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const categoryId = String(req.query.id);
  const index = menuCategories.findIndex((c) => c.id === categoryId);
  if (index === -1) {
    return res.status(404).json({ error: "Category not found" });
  }

  if (req.method === "PATCH") {
    const { name, description } = req.body || {};
    const current = menuCategories[index];
    menuCategories[index] = {
      ...current,
      name: name ?? current.name,
      description: description ?? current.description,
    };
    return res.status(200).json(menuCategories[index]);
  }

  if (req.method === "DELETE") {
    const usedBy = menuItems.some((item) => item.categoryId === categoryId);
    if (usedBy) {
      return res.status(409).json({
        error: "Category has dishes. Move/remove those dishes before deleting.",
      });
    }
    const [removed] = menuCategories.splice(index, 1);
    return res.status(200).json(removed);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

