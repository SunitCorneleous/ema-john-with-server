import React from "react";
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ product, deleteHandler }) => {
  const { id, img, name, price, quantity, shipping } = product;

  return (
    <div className="review-item">
      <div className="review-item-image">
        <img src={img} alt="product" />
      </div>
      <div className="review-details-container">
        <div className="review-item-details">
          <h2>{name}</h2>
          <p>
            Price:
            <small className="price-color"> ${price}</small>
          </p>
          <p>
            Quantity:
            <small> {quantity}</small>
          </p>
          <p>
            Shipping:
            <small className="price-color"> ${shipping}</small>
          </p>
        </div>
        <div>
          <button className="delete-button" onClick={() => deleteHandler(id)}>
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
