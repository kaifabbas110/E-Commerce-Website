import React, { useState } from "react";
import Navbar from "../Home-Page/Navbar";
import css from "../Cart-Page/CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Home-Page/Footer";
import { Cancel } from "../../Data/Icons";
import {
  updateCartPageItemsQuantity,
  removeFromCart,
} from "../../Cart/cartSlice";
import { BagHeart } from "../../../img/logo/Socials";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { AddToCart, Total } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateCartPageItemsQuantity({ id: itemId, newQuantity }));
  };
  const subTotal = (p, q) => {
    const subTotal = (p * q).toFixed(2);
    return subTotal;
  };
  return (
    <div className={css.mainContainer}>
      <Navbar />
      <div className={css.cartContainer}>
        <h1>cart</h1>
        {AddToCart.length > 0 ? (
          <table className={css.cartItems}>
            <tr>
              <th>product</th>
              <th>price</th>
              <th>quantity</th>
              <th>subtotal</th>
            </tr>
            {AddToCart.map((items) => {
              return (
                <tbody key={items.id}>
                  <tr>
                    <td className={css.tableProduct}>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            setTimeout(() => {
                              dispatch(removeFromCart(items.id));
                            }, 2000)
                          }
                        >
                          <Cancel />
                        </button>
                      </td>
                      <td>
                        <img src={items.thumbnail} alt={items.img} />
                      </td>
                      <td>
                        <p>{items.name}</p>
                      </td>
                    </td>
                    <td>${items.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        // id={`quantity-${items.id}`}
                        value={items.quantity}
                        min={1}
                        placeholder={items.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            items.id,
                            parseInt(e.target.value, 10) //uses the parseInt function to convert it to an integer using base 10 (decimal). This is necessary because the value of an input field is typically a string, and you want to make sure you're working with an integer.
                          )
                        }
                      />
                    </td>
                    <td>${subTotal(items.price, items.quantity)}</td>
                  </tr>
                </tbody>
              );
            })}
            <tfoot>
              <tr>
                <td>
                  <div className={css.tfoot}>
                    <div className={css.tfoot1}>
                      <input type="text" placeholder="Coupon code" />
                      <button type="button">apply coupon</button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={css.tfoot2}>
                    <button type="button">update cart</button>
                  </div>
                </td>
              </tr>
            </tfoot>
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
        {/* <table className={css.cartTotals}>
          <th>
            <tr>
              <td>
                <h1>Cart totals</h1>
              </td>
            </tr>
          </th>
          <tr className={css.cartTotals_p}>
            <td>
              <p>Subtotal</p>
            </td>
            <td>
              <span>${Total.toFixed(2)}</span>
            </td>
          </tr>
          <tr className={css.cartTotals_p}>
            <td>
              <p>Total</p>
            </td>
            <td>
              <span>${Total.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <td className={css.cartTotals_btn}>
              <button type="button">checkout</button>
            </td>
          </tr>
        </table> */}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
