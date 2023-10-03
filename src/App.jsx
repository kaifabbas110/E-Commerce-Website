import React, { lazy, Suspense } from "react";
import css from "./Components/Everything-Page/Everything.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { totalCalculation } from "./Cart/cartSlice";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useAuth0 } from "@auth0/auth0-react";
import MyContext from "./Components/PrivateRoute/MyContext";
import AuthWrapper from "./Components/PrivateRoute/AuthWrapper";

const Home = lazy(() => import("./Components/Home-Page/Home"));
const CartPage = lazy(() => import("./Components/Cart-Page/CartPage"));
const CheckoutPage = lazy(() =>
  import("./Components/Checkout-Page/CheckoutPage")
);
const ErrorPage = lazy(() => import("./Components/Error-Page/ErrorPage"));
const Everything = lazy(() =>
  import("./Components/Everything-Page/Everything")
);
const SingleProduct = lazy(() =>
  import("./Components/Product Details/Product")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        }
      >
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: (
      <Suspense
        fallback={
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        }
      >
        <CartPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: (
      <Suspense
        fallback={
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        }
      >
        <PrivateRoute>
          <CheckoutPage />
        </PrivateRoute>
      </Suspense>
    ),

    errorElement: <ErrorPage />,
  },
  {
    path: "/everything",
    element: (
      <Suspense
        fallback={
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        }
      >
        <Everything />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/Product/:id",
    element: (
      <Suspense
        fallback={
          <div className={css.Loading}>
            <h1>Loading</h1>
            <div className={css.buffer}>
              {[...Array(5)].map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
        }
      >
        <SingleProduct />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const { AddToCart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    // Delayed dispatch of totalCalculation after 10 seconds
    // const delayTotalCalculation = setTimeout(() => {
    dispatch(totalCalculation());
    // }, 2000);

    //set AddToCart into localStorage :) .
    localStorage.setItem("cart", JSON.stringify(AddToCart));

    // Cleanup function to clear the timers when the component unmounts or when AddToCart changes
    // return () => {
    // clearTimeout(delayTotalCalculation);
    // };
  }, [AddToCart]);
  return <RouterProvider router={router} />;
}

export default App;
