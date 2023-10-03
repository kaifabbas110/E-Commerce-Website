import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { decrement, getProductById, increment } from "../../Cart/filter";
import Navbar from "../Home-Page/Navbar";
import css from "./Product.module.css";
import Footer from "../Home-Page/Footer";
import { formatPrice } from "../../Utils/formatPrice";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  addToCart,
  decrementItemsQuantity,
  incrementItemsQuantity,
} from "../../Cart/cartSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, isLoading } = useSelector((store) => store.filter);
  const { title, price, thumbnail, description, category, images, quantity } =
    selectedProduct;
  const [currentImg, setCurrentImg] = useState(thumbnail);

  const toggleDetailImgs = (i) => {
    setCurrentImg(images?.[i]);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
    setCurrentImg(thumbnail);
    dispatch(getProductById(id));
    console.log("Hello");
  }, [id, thumbnail]);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className={css.Loading}>
          <h1>Loading</h1>
          <div className={css.buffer}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className={css.mainH1}>Product</h1>
            <div className={css.navigation}>
              <Link to="/">home</Link>
              <span>&#47;</span>
              <Link to="/everything">everything</Link>
              <span>&#47;</span>
              <span>{title}</span>
            </div>
          </div>
          <div className={css.productDetailFlex}>
            <div className={css.images}>
              {images?.map((e, i) => {
                return (
                  <div key={i}>
                    <img src={e} onClick={() => toggleDetailImgs(i)} />
                  </div>
                );
              })}
            </div>
            <div className={css.productDetailGrid}>
              <div className={css.productDetailImg}>
                <img src={currentImg} alt={title} />
              </div>
              <div className={css.productDetailInfo}>
                <h1>{title}</h1>
                <p>{formatPrice(price)}</p>
                <p>{description}</p>
                <hr />
                <p>category:{category}</p>
                <div className={css.productDetailInfoBtn}>
                  <div className={css.quantityBtn}>
                    <button
                      type="button"
                      onClick={() => dispatch(decrement(selectedProduct))}
                    >
                      <AiOutlineMinus />
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(increment(selectedProduct))}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <div className={css.addToCartBtn}>
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(selectedProduct))}
                    >
                      + add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
export default Product;
