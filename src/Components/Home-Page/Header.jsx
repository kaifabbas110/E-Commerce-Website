import React from "react";
import Navbar from "../Home-Page/Navbar";
import css from "../../CSS/Header.module.css";
import bg1 from "../../../img/banner/banner-01.jpg";
const Header = () => {
  return (
    <div className={css.bg} style={{ backgroundImage: `url("${bg1}")` }}>
      <div className={css.layOut}></div>
      <div className={css.bg_overlay}>
        <Navbar />
        <div className={css.leftSection}>
          <h1 className={css.primary_heading}>
            Raining Offers For Hot Summer!
          </h1>
          <h3 className={css.secondary_heading}>25% Off On All Products</h3>
          <div className={css.btn}>
            <button type="button" className={css.btn_shopNow}>
              shop now
            </button>
            <button
              type="button"
              className={css.btn_findMore}
              // style={{ border: "1px solid black" }}
            >
              find more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
