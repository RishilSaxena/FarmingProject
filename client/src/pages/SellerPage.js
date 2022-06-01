import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Carousel, { CarouselItem } from "../components/Carousel";

const SellerPage = ({toggleLoading, toggleAddingToCart, setProductInformation}) => {
  const { id } = useParams();
  const [sellerData, setSellerData] = useState({});
  const [gardenImages, setGardenImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    toggleLoading(true)
    axios.get("/api/getSellerData/" + id).then(function (data) {
      toggleLoading(false)
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
 

  return (
    <div className="container m-auto p-4 shadow-lg mt-8 rounded-md">
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
                <Card e={e} toggleAddingToCart={toggleAddingToCart} setProductInformation={setProductInformation}/>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SellerPage;
