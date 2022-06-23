import { useState } from "react";
import { getDataList } from "@/services/data";
import type { TPageResponse, TPageInfo } from "@/typings/request";
import type { TData } from "@/typings/data";

export default () => {
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<TData[]>([]);
  const [dataPageInfo, setDataPageInfo] = useState<TPageInfo>({
    pageNow: 1,
    pageSize: 10,
    totalCount: 0,
  });

  const getHooksDataList = async () => {
    setDataLoading(true);
    const result: TPageResponse<TData> = await getDataList();
    setDataLoading(false);
    const { pages = [] } = result.data;
    setDataList(pages);
    setDataPageInfo({ ...result.data, pages: undefined });
  };
  return {
    dataList,
    dataPageInfo,
    dataLoading,
    getHooksDataList,
  };
};
