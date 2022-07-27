import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";

const Card = ({ e, toggleAddingToCart, setProductInformation }) => {
  const navigate = useNavigate();
  const addToCart = () => {
    if (document.cookie) {
      setProductInformation(e);
      toggleAddingToCart(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      className="p-6 ml-4 mr-4 rounded-md w-1/5 inline-block text-center h-36"
      id="card"
    >
      <div className="face face-front block absolute top-0 left-0 w-full h-full rounded-md bg-white shadow-md p-4">
        <img className="rounded-full w-20 m-auto mb-2" src={e.foodImage} />
        <h1 className="font-bold text-lg cursor-default">{e.food}</h1>
        {e.sellMethod == "weight" ? (
          <p className="font-medium text-md mb-2 cursor-default">${e.price} per pound</p>
        ) : (
          <p className="font-medium text-md mb-2 cursor-default">${e.price} each</p>
        )}
      </div>
      <div className="face face-back block absolute top-0 left-0 w-full h-full rounded-md bg-white shadow-md p-4">
        <p className="font-medium text-md mb-2 cursor-default">Sold by {e.gardenName}</p>
        <Link
          to={"/seller/" + e.sellerId}
          className="block text-blue-500 font-medium mb-2 hover:text-blue-400 cursor-pointer"
        >
          Visit Seller Page
        </Link>

        <button
          className="bg-green-500 p-4 rounded-md font-bold text-white hover:bg-green-400 cursor-pointer"
          id="button"
          onClick={addToCart}
        >
          Add to cart!
        </button>
      </div>
    </div>
  );
};

export default Card;
