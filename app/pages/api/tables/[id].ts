import type { NextApiRequest, NextApiResponse } from "next";
import { tables } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const tableId = String(id);
  if (req.method === "PATCH") {
    const { occupied } = req.body;
    const index = tables.findIndex((table) => table.id === tableId);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    tables[index] = { ...tables[index], occupied: Boolean(occupied) };
    return res.status(200).json(tables[index]);
  }
  if (req.method === "DELETE") {
    const index = tables.findIndex((table) => table.id === tableId);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    if (tables.length <= 1) {
      return res.status(400).json({ error: "At least one table is required" });
    }
    const [removed] = tables.splice(index, 1);
    return res.status(200).json(removed);
  }
  res.status(405).json({ error: "Method not allowed" });
}
