import type { NextApiRequest, NextApiResponse } from "next";
import { reservations } from "../_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "PATCH") {
    const { status } = req.body;
    const index = reservations.findIndex((reservation) => reservation.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    reservations[index] = { ...reservations[index], status };
    return res.status(200).json(reservations[index]);
  }
  res.status(405).json({ error: "Method not allowed" });
}
