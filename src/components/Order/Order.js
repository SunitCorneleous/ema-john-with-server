import React, { useState } from "react";
import "./Order.css";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Order = () => {
  const { products, storedCart } = useLoaderData();
  const [cart, setCart] = useState(storedCart);

  const handleRemoveItem = id => {
    const itemsLeft = cart.filter(product => product.id !== id);

    setCart(itemsLeft);
    removeFromDb(id);
  };

  const HandleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="items-container">
        {cart.map(product => (
          <ReviewItem
            key={product.id}
            product={product}
            deleteHandler={handleRemoveItem}
          ></ReviewItem>
        ))}
        {cart.length === 0 && (
          <h1>
            No products added! <Link to="/shop">Shop Now</Link>
          </h1>
        )}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={HandleClearCart}>
          <br />
          {cart[0] && (
            <Link to="/shipping">
              <button className="btn btn-orange">Proceed Shipping</button>
            </Link>
          )}
        </Cart>
      </div>
    </div>
  );
};

export default Order;
