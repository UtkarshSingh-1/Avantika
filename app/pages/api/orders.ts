import type { NextApiRequest, NextApiResponse } from "next";
import { orders } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(orders);
  }
  if (req.method === "POST") {
    const order = {
      id: String(Date.now()),
      table: req.body.table,
      items: req.body.items,
      total: req.body.total,
      dineIn: req.body.dineIn,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    orders.unshift(order);
    return res.status(200).json(order);
  }
  res.status(405).json({ error: "Method not allowed" });
}
