import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { API_URL, NEXT_URL } from "@/config/config";

export const useManageBootcamp = () => {
  const router = useRouter();
  const url = `${API_URL}/api/v1/bootcamps`;
  const token =
    (typeof window !== "undefined" && window.localStorage.getItem("token")) ||
    "";

  const userId =
    (typeof window !== "undefined" && window.localStorage.getItem("userId")) ||
    "";

  const [data, setData] = useState<any>(null);

  const usersBootcamp = data?.data.data.filter(
    (bootcamp: any) => bootcamp.user === userId
  )[0];

  const onClickRemoveHandler = async () => {
    const result = window.confirm(
      "Are you sure you want to remove this Bootcamp?"
    );
    if (result) {
      try {
        const url = `${API_URL}/api/v1/bootcamps/${usersBootcamp.id}`;
        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (!res.ok) {
          toast(json.error, {
            type: "error",
          });
          return;
        }
        toast("Bootcamp removed", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // file: z.any(),
  const schema = z.object({
    file: z.any(),
  });

  type Form = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  // useCallBackで、fetchData関数をメモ化し、関数の引数に変更があった場合のみに実行するようにする
  const fetchData = useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/bootcamp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    console.log("fetchData");
    setData(json);
  }, []);

  // マウント時にfetchData関数を実行
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data: Form) => {
    // 新しいFormDataオブジェクトを作成
    const formData = new FormData();
    // フォームデータにファイルを追加（第一引数はサーバー側で受け取る名前、第二引数はファイル）
    formData.append("file", data.file[0]);

    const result = window.confirm(
      "Are you sure you want to remove this Bootcamp?"
    );
    if (result) {
      try {
        const apiRes = await fetch(
          `${API_URL}/api/v1/bootcamps/${usersBootcamp.id}/photo`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        const apiJson = await apiRes.json();
        if (!apiRes.ok) {
          toast.error(apiJson.error);
          return;
        }
        toast.success("Photo uploaded");
        await fetchData();
        // location.reload();
      } catch (error) {
        toast.error("Photo upload failed");
      }
    }
  };

  return {
    data,
    usersBootcamp,
    onClickRemoveHandler,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    watch
  };
};
