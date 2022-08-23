import React, { useEffect, useState } from 'react';
import styles from "./Admin.module.css";

import * as database from "../../api/controllers/database"
import * as reviewApi from "../../api/controllers/review"

const Admin = () => {
  const [info, setInfo] = useState<string>()
  const [reviews, setReviews] = useState<any[]>([])

  const dropAllCollections = () => {
    database.dropAllCollections().then((res) => {
      setInfo(JSON.stringify(res.data))
    })
  }

  const createAllCollections = () => {
    database.createAllCollections().then((res) => {
      setInfo(JSON.stringify(res.data))
    })
  }
  const getAllCollections = () => {
    database.getAllCollections().then((res) => {
      setInfo(JSON.stringify(res.data))
    })
  }

  const updateUnverifiedReviews = () => {
    reviewApi.getUnverifiedReviews().then((res) => {
      setReviews(res.data)
    })
  }

  const verifyReview = (id: string) => {
    reviewApi.verifyReview(id).then(() => {
      setReviews(reviews?.filter(review => id !== review._id))
    })
  }

  const deleteReview = (id: string) => {
    reviewApi.deleteReview(id).then(() => {
      setReviews(reviews?.filter(review => id !== review._id))
    })
  }

  useEffect(() => {
    updateUnverifiedReviews()
  }, [])

  return <div className={styles.dashboard}>
    <div className={styles.database}>
      <button onClick={dropAllCollections}>Дропнуть все таблицы</button>
      <button onClick={createAllCollections}>Создать все таблицы</button>
      <button onClick={getAllCollections}>Получить все таблицы</button>
      <div>{info}</div>
    </div>
    <div className={styles.reviews}>
      <button className={styles.update} onClick={updateUnverifiedReviews}>Обновить немодерированные отзывы</button>
      {reviews?.length === 0 ? <p>Нет отзывов, требующих модерации</p> :
        <div className={styles.reviewList}>
          {reviews?.map(review => {

            return <div key={review._id} className={styles.review}>
              <div>
                <b>{review.username}:</b> {review.text}
              </div>
              <div>
                <span className={styles.reviewAction} onClick={() => verifyReview(review._id)}>Одобрить</span>
                <span className={styles.reviewAction} onClick={() => deleteReview(review._id)}>Удалить</span>
              </div>
            </div>
          })}
        </div>}
    </div>
  </div>
}

export default Admin;
