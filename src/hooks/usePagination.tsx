import { useAtom } from "jotai";
import { useBootcampsMainCol } from "./useBootcampsMainCol";
import { useFetcher } from "./useFetcher";
import { API_URL } from "@/config/config";
import { bootcampsAtom, bootcampsPage } from "@/state/bootcamps";

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

export const usePagination = (allData: Data) => {
  // const allBootcampDataUrl = `${API_URL}/api/v1/bootcamps`;
  // const token = "";
  // const { data: allBootcampsData } = useFetcher(allBootcampDataUrl, token);

  const [page, setPage] = useAtom(bootcampsPage);

  const onClickHandler = (pageNumber: number) => {
    setPage(pageNumber + 1);
  };

  const onClickPrev = () => {
    setPage(allData.pagination.prev?.page);
  };

  const onClickNext = () => {
    setPage(allData.pagination.next?.page);
  };

  return {
    onClickHandler,
    onClickPrev,
    onClickNext,
    page,
  };
};
