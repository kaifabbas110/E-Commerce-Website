import React from "react";
import css from "../../CSS/SpecialEdition.module.css";
import { weOffer } from "../../Data/data";
import bg2 from "../../../img/banner/banner-03.jpg";
const SpecialEdition = () => {
  return (
    // <>
    <section className={css.section}>
      <div
        className={css.SpecialEdition}
        style={{ backgroundImage: `url("${bg2}")` }}
      >
        <div className={css.layOut}></div>
        <div className={css.info}>
          <h3>Limited Time Offer</h3>
          <h1>Special Edition</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <h2>Buy This T-shirt At 20% Discount, Use Code OFF20</h2>
          <button type="button">shop now</button>
        </div>
      </div>
      <div className={css.weOffer}>
        {weOffer.map((e) => {
          return (
            <div className={css.weOffer_info} key={e.id}>
              <img src={e.img} alt={e.img} />
              <h1>{e.name}</h1>
              <p>{e.description}</p>
            </div>
          );
        })}
      </div>
    </section>
    // </>
  );
};

export default SpecialEdition;
