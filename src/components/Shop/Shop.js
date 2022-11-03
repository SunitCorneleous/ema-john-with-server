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
  const [cart, setCart] = useState([]);

  const HandleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // fetch product datas
  useEffect(() => {
    fetch("products.json")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // get stored cart from local storage
  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];

    for (const id in storedCart) {
      const storedProducts = products.find(product => product.id === id);

      if (storedProducts) {
        const quantity = storedCart[id];
        storedProducts.quantity = quantity;
        savedCart.push(storedProducts);
      }
    }

    setCart(savedCart);
  }, [products]);

  // add products to cart
  const addToCart = selectedProduct => {
    const exists = cart.find(product => product.id === selectedProduct.id);
    let newCart;

    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(product => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  return (
    <div className="shop-container">
      {/* products */}
      <div className="products-container">
        {products.map(product => (
          <Product
            key={product.id}
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
    </div>
  );
};

export default Shop;
