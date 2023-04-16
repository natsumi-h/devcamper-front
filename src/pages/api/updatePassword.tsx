import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function updatePasswordHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const mongoRes = await fetch(`${API_URL}/api/v1/auth/updatePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.token}`,
      },
      body: JSON.stringify({
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
      }),
    });
    const data = await mongoRes.json();

    if (mongoRes.ok) {
      res.status(200).json({ message: "update success" });
    } else {
      res.status(mongoRes.status).json({ message: data.error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
