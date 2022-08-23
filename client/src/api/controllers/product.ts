import axiosClient from "../api";
import { AxiosResponse } from "axios";

type newProductDTO = {
  title: string;
  price: number;
  descr: string;
};

type paramsDTO = {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
};

const getProducts = (params: paramsDTO): Promise<AxiosResponse> => {
  return axiosClient.post("/products/get", params);
};

const createProduct = (product: newProductDTO): Promise<AxiosResponse> => {
  return axiosClient.post("/products/create", product);
};

export { createProduct, getProducts };
