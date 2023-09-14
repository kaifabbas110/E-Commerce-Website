import React, { useEffect } from "react";
import logo from "../../../img/logo/main-logo.png";
import css from "../../CSS/Navbar.module.css";
import { BagHeart, Person } from "../../../img/logo/Socials";
import { Cancel, Hamburger } from "../../Data/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  hamburgerToggle,
  addToCartToggle,
  removeFromCart,
  totalCalculation,
} from "../../Cart/cartSlice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { Amount, AddToCart, HamburgerState, AddToCartState, Total } =
    useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    // Delayed dispatch of totalCalculation after 10 seconds
    const delayTotalCalculation = setTimeout(() => {
      dispatch(totalCalculation());
    }, 2000);

    // Cleanup function to clear the timers when the component unmounts or when AddToCart changes
    return () => {
      clearTimeout(delayTotalCalculation);
    };
  }, [AddToCart]);

  return (
    <div className={css.header}>
      <div className={css.header_left}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <ul className={css.ul_1}>
          <Link to="/everything">
            <li className={css.mobileView}>everything</li>
          </Link>
          <li>women</li>
          <li>men</li>
          <li>accessories</li>
        </ul>
      </div>
      <div className={css.header_right}>
        <ul className={css.ul_2}>
          <li>about</li>
          <li>contact us</li>
          <li className={css.notHidden}>${Total.toFixed(2)}</li>
          <li className={`${css.notHidden} ${css.BagHeart}`}>
            <button type="button" onClick={() => dispatch(addToCartToggle())}>
              <BagHeart />
              {Amount > 9 ? (
                <span
                  className={css.totalCarts}
                  style={{
                    padding: "0.3rem",
                    fontSize: "2rem",
                  }}
                >
                  {Amount}
                </span>
              ) : (
                <span className={css.totalCarts}>{Amount}</span>
              )}
              {/* <span className={css.totalCarts}>{Amount}</span> */}
            </button>
          </li>
          <li className={css.person}>
            <button type="button" onClick={() => dispatch()}>
              <Person />
            </button>
          </li>
          <li className={`${css.notHidden} ${css.hamburger}`}>
            <button type="button" onClick={() => dispatch(hamburgerToggle())}>
              <Hamburger />
            </button>
          </li>
        </ul>
        {HamburgerState ? (
          <div className={css.hamburgerShow}>
            <button
              type="button"
              className={css.hamburgerHide}
              onClick={() => dispatch(hamburgerToggle())}
            >
              <Cancel />
            </button>
            <ul>
              <button type="button">
                <Person />
              </button>
              <li>
                <Link to="/everything">everything</Link>
              </li>
              <li>
                <a href="#">men</a>
              </li>
              <li>
                <a href="#">women</a>
              </li>
              <li>
                <a href="#">accessories</a>
              </li>
              <li></li>
              <li>
                <a href="#">about</a>
              </li>
              <li>
                <a href="#">contact us</a>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        {AddToCartState ? (
          <div className={css.AddToCartShow}>
            <div className={css.upper}>
              <h3>shopping cart</h3>
              <button
                type="button"
                className={css.AddToCartHide}
                onClick={() => dispatch(addToCartToggle())}
              >
                <Cancel />
              </button>
            </div>
            <div className={css.middle}>
              {AddToCart.map((items, index) => {
                return (
                  <div key={items.id} className={css.cartItems}>
                    <div className={css.cartItems_img}>
                      <img src={items.thumbnail} alt={items.img} />
                      <div className={css.cartItems_info}>
                        <h3>{items.name}</h3>
                        <span>
                          {items.quantity} x ${items.price}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={css.AddToCartHide}
                      onClick={(e) =>
                        setTimeout(() => {
                          // console.log(items.id);
                          dispatch(removeFromCart(items.id));
                        }, 2000)
                      }
                    >
                      <Cancel />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className={css.lower}>
              <div className={css.lower_1}>
                <h4>Subtotal:</h4>
                <span>${Total.toFixed(2)}</span>
              </div>
              <div className={css.lower_2}>
                <Link to="/cartpage">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCartToggle())}
                  >
                    view cart
                  </button>
                </Link>
                <Link to="/checkoutpage">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCartToggle())}
                  >
                    checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
