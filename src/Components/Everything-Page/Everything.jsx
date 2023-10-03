import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import css from "../Everything-Page/Everything.module.css";
import Navbar from "../Home-Page/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from "../../Data/Icons";
import { getFilterItems, getCheckedFilterItems } from "../../Cart/filter";
import Footer from "../Home-Page/Footer";
import { formatPrice } from "../../Utils/formatPrice";
import { useInView } from "react-intersection-observer";
import Card from "./Card";

const Everything = () => {
  const { FilteredItems, FilterSection, maxPrice, minPrice, isLoading } =
    useSelector((state) => state.filter);
  const dispatch = useDispatch();

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
    return () => {
      return;
    };
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

  // In Error case, it seems like you're trying to access the blob element before it's rendered in the component.
  // const blobRef = useRef(null);

  // useEffect(() => {
  // Access the blob element and set its style properties
  // if (blobRef.current) {
  // const blob = blobRef.current;

  // blob.style.top = `${clientY + scrollY}px`;
  // blob.style.left = `${clientX}px`;
  //   document.body.onpointermove = (event) => {
  //     const { clientX, clientY } = event;
  //     const scrollY = window.scrollY; // Get the current vertical scroll position
  //     blob.animate(
  //       {
  //         left: `${clientX}px`,
  //         top: `${clientY + scrollY}px`,
  //       },
  //       { duration: 0, fill: "forwards" }
  //     );
  //   };
  // }
  // }, []);

  return (
    <>
      {/* <div ref={blobRef} className={css.blob}></div> */}
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
                  {productsToDisplay.map(({ id, ...e }, i) => (
                    <Card id={id} e={e} key={id} />
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
    </>
  );
};

export default Everything;
