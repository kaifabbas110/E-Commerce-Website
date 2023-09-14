import React, { useEffect, useState } from "react";
import css from "../Everything-Page/Everything.module.css";
import Navbar from "../Home-Page/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { showCartOnHover, addToCart } from "../../Cart/cartSlice";
import { BagHeart } from "../../../img/logo/Socials";
import { ArrowRight } from "../../Data/Icons";
import {
  getFilterItems,
  getCheckedFilterItems,
  getProductById,
} from "../../Cart/filter";
import Footer from "../Home-Page/Footer";
import { formatPrice } from "../../Utils/formatPrice";
import { Link } from "react-router-dom";

const Everything = () => {
  const { CartOnHover } = useSelector((store) => store.cart);
  const { FilteredItems, FilterSection, maxPrice, minPrice, isLoading } =
    useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const mouseEnter = (id) => {
    dispatch(showCartOnHover(id));
  };

  const mouseLeave = (id) => {
    dispatch(showCartOnHover(null));
  };

  const [filter, setFilter] = useState({});
  const changeHandler = (e, name, options) => {
    if (e.target.checked) {
      const newFilter = { ...filter, [name]: e.target.value };
      setFilter(filter);
      dispatch(getCheckedFilterItems(newFilter));
    } else {
      const newFilter = { ...filter, "": "" };
      setFilter(filter);
      dispatch(getCheckedFilterItems(newFilter));
    }
  };

  useEffect(() => {
    dispatch(getFilterItems());
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [price, setPrice] = useState(null);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentFilteredItems = FilteredItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(FilteredItems.length / itemsPerPage);

  const handlePrevClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const searchHandel = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    const filteredResults = FilteredItems.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(inputValue);
      const withinPriceRange =
        price === null || (item.price >= minPrice && item.price <= price);
      return matchesSearch && withinPriceRange;
    });

    setSearchResults(filteredResults);
    setCurrentPage(1);
  };

  const [max, setMax] = useState(maxPrice);

  const priceHandler = (e) => {
    const range = parseFloat(e.target.value);
    setMax(range);
    setPrice(range);

    const priceRangeProducts = FilteredItems.filter(
      (item) => item.price >= minPrice && item.price <= range
    );

    setSearchResults(priceRangeProducts);
  };

  const productsToDisplay =
    searchInput || price
      ? searchResults.slice(startIndex, endIndex)
      : currentFilteredItems;

  return (
    <div className={css.mainEverything}>
      <Navbar />
      <div className={css.everything}>
        <div className={css.filterSection}>
          <div className={css.filterSection1}>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search products..."
              value={searchInput}
              onChange={searchHandel}
            />
            <button type="button">
              <ArrowRight />
            </button>
          </div>

          <div className={css.filterSection2}>
            {FilterSection.map(({ id, name, options }) => (
              <div key={id} className={css.filterSection2Mobile}>
                <div>
                  <h1>categories</h1>
                </div>
                {options.map(({ label, value, checked }) => (
                  <div key={value} className={css.filterSection2Category}>
                    <label className={css.filterSection2CategoryLabel}>
                      {label.split("-").join(" ").split("_").join(" ")}
                    </label>
                    <input
                      type="checkbox"
                      name={value}
                      id={value}
                      defaultValue={value}
                      defaultChecked={checked}
                      onChange={(e) => {
                        changeHandler(e, name, options);
                      }}
                      className={css.filterSection2CategoryInput}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={css.priceRange}>
            <div className={css.priceRangeInput}>
              <input
                type="range"
                name="range"
                id="range"
                min={minPrice}
                max={maxPrice}
                step={20}
                defaultValue={maxPrice}
                onChange={(e) => priceHandler(e)}
              />
            </div>
            <div className={css.priceRangeValues}>
              <span>
                min price:<span>{formatPrice(minPrice)}</span>
              </span>
              <span>
                max price:<span>{formatPrice(max)}</span>
              </span>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        ) : (
          <div className={css.everythingProduct}>
            {productsToDisplay.length !== 0 ? (
              <div className={css.everythingProductGrid}>
                {productsToDisplay.map(({ id, ...e }) => (
                  <Link to={`/Product/${id}`} key={id}>
                    <div className={css.wholecard}>
                      <div
                        className={css.card}
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
                            onClick={() => dispatch(addToCart({ id, ...e }))}
                          >
                            <BagHeart />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={css.card_info}>
                        <h3>{e.title}</h3>
                        <p>{e.category}</p>
                        <span>{formatPrice(e.price)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={css.noResult}>
                <h1>no result! 💩</h1>
              </div>
            )}
            {productsToDisplay.length < 9 ? (
              ""
            ) : (
              <div className={css.pagination}>
                <button
                  type="button"
                  onClick={handlePrevClick}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>{currentPage}</span>
                <button
                  type="button"
                  onClick={handleNextClick}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Everything;
