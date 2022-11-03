import React from "react";
import "./Cart.css";

const Cart = ({ cart, clearCart, children }) => {
  let total = 0;
  let shippingTotal = 0;
  let quantity = 0;

  for (const product of cart) {
    total = total + product.price * product.quantity;
    shippingTotal = shippingTotal + product.shipping;
    quantity = quantity + product.quantity;
  }

  const tax = parseFloat((total * 0.1).toFixed(2));
  const grandTotal = total + shippingTotal + tax;

  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <div className="cart-info">
        <p>Selected items: {quantity}</p>
        <p>Total price: ${total}</p>
        <p>Total shipping: ${shippingTotal}</p>
        <p>Tax: ${tax}</p>
        <h3>Grand total: ${grandTotal}</h3>
      </div>
      <button className="btn btn-red" onClick={clearCart}>
        Clear Cart
      </button>
      {children}
    </div>
  );
};

export default Cart;
