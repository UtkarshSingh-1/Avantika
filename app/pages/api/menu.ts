import type { NextApiRequest, NextApiResponse } from "next";
import { menuCategories, menuItems } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ categories: menuCategories, items: menuItems });
}
