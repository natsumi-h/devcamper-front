import { useAtom } from "jotai";
import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";
import { bootcampsPage } from "@/state/bootcamps";

type Data = {
  pagination: {
    prev: {
      page: number;
    };
    next: {
      page: number;
    };
  };
};

export const usePagination = (data: Data) => {
  const allBootcampDataUrl = `${API_URL}/api/v1/bootcamps`;
  const token = "";
  const { data: allBootcampsData } = useFetcher(allBootcampDataUrl, token);

  const [page, setPage] = useAtom(bootcampsPage);

  const onClickHandler = (pageNumber: number) => {
    setPage(pageNumber + 1);
  };

  const onClickPrev = () => {
    setPage(data.pagination.prev?.page);
  };

  const onClickNext = () => {
    setPage(data.pagination.next?.page);
  };

  return {
    onClickHandler,
    onClickPrev,
    onClickNext,
    allBootcampsData,
    page,
  };
};
