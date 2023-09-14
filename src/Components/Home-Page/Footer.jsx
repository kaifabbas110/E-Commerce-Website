import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Google,
} from "../../../img/logo/Socials";
import logo from "../../../img/logo/logo@2x-free-img-120x40.png";
import css from "../../CSS/Footer.module.css";
const Footer = () => {
  return (
    <div className={css.footer}>
      <hr />
      <div className={css.footer_upper}>
        <h1>
          <a href="#">
            SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
          </a>
        </h1>
      </div>
      <hr />
      <div className={css.footer_middle}>
        <div className={css.footer_middle_1}>
          <img src={logo} alt="logo" className={css.heading_marginBottom} />
          <h1>The best look anytime, anywhere.</h1>
        </div>
        <div className={css.footer_middle_2}>
          <div>
            <h3 className={css.heading_marginBottom}>for women</h3>
            <ul>
              <li>
                <a href="#">women jeans</a>
              </li>
              <li>
                <a href="#">women shirts</a>
              </li>
              <li>
                <a href="#">women jackets</a>
              </li>
              <li>
                <a href="#">women flats</a>
              </li>
              <li>
                <a href="#">women accessories</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={css.heading_marginBottom}>for men</h3>
            <ul>
              <li>
                <a href="#"> men jeans</a>
              </li>
              <li>
                <a href="#"> men shirts</a>
              </li>
              <li>
                <a href="#"> men shoes</a>
              </li>
              <li>
                <a href="#"> men accessories</a>
              </li>
              <li>
                <a href="#"> men jackets</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.footer_middle_3}>
          <div>
            <h3 className={css.heading_marginBottom}>subscribe</h3>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address..."
            />
            <button type="button">subscribe</button>
          </div>
        </div>
      </div>
      <hr />
      <div className={css.footer_lower}>
        <p>Copyright © 2023 Brandstore. Powered by Brandstore.</p>
        <div className={css.footerLogo}>
          <Facebook />
          <Youtube />
          <Twitter />
          <Instagram />
          <Google />
        </div>
      </div>
    </div>
  );
};

export default Footer;
