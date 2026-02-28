import type { NextApiRequest, NextApiResponse } from "next";
import { tables } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "PATCH") {
    const { occupied } = req.body;
    const index = tables.findIndex((table) => table.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    tables[index] = { ...tables[index], occupied: Boolean(occupied) };
    return res.status(200).json(tables[index]);
  }
  res.status(405).json({ error: "Method not allowed" });
}
