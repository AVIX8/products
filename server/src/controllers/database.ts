import { Request, Response } from "express";
import connection from "../database.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

const getCollectionNames = async () =>
  (await connection.db.collections()).map((c) => c.collectionName);

const dropAllCollections = async (req: Request, res: Response) => {
  const collectionsBefore = await getCollectionNames();
  const status = await connection.db.dropDatabase();
  return res.json({
    collectionsBefore,
    status,
    collectionsAfter: await getCollectionNames(),
  });
};

const createAllCollections = async (req: Request, res: Response) => {
  const collectionsBefore = await getCollectionNames();
  await Product.createCollection();
  await Review.createCollection();
  return res.json({
    collectionsBefore: collectionsBefore,
    collectionsAfter: await getCollectionNames(),
  });
};

const getAllCollections = async (req: Request, res: Response) => {
  return res.json({
    collections: await getCollectionNames(),
  });
};

export { dropAllCollections, createAllCollections, getAllCollections };
