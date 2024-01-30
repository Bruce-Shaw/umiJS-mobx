import { request } from "umi";
import {
  checkAsyncSearch,
  getSearchTaskInstance,
  getSmallSearchTaskInstance,
} from "@/utils/searchTask";
import type { TPageResponse } from "@/typings/request";
import type { TData } from "@/typings/data";

export async function getDataList() {
  return request<TPageResponse<TData>>("/api/data/getDataList.json", {
    method: "GET",
  });
}

export const search = (data: any) => {
  const async = checkAsyncSearch(data);
  const taskFunc = async ? getSearchTaskInstance : getSmallSearchTaskInstance;
  const { analyseTye = "", uniqueType = "" } = data;
  const taskType = `${analyseTye}${uniqueType}`;
  return taskFunc().addTask(
    {
      excutor: request,
      param: {
        url: "/api/cachedProcessAnalyseTask.json",
        method: "post",
        data,
      },
      taskType,
    },
    // 轮询的参数方法
    (data) => ({
      url: "/api/getAnalyseTaskById.json",
      method: "post",
      data: { id: data?.id },
    })
  );
};
