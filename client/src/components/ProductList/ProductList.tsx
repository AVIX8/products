import styles from "./ProductList.module.css";
import React, { useEffect, useState, FormEvent } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../api/controllers/product";
import classnames from "classnames";

type Product = {
  _id: string;
  title: string;
  price: number;
  descr: string;
  data: string;
  reviews: Array<{
    _id: string;
    username: string;
    product: string;
    text: string;
  }>;
};

const ProductList = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [skip, setSkip] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<Array<number>>([]);
  const [total, setTotal] = useState<number>(0);
  const [sort, setSort] = useState<Record<string, 1 | -1>>({ title: 1 })
  const limit = 5;

  useEffect(() => {
    console.log("useEffect");
    getProducts(
      { limit, skip, sort })
      .then(({ data }) => {
        setProducts(data.products);
        setTotal(data.total);
      });
  }, [skip, sort]);

  useEffect(() => {
    setSkip(page * limit);
  }, [page]);

  useEffect(() => {
    setPages(
      Array.apply(null, Array(Math.ceil(total / limit))).map((x, i) => i)
    );
  }, [total]);

  const pagination = (
    <div className={styles.pagination}>
      {pages.map((pageNumber) => (
        <span
          className={classnames({
            [styles.pageNumber]: true,
            [styles.activePageNumber]: pageNumber === page,
          })}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber + 1}
        </span>
      ))}
    </div>
  );

  const changeSort = (e: FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    const [field, dir] = e.currentTarget.value.split('-')
    setSort({ [field]: dir === 'up' ? 1 : -1 })
  }

  return (
    <>
      <div className={styles.sort}>сортировка по <select onChange={changeSort}>
        <option value="price-up">цене↑</option>
        <option value="price-down">цене↓</option>
        <option value="title-up" selected>названию↑</option>
        <option value="title-down">названию↓</option>
        <option value="reviewNumber-up">количеству отзывов↑</option>
        <option value="reviewNumber-down">количеству отзывов↓</option>
      </select>
      </div>
      {pagination}
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </div>
      {pagination}
    </>
  );
};
export default ProductList;
