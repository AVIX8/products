import axiosClient from "../api";
import { AxiosResponse } from "axios";

type ReviewDTO = {
  productId: string;
  username: string;
  text?: string;
};

const createReview = (newReview: ReviewDTO): Promise<AxiosResponse> => {
  return axiosClient.post("/review/create", newReview);
};
const deleteReview = (reviewId: string): Promise<AxiosResponse> => {
  return axiosClient.post("/review/delete", { reviewId });
};
const getUnverifiedReviews = (): Promise<AxiosResponse> => {
  return axiosClient.post("/review/getUnverified");
};
const verifyReview = (reviewId: string): Promise<AxiosResponse> => {
  return axiosClient.post("/review/verify", { reviewId });
};

export { createReview, deleteReview, getUnverifiedReviews, verifyReview };
