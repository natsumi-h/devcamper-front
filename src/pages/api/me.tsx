import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function MeHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mongoRes = await fetch(`${API_URL}/api/v1/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });
    const data = await mongoRes.json();

    if (mongoRes.ok) {
      res.status(200).json({ role: data.data.role });
    } else {
      res.status(data.error.status).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
