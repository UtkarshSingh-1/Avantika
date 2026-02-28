import type { NextApiRequest, NextApiResponse } from "next";
import type { Reservation } from "./_data";
import { reservations } from "./_data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(reservations);
  }
  if (req.method === "POST") {
    const reservation: Reservation = {
      id: String(Date.now()),
      status: "pending",
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    reservations.unshift(reservation);
    return res.status(200).json(reservation);
  }
  res.status(405).json({ error: "Method not allowed" });
}
