import React from "react";
import "./App.css";
import Home from "./Components/Home-Page/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./Components/Cart-Page/CartPage";
import CheckoutPage from "./Components/Checkout-Page/CheckoutPage";
import ErrorPage from "./Components/Error-Page/ErrorPage";
import Everything from "./Components/Everything-Page/Everything";
import SingleProduct from "./Components/Product Details/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cartpage",
    element: <CartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkoutpage",
    element: <CheckoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/everything",
    element: <Everything />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Product/:id",
    element: <SingleProduct />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
