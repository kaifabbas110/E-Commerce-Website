import React from "react";
import css from "../../CSS/Section1.module.css";
import { cardsData } from "../../Data/data";

const Section1 = () => {
  return (
    <div className={css.section1}>
      <div className={css.gridCard}>
        {cardsData.map((e, i) => {
          return (
            <div
              key={e.id}
              className={css.cards}
              style={{
                backgroundImage: `url("${e.img}")`,
              }}
            >
              <div className={css.layOut}></div>
              <div className={css.cards_info}>
                <h1>{e.h1}</h1>
                <p>{e.para}</p>
                <button type="button">{e.button}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section1;
