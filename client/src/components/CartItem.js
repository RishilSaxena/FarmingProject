import React, { useState } from "react";
import "./cart.css";
import axios from "axios"

const CartItem = ({ e }) => {
  const [count, setCount] = useState(e.quantity);
  const [item, setItem] = useState(e);
  const changeInput = (e) => {
    changeQuantity(e.target.value);
  };
  const changeQuantity = async (quantity) => {
    setCount(quantity)
    await axios.post("/api/updateQuantity", {quantity: quantity, food: item.food, sellerId: item.sellerId})
    document.location.reload()
  }
  const deleteItem = async () => {
    console.log("deleting")
    await axios.post("/api/deleteItem", {food: item.food, sellerId: item.sellerId})
    document.location.reload();
  }

  return (
    // <div className="inline text-center w-full align-center justify-center ">
    <div className="container w-3/4 p-4 border-2 text-left m-auto rounded-md my-3 shadow-md relative bg-white">
      <img src={e.foodImage} className="rounded-full w-20 h-16 mr-10 inline" />

      <span className="font-bold text-lg align-middle mr-10">{e.food}</span>

      <button
        className="bg-white rounded-l-full text-center border-2 h-6 inline-block transform translate-y-0.5"
        onClick={() => (count != 0 ? changeQuantity(count - 1) : "")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-3 my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>
      <div className="vertical-align inline">
        <input
          className="w-2/12 p-2 text-center border-2 h-6 inline"
          value={count}
          onChange={changeInput}
        />
      </div>
      <button
        className="bg-white rounded-r-full text-center border-2 h-6 transform translate-y-0.5"
        onClick={() => changeQuantity(parseInt(count) + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {e.sellMethod == "weight" ? (
          <span className="font-bold text-md mb-2 cursor-default ml-8">${e.price} per pound</span>
        ) : (
          <span className="font-bold text-md mb-2 cursor-default ml-8">${e.price} each</span>
        )}
 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute right-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{top: (99/2)-12}}
        onClick={deleteItem}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>

    </div>
  );
};

export default CartItem;
