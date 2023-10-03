import React, { useEffect, useState } from "react";
import css from "../../CSS/FeatureProduct.module.css";
import { BagHeart } from "../../../img/logo/Socials";
import {
  addToCart,
  getFeatureItems,
  showCartOnHover,
} from "../../Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/formatPrice";
import { useInView } from "react-intersection-observer";

const FeatureProduct = () => {
  const { CartOnHover, FeatureItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const mouseEnter = (id) => {
    dispatch(showCartOnHover(id));
  };
  const mouseLeave = (id) => {
    dispatch(showCartOnHover(null));
  };

  const [animationPlayed, setAnimationPlayed] = useState(false);
  const { ref: myRef, inView: visible } = useInView();

  useEffect(() => {
    if (visible && !animationPlayed) {
      setAnimationPlayed(true);
    }
  }, [visible, animationPlayed]);

  useEffect(() => {
    dispatch(getFeatureItems());
  }, []);
  return (
    <section className={css.featureProductSection}>
      <h1 ref={myRef} className={`${animationPlayed && css.scrollTrigger}`}>
        {visible && "Featured Products"}
      </h1>
      <div className={css.featureProductGrid}>
        {FeatureItems.slice(3, 11).map(({ id, ...e }) => {
          return (
            <div className={css.wholeFPcard} key={id}>
              <div
                className={css.FPcard}
                onMouseEnter={() => mouseEnter(id)}
                onMouseLeave={() => mouseLeave(id)}
                onTouchMove={() => mouseEnter(id)}
              >
                <Link to={`/Product/${id}`}>
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className={css.hoverImg}
                  />
                </Link>
                {CartOnHover ? (
                  <button
                    type="button"
                    className={` ${
                      CartOnHover === id ? css.addToCart : css.hidden
                    }`}
                    onClick={() =>
                      dispatch(
                        addToCart({ id, ...e })
                        // totalAmount(e.price)
                      )
                    }
                  >
                    <BagHeart />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <Link to={`/Product/${id}`}>
                <div className={css.FPcard_info}>
                  <h3>{e.title}</h3>
                  <p>{e.category}</p>
                  <span>{formatPrice(e.price)}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureProduct;
