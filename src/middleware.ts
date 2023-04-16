// import cookie from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API_URL } from "./config/config";

// 認証が必要なルートには、このmiddlewareを追加する
export async function middleware(req: NextRequest, res: NextResponse) {
  console.log("I am middleware");

  // トークン（クッキーに保存されている）と一致するユーザーがいるか確認する
  const token = req.cookies.get("token")?.value;
  const user = await fetch(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userJson = await user.json();
  console.log(userJson);

  if (!userJson.success) {
    return new NextResponse(JSON.stringify({ message: userJson.error }), {
      status: 401,
    });
  }

  if (req.url.includes("/manage/bootcamp")) {
    if (userJson.data.role !== "publisher") {
      return new NextResponse(
        JSON.stringify({
          message: "Only publisher is authorized to access this page",
        }),
        {
          status: 401,
        }
      );
    }
  }
  if (req.url.includes("/manage/reviews")) {
    if (userJson.data.role !== "user") {
      return new NextResponse(
        JSON.stringify({
          message: "Only publisher is authorized to access this page",
        }),
        {
          status: 401,
        }
      );
    }
  }

  const response = NextResponse.next();
  // let cookie;
  response.cookies.set("id", userJson.data._id);
  response.cookies.set({
    name: "id",
    value: userJson.data._id,
    path: "/",
  });

  response.cookies.set("role", userJson.data.role);
  response.cookies.set({
    name: "role",
    value: userJson.data.role,
    path: "/",
  });

  const cookieId = response.cookies.get("id");
  const cookieRole = response.cookies.get("role");

  // console.log(cookieId);
  // console.log(cookieRole);

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/account/manage/:path*"],
};
