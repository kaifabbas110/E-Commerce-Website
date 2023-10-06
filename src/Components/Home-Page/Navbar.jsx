import React, { useEffect, useState } from "react";
import logo from "../../../img/logo/main-logo.png";
import css from "../../CSS/Navbar.module.css";
import { BagHeart, Person } from "../../../img/logo/Socials";
import { Cancel, Hamburger } from "../../Data/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  hamburgerToggle,
  addToCartToggle,
  removeFromCart,
  toggleLog,
} from "../../Cart/cartSlice";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/formatPrice";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const {
    Amount,
    AddToCart,
    HamburgerState,
    AddToCartState,
    Total,
    ToggleLog,
  } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [loginToCheckout, setLoginToCheckout] = useState(false);
  const loginToCheckoutModal = () => {
    dispatch(loginWithRedirect());
  };
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
          <Link>
            <li>women</li>
          </Link>
          <Link>
            <li>men</li>
          </Link>
          <Link>
            <li>accessories</li>
          </Link>
        </ul>
      </div>
      <div className={css.header_right}>
        <ul className={css.ul_2}>
          <Link>
            <li>about</li>
          </Link>
          <Link>
            <li>contact us</li>
          </Link>
          <li className={css.notHidden}>{formatPrice(Total)}</li>
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
            </button>
          </li>
          {user ? (
            <li className={css.person}>
              <button type="button">
                <img
                  src={user?.picture}
                  alt={user.name}
                  className={css.userImg}
                  onClick={() => dispatch(toggleLog())}
                />
                {ToggleLog && (
                  <button
                    className={css.logOutBtn}
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    onMouseLeave={() => dispatch(toggleLog())}
                  >
                    logout
                  </button>
                )}
              </button>
            </li>
          ) : (
            <li className={css.person}>
              <button type="button" onClick={() => dispatch(toggleLog())}>
                <Person className={css.userImg} />
                {ToggleLog && (
                  <button
                    className={css.logOutBtn}
                    onClick={() => loginWithRedirect()}
                    onMouseLeave={() => dispatch(toggleLog())}
                  >
                    login
                  </button>
                )}
              </button>
            </li>
          )}
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
              {user ? (
                <>
                  <li>
                    <button type="button">
                      <img
                        src={user.picture}
                        alt={user.name}
                        onClick={() => dispatch(toggleLog())}
                      />
                    </button>
                  </li>
                  {ToggleLog && (
                    <li
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      logout
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <button type="button" onClick={() => dispatch(toggleLog())}>
                      <Person />
                    </button>
                  </li>
                  {ToggleLog && (
                    <li
                      onClick={() => loginWithRedirect()}
                      style={{ color: "#307FA5" }}
                    >
                      login
                    </li>
                  )}
                </>
              )}
              <li>
                <Link
                  to="/everything"
                  onClick={() => dispatch(hamburgerToggle())}
                >
                  everything
                </Link>
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
                          {items.quantity} x {formatPrice(items.price)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={css.AddToCartHide}
                      onClick={(e) => {
                        dispatch(removeFromCart(items.id));
                      }}
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
                <span>{formatPrice(Total)}</span>
              </div>
              <div className={css.lower_2}>
                <Link to="/cart">
                  <button
                    type="button"
                    onClick={() => dispatch(addToCartToggle())}
                  >
                    view cart
                  </button>
                </Link>
                {user ? (
                  <Link to="/checkout">
                    <button
                      type="button"
                      onClick={() => dispatch(addToCartToggle())}
                    >
                      checkout
                    </button>
                  </Link>
                ) : (
                  <>
                    {loginToCheckout && (
                      <div className={css.loginToCheckout}>
                        <div>
                          <h1>login to checkout</h1>
                          <div>
                            <button
                              type="button"
                              onClick={() => loginToCheckoutModal()}
                            >
                              ok
                            </button>
                            <button
                              type="button"
                              onClick={() => setLoginToCheckout(false)}
                            >
                              no
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <Link>
                      <button
                        type="button"
                        // onClick={() => dispatch(addToCartToggle())}
                        onClick={() => setLoginToCheckout(true)}
                      >
                        checkout
                      </button>
                    </Link>
                  </>
                )}
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
