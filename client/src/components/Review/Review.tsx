import { createReview } from '../../api/controllers/review';
import React, { useState, MouseEvent } from 'react';
import styles from "./Review.module.css";
import { useSearchParams } from 'react-router-dom';

const AddReview = () => {
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [info, setInfo] = useState<string>('')

  const addReview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const productId = searchParams.get('productId');

    if (productId && username && text) {
      createReview({ productId, username, text }).then(() => {
        setInfo('Отзыв был успешно отправлен')
      }).catch((err) => {
        setInfo(err.response.data.message)
      })
    } else {
      setInfo('Для отправки отзыва необходимо заполнить все поля')
    }
  }

  return <div className={styles.reviewForm}>
    <input type="text" placeholder='Имя' value={username} onChange={e => setUsername(e.target.value)}></input>
    <textarea placeholder='Отзыв' value={text} onChange={e => setText(e.target.value)}></textarea>
    <div>{info}</div>
    <button onClick={addReview}>Добавить отзыв</button>
  </div>;
}

export default AddReview;
