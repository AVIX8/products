import { Request, Response } from "express";
import Product from "../models/Product.js";

type params = {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
};

const get = async (req: Request, res: Response) => {
  let { skip, limit, sort }: params = req.body;

  const productsRequest = Product.aggregate([
    { $addFields: { reviewNumber: { $size: "$reviews" } } },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ]);

  const [total, products] = await Promise.all([
    Product.count(),
    Product.populate(await productsRequest, {
      path: "reviews",
    }),
  ]);

  if (!products) return res.status(404).send();
  return res.json({
    total,
    products,
  });
};

const create = async (req: Request, res: Response) => {
  const data = req.body;

  const candidate = await Product.findOne({ title: data.title });

  if (candidate) {
    return res
      .status(400)
      .json({ message: "Товар с таким названием уже существует" });
  }

  let prod = new Product({
    ...data,
  });

  try {
    let item = await prod.save();
    return res.json(item);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Не удалось создать товар",
    });
  }
};

export { get, create };
