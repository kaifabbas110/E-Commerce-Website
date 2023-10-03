import React, { useEffect, useRef, useState } from "react";
import css from "../Everything-Page/Everything.module.css";
import { BagHeart } from "../../../img/logo/Socials";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, showCartOnHover } from "../../Cart/cartSlice";
import { formatPrice } from "../../Utils/formatPrice";
import { observe, useInView } from "react-intersection-observer";
import { current } from "@reduxjs/toolkit";

const Card = ({ id, e }) => {
  const { CartOnHover } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  // const ref = useRef();
  // const [isVisible, setIsVisible] = useState(false);
  // let callback = (entries, observer) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       setIsVisible(true);
  //     }
  //     // console.log(entry);
  //   });
  // };

  // useEffect(() => {
  // let observer = new IntersectionObserver(callback);
  // if (ref?.current) {
  //   observer.observe(ref.current);
  // }
  // return () => {
  //   // if (ref?.current) {
  //   //   observer.unobserve(ref.current);
  //   // }
  //   observer.disconnect();
  // };
  // }, []);
  const { ref: myRef, inView: visible } = useInView();
  // console.log(visible, myRef.current);

  const mouseEnter = (id) => {
    dispatch(showCartOnHover(id));
  };

  const mouseLeave = (id) => {
    dispatch(showCartOnHover(null));
  };
  return (
    <div className={`${css.wholecard}  `}>
      <div
        className={css.card}
        onMouseEnter={() => mouseEnter(id)}
        onMouseLeave={() => mouseLeave(id)}
        onTouchMove={() => mouseEnter(id)}
      >
        <Link to={`/Product/${id}`} key={id}>
          {visible ? (
            <img src={e.thumbnail} alt={e.title} className={css.hoverImg} />
          ) : (
            <img ref={myRef} />
          )}
        </Link>
        {CartOnHover ? (
          <button
            type="button"
            className={` ${CartOnHover === id ? css.addToCart : css.hidden}`}
            onClick={() => dispatch(addToCart({ id, ...e }))}
          >
            <BagHeart />
          </button>
        ) : (
          ""
        )}
      </div>
      <Link to={`/Product/${id}`} key={id}>
        <div className={css.card_info}>
          <h3>{e.title}</h3>
          <p>{e.category}</p>
          <span>{formatPrice(e.price)}</span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
