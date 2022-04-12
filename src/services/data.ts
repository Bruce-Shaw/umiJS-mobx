import { request } from "umi";
import type { TPageResponse } from "@/typings/request";
import type { TData } from "@/typings/data";

export async function getDataList() {
  return request<TPageResponse<TData>>("/api/data/getDataList.json", {
    method: "GET",
  });
}
