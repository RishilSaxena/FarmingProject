import React, { useState, useEffect } from "react";

import "./carousel.css";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item rounded-md" style={{ width: width }}>
      <img src={children} className="w-full carouselImage rounded-md"/>
    </div>
  );
};

const Carousel = ({ children }) => {
  
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    console.log(newIndex);
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 3000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className="carousel relative rounded-md">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <span
        className="absolute top-1/2 right-2 opacity-50 hover:opacity-100 cursor-pointer text-white"
        id="rightArrow"
        onClick={() => updateIndex(activeIndex + 1)}
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
      <span
        className="absolute top-1/2 left-2 opacity-50 hover:opacity-100 cursor-pointer text-white"
        id="leftArrow"
        onClick={() => updateIndex(activeIndex - 1)}
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </span>
    </div>
  );
};

export default Carousel;
