import axiosClient from "../api";
import { AxiosResponse } from "axios";

const dropAllCollections = (): Promise<AxiosResponse> => {
  return axiosClient.post("/database/dropAllCollections");
};
const createAllCollections = (): Promise<AxiosResponse> => {
  return axiosClient.post("/database/createAllCollections");
};
const getAllCollections = (): Promise<AxiosResponse> => {
  return axiosClient.post("/database/getAllCollections");
};

export { dropAllCollections, createAllCollections, getAllCollections };
