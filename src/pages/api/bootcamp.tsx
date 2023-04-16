import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function bootcampHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mongoRes = await fetch(`${API_URL}/api/v1/bootcamps`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await mongoRes.json();

    // const data = await json.data;

    if (mongoRes.ok) {
      res.status(200).json({ data });
    } else {
      res.status(mongoRes.status).json({ message: data.error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
