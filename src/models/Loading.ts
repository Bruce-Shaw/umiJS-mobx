import { makeAutoObservable } from "mobx";

class Loading {
  loading = new Map();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setLoading(loading: boolean, key: string) {
    this.loading.set(key, loading);
  }

  clearLoading() {
    this.loading.clear();
  }
}

export default Loading;
