import React, { useEffect, useState } from "react";
import css from "../../CSS/Section1.module.css";
import { cardsData, logoData } from "../../Data/data";
import { ArrowLeft, ArrowRight } from "../../Data/Icons";

const Section1 = () => {
  return (
    <div className={css.section1}>
      <div className={css.logoSlider}>
        <button
          type="button"
          // onClick={(e) => handlePrevClick(e)}
          className={css.logoSliderBtn}
        >
          <ArrowLeft />
        </button>
        <div className={css.logos}>
          {logoData.map((e, index) => (
            <img
              key={e.id}
              src={e.logo}
              alt={e.logo}
              className={css.logo}
              // style={{
              //   transform: `translateX(${index * 100}%)`,
              //   transition: "transform 1s ease",
              // }}
            />
          ))}
        </div>
        <button
          type="button"
          // onClick={handleNextClick}
          className={css.logoSliderBtn}
        >
          <ArrowRight />
        </button>
      </div>

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
              {/* <img src={e.img} alt="card" /> */}
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
