import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Star = ({ rating }) => {
  //   let number = i + 0.5
  //   e.rating >  i + 1?
  //   <BsStarFill key={i} className={css.svg} />
  //   }
  console.log(rating);
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <BsStarFill />
      ))}
    </>
  );
};

export default Star;
