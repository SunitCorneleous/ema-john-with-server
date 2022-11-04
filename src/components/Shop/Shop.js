import React, { useEffect, useState } from "react";
import "./Shop.css";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  //pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(count / size);

  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setCount(data.count);
      });
  }, [page, size]);

  // clear cart
  const HandleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // get stored cart from local storage
  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];

    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then(res => res.json())
      .then(data => {
        for (const id in storedCart) {
          const storedProducts = data.find(product => product._id === id);

          if (storedProducts) {
            const quantity = storedCart[id];
            storedProducts.quantity = quantity;
            savedCart.push(storedProducts);
          }
        }
        setCart(savedCart);
      });
  }, [products]);

  // add products to cart
  const addToCart = selectedProduct => {
    const exists = cart.find(product => product._id === selectedProduct._id);
    let newCart;

    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(product => product._id !== selectedProduct._id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      {/* products */}
      <div className="products-container">
        {products.map(product => (
          <Product
            key={product._id}
            product={product}
            handler={addToCart}
          ></Product>
        ))}
      </div>

      {/* cart */}
      <div className="cart-container">
        <Cart cart={cart} clearCart={HandleClearCart}>
          <Link to="/order">
            <br />
            <button className="btn btn-orange">Review Order</button>
          </Link>
        </Cart>
      </div>

      {/* pagination */}
      <div className="pagination">
        <p>
          Current page: {page} & Size {size}
        </p>
        {[...Array(pages).keys()].map(number => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={number === page ? "selected" : ""}
          >
            {number + 1}
          </button>
        ))}

        <select onChange={event => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
