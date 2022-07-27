import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Review from "../components/Review";
import Carousel, { CarouselItem } from "../components/Carousel";

const SellerPage = ({
  toggleLoading,
  toggleAddingToCart,
  setProductInformation,
}) => {
  const { id } = useParams();
  const [sellerData, setSellerData] = useState({});
  const [gardenImages, setGardenImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [formStars, setFormStars] = useState(0);
  useEffect(() => {
    toggleLoading(true);
    axios.get("/api/getSellerData/" + id).then(function (data) {
      toggleLoading(false);
      setSellerData(data.data);
      setLoaded(true);
      setGardenImages([data.data.image1, data.data.image2, data.data.image3]);
    });
  }, []);

  // const moveLeft = () => {
  //   if (currentImage == 0) {
  //     setCurrentImage(gardenImages.length - 1);
  //   } else {
  //     setCurrentImage(currentImage - 1);
  //   }
  // };

  // const moveRight = () => {
  //   console.log("moving right" + currentImage);
  //   if (currentImage == gardenImages.length - 1) {
  //     setCurrentImage(0);
  //   } else {
  //     setCurrentImage(currentImage + 1);
  //   }
  // };
  const set1Star = () => {
    document.getElementById("1-formstar").style.fill = "#fbbf24";
    document.getElementById("2-formstar").style.fill = "";
    document.getElementById("3-formstar").style.fill = "";
    document.getElementById("4-formstar").style.fill = "";
    document.getElementById("5-formstar").style.fill = "";
    setFormStars(1);
  };
  const set2Star = () => {
    document.getElementById("1-formstar").style.fill = "#fbbf24";
    document.getElementById("2-formstar").style.fill = "#fbbf24";
    document.getElementById("3-formstar").style.fill = "";
    document.getElementById("4-formstar").style.fill = "";
    document.getElementById("5-formstar").style.fill = "";
    setFormStars(2);
  };
  const set3Star = () => {
    document.getElementById("1-formstar").style.fill = "#fbbf24";
    document.getElementById("2-formstar").style.fill = "#fbbf24";
    document.getElementById("3-formstar").style.fill = "#fbbf24";
    document.getElementById("4-formstar").style.fill = "";
    document.getElementById("5-formstar").style.fill = "";
    setFormStars(3);
  };
  const set4Star = () => {
    document.getElementById("1-formstar").style.fill = "#fbbf24";
    document.getElementById("2-formstar").style.fill = "#fbbf24";
    document.getElementById("3-formstar").style.fill = "#fbbf24";
    document.getElementById("4-formstar").style.fill = "#fbbf24";
    document.getElementById("5-formstar").style.fill = "";
    setFormStars(4);
  };
  const set5Star = () => {
    document.getElementById("1-formstar").style.fill = "#fbbf24";
    document.getElementById("2-formstar").style.fill = "#fbbf24";
    document.getElementById("3-formstar").style.fill = "#fbbf24";
    document.getElementById("4-formstar").style.fill = "#fbbf24";
    document.getElementById("5-formstar").style.fill = "#fbbf24";
    setFormStars(5);
  };
  const submitReview = () => {
    toggleLoading(true);
    axios
      .post("/api/submitReview/" + id, {
        title: document.getElementById("form-review-title").value,
        stars: formStars,
        body: document.getElementById("form-review-body").value,
      })
      .then(function (data) {
        toggleLoading(false);
        document.location.reload();
      });
  };

  return (
    <div className="container m-auto p-4 shadow-lg mt-8 rounded-md bg-white">
      <h1 className="text-center font-bold text-2xl">
        {sellerData.gardenName}
      </h1>
      <div className="grid grid-cols-2 mt-8">
        <p className="w-1/2 m-auto block text-lg font-medium">
          {sellerData.bio}
        </p>
        <div className="w-full relative">
          <Carousel>
            <CarouselItem>{gardenImages[0]}</CarouselItem>
            <CarouselItem>{gardenImages[1]}</CarouselItem>
            <CarouselItem>{gardenImages[2]}</CarouselItem>
          </Carousel>
        </div>
      </div>
      <div className="container m-auto w-3/4 bg-gray-100 rounded-md shadow-lg text-center mt-12 p-6">
        <h1 className="font-bold text-2xl mb-10">
          Buy food from {sellerData.gardenName}
        </h1>
        {loaded
          ? sellerData.foods.map((e) => {
              return (
                <Card
                  e={e}
                  toggleAddingToCart={toggleAddingToCart}
                  setProductInformation={setProductInformation}
                />
              );
            })
          : ""}
      </div>
      <div className="container m-auto w-3/4 bg-gray-100 rounded-md shadow-lg text-center mt-12 p-6">
        <h1 className="font-bold text-2xl mb-10">Reviews</h1>
        {loaded
          ? sellerData.reviews.map((e) => {
              return <Review e={e} />;
            })
          : ""}
      </div>
      <div className="container m-auto w-3/4 bg-gray-100 rounded-md shadow-lg text-center mt-12 p-6">
        <h1 className="font-bold text-2xl mb-10">Leave a review</h1>
        <div
          className="p-6 ml-4 mr-4 rounded-md w-2/3 inline-block bg-white shadow-xl text-center"
          id="review-form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-yellow-400 mr-1 ml-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="1-formstar"
            onClick={set1Star}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-yellow-400 mr-1 ml-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="2-formstar"
            onClick={set2Star}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-yellow-400 mr-1 ml-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="3-formstar"
            onClick={set3Star}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-yellow-400 mr-1 ml-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="4-formstar"
            onClick={set4Star}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-yellow-400 mr-1 ml-1 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            id="5-formstar"
            onClick={set5Star}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <input
            type="text"
            name="title"
            autoComplete="title"
            className="w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none block m-auto focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mt-6"
            placeholder="Title..."
            id="form-review-title"
          />
          <textarea
            className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none block m-auto focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mt-6 h-44`}
            placeholder="Please mention what type of food you ordered and your experience with the transaction."
            id="form-review-body"
          ></textarea>
          <button
            className="bg-green-500 rounded-md text-white font-bold p-4 block m-auto  sm:w-1/5 lg:w-1/6 mt-6"
            onClick={submitReview}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
