import type { NextApiRequest, NextApiResponse } from "next";
import { menuCategories } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(menuCategories);
  }

  if (req.method === "POST") {
    const { name, description } = req.body || {};
    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    const slugBase = String(name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const id = `${slugBase || "category"}-${Date.now()}`;
    const category = {
      id,
      name: String(name),
      description: String(description),
    };
    menuCategories.push(category);
    return res.status(201).json(category);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

