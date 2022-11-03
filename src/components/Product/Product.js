import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, handler }) => {
  const { img, name, price, seller, ratings } = product;

  return (
    <div className="product-container">
      <img src={img} alt="product" />
      <div className="product-info">
        <h2 className="product-title">{name}</h2>
        <p>Price: ${price}</p>
        <p>
          <small>Manufacturer: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings}</small>
        </p>
      </div>
      <button className="btn-cart" onClick={() => handler(product)}>
        Add To Cart
        <FontAwesomeIcon icon={faCartShopping} className="icon" />
      </button>
    </div>
  );
};

export default Product;
