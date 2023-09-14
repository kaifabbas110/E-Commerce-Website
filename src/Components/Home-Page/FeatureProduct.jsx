import React, { useEffect } from "react";
import css from "../../CSS/FeatureProduct.module.css";
import { BagHeart } from "../../../img/logo/Socials";
import {
  addToCart,
  getFeatureItems,
  showCartOnHover,
} from "../../Cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const FeatureProduct = () => {
  const { CartOnHover, FeatureItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const mouseEnter = (id) => {
    dispatch(showCartOnHover(id));
  };
  const mouseLeave = (id) => {
    dispatch(showCartOnHover(null));
  };
  useEffect(() => {
    dispatch(getFeatureItems());
  }, []);
  return (
    <section className={css.featureProductSection}>
      <h1>Featured Products</h1>
      <div className={css.featureProductGrid}>
        {FeatureItems.slice(3, 11).map(({ id, ...e }) => {
          return (
            <Link to={`/Product/${id}`} key={id}>
              <div className={css.wholeFPcard}>
                <div
                  className={css.FPcard}
                  onMouseEnter={() => mouseEnter(id)}
                  onMouseLeave={() => mouseLeave(id)}
                  onTouchMove={() => mouseEnter(id)}
                >
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className={css.hoverImg}
                  />
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
                <div className={css.FPcard_info}>
                  <h3>{e.title}</h3>
                  <p>{e.category}</p>
                  <span>${e.price}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureProduct;
