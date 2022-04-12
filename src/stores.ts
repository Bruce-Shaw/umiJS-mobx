import { createContext, useContext } from "react";
import Loading from "@/models/Loading";
import Data from "@/models/Data";

export class Stores {
  loading: Loading;

  data: Data;

  constructor() {
    this.loading = new Loading();
    this.data = new Data();
  }
}

export const stores = new Stores();
export const storesContext = createContext(stores);
export const useStores = () => useContext(storesContext);
