import React from "react";
import Navbar from "../Home-Page/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import css from "../Checkout-Page/CheckoutPage.module.css";
import { Link } from "react-router-dom";
const CheckoutPage = () => {
  const { user } = useAuth0();
  return (
    <div>
      <Navbar />
      <div className={css.checkout}>
        <h1>dear {user.name}</h1>
        <img src={user.picture} />
        <p>you can't checkout anything hehe! 😆</p>
        <Link to="/">go back to shopping</Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
