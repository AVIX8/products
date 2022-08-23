import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import Review from "../models/Review";

const getUnverified = async (req: Request, res: Response) => {
  const reviews = await Review.find({ verified: false });
  return res.json(reviews);
};

const verify = async (req: Request, res: Response) => {
  const { reviewId } = req.body;

  const review = await Review.findByIdAndUpdate(reviewId, {
    $set: { verified: true },
  });
  if (!review) {
    return res.status(400).send({
      message: "Не удалось найти отзыв",
    });
  }

  Product.findByIdAndUpdate(review.product, {
    $push: { reviews: new mongoose.Types.ObjectId(review._id) },
  }).exec();
  return res.send(review);
};

const create = async (req: Request, res: Response) => {
  const { productId, username, text } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send({ message: "Не удалось найти товар" });
  }

  let review = new Review({
    username,
    text,
    product: product._id,
  });

  try {
    let item = await review.save();
    return res.json(item);
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Не удалось создать отзыв",
    });
  }
};

const del = async (req: Request, res: Response) => {
  const { reviewId } = req.body;

  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    return res.status(400).send({
      message: "Не удалось создать отзыв",
    });
  }

  return res.json(review);
};

export { create, getUnverified, verify, del };
