import { createBrowserRouter } from "react-router-dom";
import Main from "./../layout/Main";
import Shop from "./../components/Shop/Shop";
import Order from "./../components/Order/Order";
import { productsAndCartLoader } from "./../loaders/productsAndCartLoader";
import Inventory from "./../components/Inventory/Inventory";
import About from "./../components/About/About";
import LogIn from "../components/LogIn/LogIn";
import SignUp from "../components/SignUp/SignUp";
import Shipping from "../components/Shipping/Shipping";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "/shipping",
        element: (
          <PrivateRoute>
            <Shipping></Shipping>
          </PrivateRoute>
        ),
      },
      {
        path: "/order",
        element: <Order></Order>,
        loader: productsAndCartLoader,
      },
      {
        path: "/inventory",
        element: (
          <PrivateRoute>
            <Inventory></Inventory>
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <LogIn></LogIn> },
      { path: "/signup", element: <SignUp></SignUp> },
      { path: "/*", element: <h1>Page not found</h1> },
    ],
  },
  {
    path: "/about",
    element: <About></About>,
    loader: () => fetch("products.json"),
  },
]);
