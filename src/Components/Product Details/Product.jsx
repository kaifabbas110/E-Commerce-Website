import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../Cart/filter";
import Navbar from "../Home-Page/Navbar";
import css from "./Product.module.css";
import Footer from "../Home-Page/Footer";
import { formatPrice } from "../../Utils/formatPrice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, isLoading } = useSelector((store) => store.filter);
  const { title, price, thumbnail, description, category, images } =
    selectedProduct;
  const [currentImg, setCurrentImg] = useState(thumbnail);

  console.log(currentImg);
  const toggleDetailImgs = (i) => {
    console.log(i);
    setCurrentImg(images?.[i]);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
    setCurrentImg(thumbnail);
    dispatch(getProductById(id));
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
        <div>
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
            </div>
          </div>
          <div className={css.images}>
            {images?.map((e, i) => {
              return (
                <div key={i}>
                  <img src={e} onClick={() => toggleDetailImgs(i)} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default Product;
