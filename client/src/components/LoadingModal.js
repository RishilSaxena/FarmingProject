import React, { useEffect, useState } from "react";

const LoadingModal = () => {
  const [fullWidth, setFullWidth] = useState("");
  const [fullHeight, setFullHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  useEffect(() => {
    const width = document.body.clientWidth;
    const height = window.innerHeight;
    console.log(height);
    setFullHeight(height);
    setFullWidth(width);
    if (width > 1000) {
      setImageWidth(width / 5);
    } else if (width > 500) {
      setImageWidth(width / 4);
    } else {
      setImageWidth(width / 3);
    }
  });
  return (
    <div
      className="fixed  bg-white p-6  rounded  text-center shadow-2xl "
      style={{
        width: imageWidth,
        height: imageWidth,
        left: (fullWidth - imageWidth) / 2,
        top: (fullHeight - imageWidth) / 2,
      }}
    >
      <img
        src="https://media1.giphy.com/media/LndZSrI2keY5N5N1II/giphy.gif?cid=6c09b952c35422f8996bda302f7b08f234e88be8a3e62d67&rid=giphy.gif&ct=s"
        className="h-full w-full"
      />
    </div>
  );
};

export default LoadingModal;
