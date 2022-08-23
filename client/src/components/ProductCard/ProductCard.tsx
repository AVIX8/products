import React from 'react';
import styles from "./ProductCard.module.css";
import { NavLink } from "react-router-dom";

type Product = {
  _id: string,
  title: string,
  price: number,
  descr: string,
  data: string,
  reviews: Array<{
    _id: string,
    username: string,
    product: string,
    text: string
  }>,
}

const ProductCard = ({ product }: { product: Product }) =>
  <div className={styles.productCard}>
    <div className={styles.title}>{product.title}</div>
    <div className={styles.price}>{product.price}</div>
    <div className={styles.descr}>{product.descr}</div>

    <NavLink to={`/review?productId=${product._id}`} className={styles.reviewLink}>Добавить отзыв</NavLink>

    <div className={styles.feedback}>{product.reviews.map(review => <><span><b>{review.username}:</b></span> {review.text}<br></br></>)}</div>

  </div>;

export default ProductCard;
