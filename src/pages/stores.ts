import { createContext, useContext } from "react";
import Loading from "@/models/Loading";

export class Stores {
  loading: Loading;

  constructor() {
    this.loading = new Loading();
  }
}

export const stores = new Stores();
export const storesContext = createContext(stores);
export const useStores = () => useContext(storesContext);
