import type { NextApiRequest, NextApiResponse } from "next";
import { tables } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(tables);
  }
  if (req.method === "POST") {
    const max = tables.reduce((acc, t) => {
      const n = Number(t.id.replace("T", ""));
      return Number.isFinite(n) ? Math.max(acc, n) : acc;
    }, 0);
    const nextId = `T${max + 1}`;
    const table = { id: nextId, occupied: false };
    tables.push(table);
    return res.status(201).json(table);
  }
  res.status(405).json({ error: "Method not allowed" });
}
