import type { NextApiRequest, NextApiResponse } from "next";
import type { Order } from "./_data";
import { orders } from "./_data";

function normalizeOrderItems(input: unknown): Order["items"] {
  if (!Array.isArray(input)) return [];
  return input.map((raw: any, index) => {
    const menuItem = raw?.menuItem ?? {};
    const id = String(raw?.id ?? menuItem?.id ?? `item-${index + 1}`);
    const name = String(raw?.name ?? menuItem?.name ?? "Item");
    const price = Number(raw?.price ?? menuItem?.price ?? 0);
    const quantity = Math.max(1, Number(raw?.quantity ?? 1));
    const notes = raw?.notes ? String(raw.notes) : undefined;
    return { id, name, price, quantity, notes };
  });
}

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
      items: normalizeOrderItems(req.body.items),
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
