import React, { useEffect, useState } from "react";
import axios from "axios";

const AddToCartModal = ({ productInformation, toggleAddingToCart }) => {
  const [fullWidth, setFullWidth] = useState("");
  const [fullHeight, setFullHeight] = useState("");
  const [modalWidth, setModalWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [count, setCount] = useState(0);
  const closeModal = () => {
    toggleAddingToCart(false);
  };
  useEffect(() => {
    const width = document.body.clientWidth;
    const height = window.innerHeight;
    console.log(height);
    setFullHeight(height);
    setFullWidth(width);
    if (width > 1000) {
      setModalWidth(width / 2);
    } else if (width > 500) {
      setModalWidth((width * 2) / 3);
    } else {
      setModalWidth((width * 3) / 4);
    }
    setImageHeight(document.getElementById("image").clientHeight);
  });
  const addToCart = async () => {
    const product = { ...productInformation, quantity: count };
    await axios.post("/api/addToCart", product);
    closeModal();
  };
  const changeInput = (e) => {
    setCount(e.target.value);
  };

  return (
    <div classsName="container">
      <div
        className="fixed bg-white p-6 rounded shadow-2xl grid grid-cols-2 transition-all duration-500 ease-in-out"
        id="addToCart"
        style={{
          width: modalWidth,
          height: modalWidth / 2,
          left: (fullWidth - modalWidth) / 2,
          top: (fullHeight - modalWidth / 2) / 2,
        }}  
      >
        <div className="flex align-center justify-center">
          <div className="w-2/3 m-auto">
            <img
              className="w-full h-auto block m-auto"
              id="image"
              // style={}
              src={productInformation.foodImage}
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Buy {productInformation.food}</h1>
          {productInformation.sellMethod == "weight" ? (
          <h1 className="text-xl font-bold mt-6">${productInformation.price} per pound</h1>
        ) : (
          <h1 className="text-xl font-bold mt-6">${productInformation.price} each</h1>
        )}
          <div className="counter flex text-center w-full align-center justify-center mt-10">
            <button
              className="bg-white p-2 rounded-l-full text-center border-2"
              onClick={() => (count != 0 ? setCount(count - 1) : "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <input
              className="w-1/3 p-2 text-center border-2"
              value={count}
              onChange={changeInput}
            />
            <button
              className="bg-white p-2 rounded-r-full text-center border-2"
              onClick={() => setCount(count + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          </div>
          <button
            className="bg-green-500 p-4 rounded-md text-white hover:bg-green-400 mt-10"
            onClick={addToCart}
          >
            Add to cart!
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute top-4 right-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={closeModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
