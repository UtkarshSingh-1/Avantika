import type { NextApiRequest, NextApiResponse } from "next";
import type { Order } from "./_data";
import { orders } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(orders);
  }
  if (req.method === "POST") {
    const tableValue =
      req.body.table && String(req.body.table).trim().length > 0
        ? String(req.body.table)
        : null;
    const order: Order = {
      id: String(Date.now()),
      table: tableValue,
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
