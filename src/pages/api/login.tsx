import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const mongoRes = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password,
      }),
    });
    const data = await mongoRes.json();

    if (mongoRes.ok) {
      // Set cookie (how many days? === 30)
      res.setHeader(
        "Set-Cookie",
        `token=${data.token}; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}; httponly`
      );

      res.status(200).json({ data });
    } else {
      res.status(mongoRes.status).json({ message: data.error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
