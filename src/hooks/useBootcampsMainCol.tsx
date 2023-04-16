import { useAtom } from "jotai";
import { useFetcher } from "./useFetcher";
import { API_URL, limit } from "@/config/config";
import { bootcampsPage } from "@/state/bootcamps";

export const useBootcampsMainCol = (
  zipcode: string | number,
  miles: string | number,
  rating: string,
  budget: string
) => {
  const [page] = useAtom(bootcampsPage);

  const url =
    (zipcode === "" || miles === "") && rating === "" && budget === ""
      ? `${API_URL}/api/v1/bootcamps?limit=${limit}&page=${page}`
      : zipcode !== "" && miles !== ""
      ? `${API_URL}/api/v1/bootcamps/radius/${zipcode}/${miles}?limit=${limit}&page=${page}`
      : // ratingもbudgetもある場合
      rating !== "" && budget !== ""
      ? `${API_URL}/api/v1/bootcamps?averageCost[lte]=${budget}&averageRating[gte]=${rating}&limit=${limit}&page=${page}`
      : // ratingがあって、budgetが空文字列の場合
      rating !== "" && budget === ""
      ? `${API_URL}/api/v1/bootcamps?averageRating[gte]=${rating}&limit=${limit}&page=${page}`
      : // ratingが空文字列で、budgetがある場合
      rating === "" && budget !== ""
      ? `${API_URL}/api/v1/bootcamps?averageCost[lte]=${budget}&limit=${limit}&page=${page}`
      : `${API_URL}/api/v1/bootcamps?limit=${limit}&page=${page}`;
  const token = "";

  const { data, error, isLoading } = useFetcher(url, token);

  return { data, error, isLoading };
};
