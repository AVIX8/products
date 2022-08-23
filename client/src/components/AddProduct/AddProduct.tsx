import { createProduct } from '../../api/controllers/product';
import React, { useState, MouseEvent, ChangeEvent } from 'react';
import styles from "./AddProduct.module.css";

const AddProduct = () => {
    const [title,setTitle] = useState<string>('')
    const [price,setPrice] = useState<number>()
    const [descr,setDescr] = useState<string>('')
    const [info,setInfo] = useState<string>()

    const addProduct = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (title && price && descr) {
            createProduct({title, price, descr}).then(() => {
                setInfo('Товар был успешно создан')
            }).catch((err) => {
                setInfo(err.response.data.message)
            })
        } else {
            setInfo('Для создания товара необходимо заполнить все поля')
        }
    }

    const priceChangeHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setPrice(Number(e.target.value.replace(/\D/g, '')))
    }

    return <div className={styles.productForm}>
        <input type="text" placeholder='Название' value={title} onChange={e=>setTitle(e.target.value)}></input>
        <input type="text" placeholder='Цена' value={price} onChange={priceChangeHandler}></input>
        <textarea placeholder='Описание' value={descr} onChange={e=>setDescr(e.target.value)}></textarea>
        <div>{info}</div>
        <button onClick={addProduct}>Создать товар</button>
    </div>;

}
export default AddProduct;
