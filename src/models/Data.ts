import { makeAutoObservable, flow } from "mobx";
import { stores } from "@/stores";
import { getDataList } from "@/services/data";
import type { TPageResponse, TPageInfo } from "@/typings/request";
import type { TData } from "@/typings/data";

class Data {
  setLoading: (loading: boolean, key?: string) => void;

  dataList: TData[] = [];

  dataPageInfo: TPageInfo = { pageNow: 1, pageSize: 10, totalCount: 0 };

  constructor() {
    makeAutoObservable(
      this,
      {
        getDataList: flow.bound,
      },
      { autoBind: true }
    );
    this.setLoading = (loading, key = "data") => {
      stores.loading.setLoading(loading, key);
    };
  }

  *getDataList() {
    try {
      this.setLoading(true);
      const result: TPageResponse<TData> = yield getDataList();
      setTimeout(() => {
        const { data } = result;
        this.dataList = data.pages || [];
        this.dataPageInfo = { ...data, pages: undefined };
        this.setLoading(false);
      }, 1000);
    } catch (e) {
      console.log(e);
      this.setLoading(false);
    }
  }
}

export default Data;
