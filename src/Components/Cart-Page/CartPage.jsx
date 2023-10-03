import React, { useEffect } from "react";
import Navbar from "../Home-Page/Navbar";
import css from "../Cart-Page/CartPage.module.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Home-Page/Footer";
import { Cancel } from "../../Data/Icons";
import {
  openModal,
  removeFromCart,
  closeModal,
  incrementItemsQuantity,
  decrementItemsQuantity,
} from "../../Cart/cartSlice";
import { BagHeart } from "../../../img/logo/Socials";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/formatPrice";
import OpenModal from "../../Utils/OpenModal";
import { useState } from "react";
import { User, useAuth0 } from "@auth0/auth0-react";
const CartPage = () => {
  const { AddToCart, isOpen, Total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // const [itemQuantity, setItemQuantity] = useState(null);

  const handleIncrement = (item) => {
    dispatch(incrementItemsQuantity(item));
  };
  const handleDecrement = (item) => {
    dispatch(decrementItemsQuantity(item));
  };

  const subTotal = (p, q) => {
    const subTotal = p * q;
    return formatPrice(subTotal);
  };

  const [itemToRemoveId, setItemToRemoveId] = useState(null); // State to store the item ID to be removed

  const handleRemoveItemClick = (item) => {
    setItemToRemoveId(item); // Set the item ID to be removed
    dispatch(openModal());
  };

  const handleConfirmRemove = () => {
    if (itemToRemoveId) {
      // Check if there is an item to remove
      dispatch(removeFromCart(itemToRemoveId.id)); // Remove the item from the cart
      dispatch(closeModal());
      setItemToRemoveId(null); // Reset the state
    }
  };
  const { loginWithRedirect, user } = useAuth0();
  return (
    <>
      {isOpen && (
        <OpenModal
          onConfirmRemove={handleConfirmRemove}
          title={itemToRemoveId?.title}
        />
      )}
      <div className={css.mainContainer}>
        <Navbar />
        <div className={css.cartContainer}>
          <h1>my bag ({AddToCart.length})</h1>
          {AddToCart.length > 0 ? (
            <table className={css.cartItemsTable}>
              <thead>
                <tr>
                  <th>product</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>sub total</th>
                </tr>
              </thead>
              <tbody>
                {AddToCart.map((e) => {
                  return (
                    <tr className={css.tableMargin} key={e.id}>
                      <td className={css.grid}>
                        {/* <td className={css.displayResp}> */}
                        <td>
                          <button
                            type="button"
                            onClick={() => dispatch(handleRemoveItemClick(e))}
                          >
                            <Cancel />
                          </button>
                        </td>
                        <td>
                          <img src={e.thumbnail} alt={e.title} />
                        </td>
                        {/* </td> */}
                        <td
                          data-cell="title"
                          className={`${css.attribute} ${css.attributeTitleDesktop}`}
                        >
                          {e.title}
                        </td>
                      </td>
                      <td
                        data-cell="title"
                        className={`${css.attribute} ${css.attributeTitleMobile}`}
                      >
                        {e.title}
                      </td>
                      <td data-cell="price" className={css.attribute}>
                        {formatPrice(e.price)}
                      </td>
                      <td data-cell="quantity" className={css.attribute}>
                        <td className={css.quantity}>
                          <button
                            type="button"
                            className={css.quantityBtn}
                            onClick={() => handleDecrement(e)}
                          >
                            <AiOutlineMinus />
                          </button>
                          <span>{e.quantity}</span>
                          <button
                            type="button"
                            className={css.quantityBtn}
                            onClick={() => handleIncrement(e)}
                          >
                            <AiOutlinePlus />
                          </button>
                        </td>
                      </td>
                      <td data-cell="sub total" className={css.attribute}>
                        {subTotal(e.price, e.quantity)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className={css.emptyCart}>
              <div>
                <BagHeart />
                <p>Your cart is currently empty</p>
              </div>
              <Link to="/everything">
                <button type="button" className={css.returnToShop}>
                  return to shop
                </button>
              </Link>
            </div>
          )}
          <div className={css.checkOut}>
            <div className={css.checkOutBox}>
              <div>
                <span>subTotal:</span>
                <span>{formatPrice(Total)}</span>
              </div>
              <div>
                <span>shipping fee:</span>
                <span>{formatPrice(4.99)}</span>
              </div>
              <div>
                <span>order total:</span>
                <span> {formatPrice(Total + 4.99)}</span>
              </div>
            </div>
            {user ? (
              <Link to="/checkout">
                <button type="button">proceed to checkout</button>
              </Link>
            ) : (
              <button type="button" onClick={() => loginWithRedirect()}>
                login
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
