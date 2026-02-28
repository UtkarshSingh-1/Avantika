import type { NextApiRequest, NextApiResponse } from "next";
import { orders } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "PATCH") {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "preparing", "served", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const index = orders.findIndex((order) => order.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    orders[index] = { ...orders[index], status };
    return res.status(200).json(orders[index]);
  }
  res.status(405).json({ error: "Method not allowed" });
}
