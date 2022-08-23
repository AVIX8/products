import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import classnames from "classnames";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  classnames({
    [styles.link]: true,
    [styles.active]: isActive,
  });

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <NavLink to="/products" className={linkClasses}>
        Товары
      </NavLink>

      <NavLink to="/addProduct" className={linkClasses}>
        Добавить товар
      </NavLink>

      <NavLink to="/admin" className={linkClasses}>
        Админка
      </NavLink>
    </div>
  );
}
