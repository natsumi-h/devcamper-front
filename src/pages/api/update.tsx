import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function updateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const mongoRes = await fetch(`${API_URL}/api/v1/auth/updatedetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.token}`,
      },
      body: JSON.stringify({
        name: req.body.name,
        email: req.body.email,
      }),
    });
    const data = await mongoRes.json();

    if (mongoRes.ok) {
      res.status(200).json({ message: "update success" });
    } else {
      res.status(data.error.status).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
