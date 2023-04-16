import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/config/config";

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mongoRes = await fetch(`${API_URL}/api/v1/auth/logout`, {});
    const data = await mongoRes.json();

    if (mongoRes.ok) {
      res.setHeader(
        //HTTPのヘッダーのCookieの、tokenを空文字列にする
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true, //JavaScript が Document.cookie プロパティなどを介してこのクッキーにアクセスすることを禁止します。
          secure: process.env.NODE_ENV !== "development", // クッキーが、リクエストが SSL と HTTPS プロトコルを使用して行われた場合にのみサーバーに送信されることを示します
          expires: new Date(0),
          sameSite: "strict", //ブラウザーが同一サイトのリクエストに対してのみクッキーを送信することを意味します。
          path: "/",
        })
      );
      res.status(200).json({ message: "logout success" });
    } else {
      res.status(data.error.status).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
