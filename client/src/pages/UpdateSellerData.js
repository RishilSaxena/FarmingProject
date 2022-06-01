import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const foods = require("../util/foods.json");

const UpdateSellerData = ({toggleLoading}) => {
  useEffect(async () => {
    foods.forEach((food) => {
      const option = document.createElement("option");
      option.setAttribute("value", food);
      option.innerText = food;
      document.getElementById("foodDropdown").append(option);
      
    });
    const id = await axios.get("/api/getCookie")
    setSellerId(id.data)
    
    
  }, []);
  const navigate = useNavigate();
  const [numberOfFoods, setNumberOfFoods] = useState(1);
  const [sellerId, setSellerId] = useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (res) => {
    toggleLoading(true);
    const data = await axios.get("/api/s3Url");
    await fetch(data.data, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: document.getElementById("foodImage").files[0],
    });

    const foodImage = data.data.split("?")[0];
    const foods = [
      {
        food: document.getElementById("foodDropdown").value,
        sellMethod: document.getElementById("typeOfPrice").value,
        price: document.getElementById("foodPrice").value,
        foodImage: foodImage,
        sellerId: sellerId
      },
    ];
    for (let i = 2; i < numberOfFoods + 1; i++) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: document.getElementById("foodImage" + i).files[0],
      });

      const foodImage = data.data.split("?")[0];
      foods.push({
        food: document.getElementById("food" + i).value,
        sellMethod: document.getElementById("typeOfPrice" + i).value,
        price: document.getElementById("foodPrice" + i).value,
        foodImage: foodImage,
        sellerId: sellerId
      });
    }
    let imageUrl1 = ""
    let imageUrl2= ""
    let imageUrl3 = ""
    if (res.image1 && res.image1[0]) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: res.image1[0],
      });

      imageUrl1 = data.data.split("?")[0];
    }

    if (res.image2 && res.image2[0]) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: res.image2[0],
      });

      imageUrl2 = data.data.split("?")[0];
    }

    if (res.image3 && res.image3[0]) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: res.image3[0],
      });

      imageUrl3 = data.data.split("?")[0];
    }

    axios
      .post("/api/updateSellerData", {
        foods: foods,
        bio: res.bio,
        gardenName: res.gardenName,
        image1: imageUrl1,
        image2: imageUrl2,
        image3: imageUrl3,
      })
      .then(function (data) {
        toggleLoading(false)
        navigate("/");
      });
  };
  

  const addFood = () => {
    console.log(watch("image1"));
    setNumberOfFoods(numberOfFoods + 1);
    const foodDiv = document.getElementById("foods");
    const input = document.getElementById("foodDropdown");
    const input2 = input.cloneNode(true);
    const priceInput = document.getElementById("foodPrice").cloneNode(true);
    const typeOfPrice = document.getElementById("typeOfPrice").cloneNode(true);
    const foodImage = document.getElementById("foodImageDiv").cloneNode(true);
    const foodImageError = document
      .getElementById("foodImageErrorContainer")
      .cloneNode(true);
    console.log(foodImageError);
    input2.setAttribute("id", "food" + (numberOfFoods + 1));
    priceInput.setAttribute("id", "foodPrice" + (numberOfFoods + 1));
    typeOfPrice.setAttribute("id", "typeOfPrice" + (numberOfFoods + 1));
    foodImage.setAttribute("id", "foodImageDiv" + (numberOfFoods + 1));
    foodImage.childNodes[0].setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1)
    );
    // console.log(foodImage.childNodes[0].value)
    // foodImage.childNodes[0].value = null
    // console.log(foodImage.childNodes[0].value)
    foodImage.childNodes[1].childNodes[0].setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1) + "Text"
    );
    foodImageError.setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1) + "ErrorContainer"
    );
    foodImageError.childNodes[1].setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1) + "Error"
    );
    priceInput.value = "";
    foodDiv.appendChild(input2);
    foodDiv.appendChild(typeOfPrice);
    foodDiv.appendChild(priceInput);
    foodDiv.appendChild(foodImageError);
    foodDiv.appendChild(foodImage);

    document.getElementById("foodImage" + (numberOfFoods + 1)).onchange =
      checkImage;
    document.getElementById("foodImage" + (numberOfFoods + 1)).value = null;
    document.getElementById("foodImage" + (numberOfFoods + 1) + "Text").textContent = "Drag & drop your file here or click"
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const checkImage = (e) => {
    if (e.target) {
      if (!e.target.files[0]) {
        document.getElementById(e.target.id + "Text").textContent = "hi";
      } else {
        if (e.target.files[0].size > 2000000) {
          document.getElementById(e.target.id + "Error").textContent =
            "File size too large.";
        } else {
          document.getElementById(e.target.id + "Text").textContent =
            e.target.files[0].name +
            " - " +
            formatBytes(e.target.files[0].size);
        }
      }
    }
  };
  return (
    <div className="container lg:w-1/2 md:w-2/3 sm:w-3/4 w-3/4 m-auto mt-10 ">
      <form
        className="bg-white filter drop-shadow-md rounded p-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-bold mb-10 text-center">
          Update Seller Data
        </h1>
        <p className="error font-medium text-red-500">
          {errors.gardenName ? "Garden name must be longer." : ""}
        </p>

        <input
          type="text"
          name="gardenName"
          autoComplete="gardenName"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.gardenName
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Garden name..."
          {...register("gardenName", { required: true, minLength: 3 })}
        />
        {/* <input
          type="text"
          name="food1"
          id="foodInput"
          autoComplete="food1"
          spellCheck="true"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.food1
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Food that you want to sell..."
          {...register("food1", { required: true, minLength: 3 })}
        /> */}

        <select
          id="foodDropdown"
          className="border-2 p-2 border-gray-300 w-2/3 block m-auto rounded-md mb-10 focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none"
        >
          <option hidden selected className="text-gray-400">
            Choose a food that you want to sell...
          </option>
        </select>
        <select
          id="typeOfPrice"
          className="border-2 border-gray-300 p-2 w-2/3 block m-auto rounded-md mb-10 focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none"
        >
          <option hidden selected className="text-gray-400">
            How are you selling this product?
          </option>
          <option value="weight">By weight (per pound)</option>
          <option value="unit">By unit</option>
        </select>
        <input
          type="text"
          name="price"
          autoComplete="price"
          id="foodPrice"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${`focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`}`}
          placeholder="Price in USD (ex: 13.99)"
        />
        <p className="error font-medium text-sm w-2/3" id="foodImageErrorContainer">
          Upload image of your food - must be smaller than 2 MB
          <span className="text-red-600 animate-shake ml-4 foodImageError"></span>
        </p>
        <div
          className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10"
          id="foodImageDiv"
        >
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            id="foodImage"
            type="file"
            accept="image/*"
            onChange={checkImage}
          />
          <div className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2">
            <span
              className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1"
              id="foodImageText"
            >
              Drag & drop your file here or click
            </span>
            {/* <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  {watch("image1")[0].name +
                    " - " +
                    formatBytes(watch("image1")[0].size)}
                </span> */}
          </div>
        </div>
        <div id="foods"></div>

        <a
          className="m-auto bg-gray-300 rounded-md text-black font-normal p-2 block lg:w-1/4 md:w-1/3 sm:w-1/2 w-2/3 text-center cursor-pointer mb-10"
          onClick={addFood}
        >
          + Add another food
        </a>
        <p className="error font-medium text-red-500">
          {errors.bio ? "Bio must be longer." : ""}
        </p>
        <textarea
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.bio
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          {...register("bio", { required: true, minLength: 10 })}
          id="bio"
          placeholder="Write a bio..."
        ></textarea>
        <p className="error font-medium text-sm w-2/3">
          Upload first image of your garden(optional) - must be smaller than 2 MB
          {errors.image1 ? (
            <span className="text-red-600 animate-shake ml-4">
              {" "}
              File size too large.
            </span>
          ) : (
            ""
          )}
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            {...register("image1", {
              validate: () => {
                return watch("image1")[0].size < 2000000;
              },
            })}
          />
          <div className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2">
            {watch("image1") ? (
              !watch("image1")[0] ? (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  Drag & drop your file here or click
                </span>
              ) : (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  {watch("image1")[0].name +
                    " - " +
                    formatBytes(watch("image1")[0].size)}
                </span>
              )
            ) : (
              <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                Drag & drop your file here or click
              </span>
            )}
          </div>
        </div>
        <p className="error font-medium text-sm w-2/3">
          Upload second image of your garden(optional) - must be smaller than 2 MB
          {errors.image2 ? (
            <span className="text-red-600 animate-shake ml-4">
              {" "}
              File size too large.
            </span>
          ) : (
            ""
          )}
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            {...register("image2", {
              validate: () => {
                return watch("image2")[0].size < 2000000;
              },
            })}
          />
          <div className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2">
            {watch("image2") ? (
              !watch("image2")[0] ? (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  Drag & drop your file here or click
                </span>
              ) : (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  {watch("image2")[0].name +
                    " - " +
                    formatBytes(watch("image2")[0].size)}
                </span>
              )
            ) : (
              <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                Drag & drop your file here or click
              </span>
            )}
          </div>
        </div>
        <p className="error font-medium text-sm w-2/3">
          Upload third image of your garden(optional) - must be smaller than 2 MB
          {errors.image3 ? (
            <span className="text-red-600 animate-shake ml-4">
              {" "}
              File size too large.
            </span>
          ) : (
            ""
          )}
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            {...register("image3", {
              validate: () => {
                return watch("image3")[0].size < 2000000;
              },
            })}
          />
          <div className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2">
            {watch("image3") ? (
              !watch("image3")[0] ? (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  Drag & drop your file here or click
                </span>
              ) : (
                <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  {watch("image3")[0].name +
                    " - " +
                    formatBytes(watch("image3")[0].size)}
                </span>
              )
            ) : (
              <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                Drag & drop your file here or click
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 rounded-md text-white font-medium p-4 block m-auto mt-8 sm:w-1/3 lg:w-1/4"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UpdateSellerData;
