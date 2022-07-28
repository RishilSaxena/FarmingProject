import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const foods = require("../util/foods.json");

const UpdateSellerData = ({ toggleLoading }) => {
  // xmlHTTP return blob respond
  function getImgURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  useEffect(async () => {
    setFinished(false);

    const id = await axios.get("/api/getCookie");
    setSellerId(id.data);
    axios.get("/api/getSellerData/" + id.data).then(function (data) {
      setFinished(true);
      foods.forEach((food) => {
        const option = document.createElement("option");
        option.setAttribute("value", food);
        option.innerText = food;
        document.getElementById("foodDropdown").append(option);
      });
      if (data.data.foods) {
        for (let i = 1; i < data.data.foods.length; i++) {
          const foodDiv = document.getElementById("foods");
          const input = document.getElementById("foodDropdown");
          const input2 = input.cloneNode(true);
          const priceInput = document
            .getElementById("foodPrice")
            .cloneNode(true);
          const typeOfPrice = document
            .getElementById("typeOfPrice")
            .cloneNode(true);
          const foodImage = document
            .getElementById("foodImageDiv")
            .cloneNode(true);
          const foodImagePreview = document
            .getElementById("foodImagePreview")
            .cloneNode(true);
          const foodImageError = document
            .getElementById("foodImageErrorContainer")
            .cloneNode(true);
          console.log(foodImageError);
          input2.setAttribute("id", "food" + (i + 1));
          priceInput.setAttribute("id", "foodPrice" + (i + 1));
          typeOfPrice.setAttribute("id", "typeOfPrice" + (i + 1));
          foodImage.setAttribute("id", "foodImageDiv" + (i + 1));
          foodImage.childNodes[0].setAttribute("id", "foodImage" + (i + 1));
          // console.log(foodImage.childNodes[0].value)
          // foodImage.childNodes[0].value = null
          // console.log(foodImage.childNodes[0].value)
          foodImage.childNodes[1].setAttribute(
            "id",
            "foodImage" + (i + 1) + "Text"
          );
          foodImagePreview.setAttribute(
            "id",
            "foodImage" + (i + 1) + "Preview"
          );

          foodImageError.setAttribute(
            "id",
            "foodImage" + (i + 1) + "ErrorContainer"
          );
          foodImageError.childNodes[1].setAttribute(
            "id",
            "foodImage" + (i + 1) + "Error"
          );
          priceInput.value = "";
          foodDiv.appendChild(input2);
          foodDiv.appendChild(typeOfPrice);
          foodDiv.appendChild(priceInput);
          foodDiv.appendChild(foodImageError);
          foodDiv.appendChild(foodImage);
          foodDiv.appendChild(foodImagePreview);

          document.getElementById("foodImage" + (i + 1)).onchange = checkImage;
          document.getElementById("foodImage" + (i + 1)).value = null;
          document.getElementById("foodImage" + (i + 1) + "Preview").src = "";
          document.getElementById("foodImage" + (i + 1) + "Text").textContent =
            "Drag & drop your file here or click";
        }
        setNumberOfFoods(data.data.foods.length);
      }


      if (data.data.image1) {
        getImgURL(data.data.image1, (imgBlob) => {
          let fileName = "image1.png";
          let file = new File(
            [imgBlob],
            fileName,
            { type: "image/jpeg", lastModified: new Date().getTime() },
            "utf-8"
          );
          console.log(file);
          let container = new DataTransfer();
          container.items.add(file);

          document.querySelector("#image1").files = container.files;
          document.getElementById("image1" + "Text").textContent =
            fileName + " - " + formatBytes(file.size);
          document.getElementById("image1" + "Preview").src =
            URL.createObjectURL(document.getElementById("image1").files[0]);
        });
        // const newpreloaded = preloaded;
        // newpreloaded["image1"] = data.data.image1;
        // setPreloaded(newpreloaded);
      }
      if (data.data.image2) {
        getImgURL(data.data.image2, (imgBlob) => {
          let fileName = "image2.png";
          let file = new File(
            [imgBlob],
            fileName,
            { type: "image/jpeg", lastModified: new Date().getTime() },
            "utf-8"
          );
          console.log(file);
          let container = new DataTransfer();
          container.items.add(file);

          document.querySelector("#image2").files = container.files;
          document.getElementById("image2" + "Text").textContent =
            fileName + " - " + formatBytes(file.size);
          document.getElementById("image2" + "Preview").src =
            URL.createObjectURL(document.getElementById("image2").files[0]);
        });
      }
      if (data.data.image3) {
        getImgURL(data.data.image3, (imgBlob) => {
          let fileName = "image3.png";
          let file = new File(
            [imgBlob],
            fileName,
            { type: "image/jpeg", lastModified: new Date().getTime() },
            "utf-8"
          );
          console.log(file);
          let container = new DataTransfer();
          container.items.add(file);

          document.querySelector("#image3").files = container.files;
          document.getElementById("image3" + "Text").textContent =
            fileName + " - " + formatBytes(file.size);
          document.getElementById("image3" + "Preview").src =
            URL.createObjectURL(document.getElementById("image3").files[0]);
        });
      }

      console.log(data.data);
      if (data.data.gardenName) {
        document.getElementById("gardenName").value = data.data.gardenName;
      }
      if (data.data.bio) {
        document.getElementById("bio").value = data.data.bio;
      }

      if (data.data.foods) {
        document.getElementById("foodDropdown").selectedIndex =
          foods.indexOf(data.data.foods[0].food) + 1;
        if (data.data.foods[0].sellMethod == "weight") {
          document.getElementById("typeOfPrice").selectedIndex = 1;
        } else {
          document.getElementById("typeOfPrice").selectedIndex = 2;
        }
        document.getElementById("foodPrice").value = data.data.foods[0].price;
        getImgURL(data.data.foods[0].foodImage, (imgBlob) => {
          let fileName = data.data.foods[0].food + ".png";
          let file = new File(
            [imgBlob],
            fileName,
            { type: "image/jpeg", lastModified: new Date().getTime() },
            "utf-8"
          );
          console.log(file);
          let container = new DataTransfer();
          container.items.add(file);

          document.getElementById("foodImage").files = container.files;
          document.getElementById("foodImage" + "Text").textContent =
            fileName + " - " + formatBytes(file.size);
          document.getElementById("foodImage" + "Preview").src =
            URL.createObjectURL(document.getElementById("foodImage").files[0]);
        });

        for (let i = 1; i < data.data.foods.length; i++) {
          getImgURL(data.data.foods[i].foodImage, (imgBlob) => {
            let fileName = data.data.foods[i].food + ".png";
            let file = new File(
              [imgBlob],
              fileName,
              { type: "image/jpeg", lastModified: new Date().getTime() },
              "utf-8"
            );

            let container = new DataTransfer();
            container.items.add(file);
            console.log(i + 1);
            document.getElementById("foodImage" + (i + 1)).files =
              container.files;
            document.getElementById(
              "foodImage" + (i + 1) + "Text"
            ).textContent = fileName + " - " + formatBytes(file.size);
            document.getElementById("foodImage" + (i + 1) + "Preview").src =
              URL.createObjectURL(
                document.getElementById("foodImage" + (i + 1)).files[0]
              );
            console.log(document.getElementById("food" + (i + 1)));
            document.getElementById("food" + (i + 1)).selectedIndex =
              foods.indexOf(data.data.foods[i].food) + 1;
            if (data.data.foods[i].sellMethod == "weight") {
              document.getElementById(
                "typeOfPrice" + (i + 1)
              ).selectedIndex = 1;
            } else {
              document.getElementById(
                "typeOfPrice" + (i + 1)
              ).selectedIndex = 2;
            }
            document.getElementById("foodPrice" + +(i + 1)).value =
              data.data.foods[i].price;
          });
        }
      }
    });
  }, []);
  const navigate = useNavigate();
  const [numberOfFoods, setNumberOfFoods] = useState(1);
  const [sellerId, setSellerId] = useState("");
  const [preloaded, setPreloaded] = useState({});
  const [finished, setFinished] = useState(false);

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
        sellerId: sellerId,
        gardenName: res.gardenName,
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
        sellerId: sellerId,
        gardenName: res.gardenName,
      });
    }
    let imageUrl1 = "";
    let imageUrl2 = "";
    let imageUrl3 = "";
    if (
      document.getElementById("image1") &&
      document.getElementById("image1").files[0]
    ) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: document.getElementById("image1").files[0],
      });

      imageUrl1 = data.data.split("?")[0];
    }

    if (
      document.getElementById("image2") &&
      document.getElementById("image2").files[0]
    ) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: document.getElementById("image2").files[0],
      });

      imageUrl2 = data.data.split("?")[0];
    }

    if (
      document.getElementById("image3") &&
      document.getElementById("image3").files[0]
    ) {
      const data = await axios.get("/api/s3Url");
      await fetch(data.data, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: document.getElementById("image3").files[0],
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
        toggleLoading(false);
        navigate("/seller/" + sellerId);
      });
  };

  const addFood = () => {
    console.log(numberOfFoods);
    setNumberOfFoods(numberOfFoods + 1);
    console.log(numberOfFoods);
    const foodDiv = document.getElementById("foods");
    const input = document.getElementById("foodDropdown");
    const input2 = input.cloneNode(true);
    const priceInput = document.getElementById("foodPrice").cloneNode(true);
    const typeOfPrice = document.getElementById("typeOfPrice").cloneNode(true);
    const foodImage = document.getElementById("foodImageDiv").cloneNode(true);
    const foodImagePreview = document
      .getElementById("foodImagePreview")
      .cloneNode(true);
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
    foodImage.childNodes[1].setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1) + "Text"
    );
    foodImagePreview.setAttribute(
      "id",
      "foodImage" + (numberOfFoods + 1) + "Preview"
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
    foodDiv.appendChild(foodImagePreview);

    document.getElementById("foodImage" + (numberOfFoods + 1)).onchange =
      checkImage;
    document.getElementById("foodImage" + (numberOfFoods + 1)).value = null;
    document.getElementById("foodImage" + (numberOfFoods + 1) + "Preview").src =
      "";
    document.getElementById(
      "foodImage" + (numberOfFoods + 1) + "Text"
    ).textContent = "Drag & drop your file here or click";
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
    console.log(e);
    if (e.target) {
      if (!e.target.files[0]) {
        document.getElementById(e.target.id + "Text").textContent =
          "Drag & drop your file here or click";
        document.getElementById(e.target.id + "Preview").src = "";
      } else {
        if (e.target.files[0].size > 2000000) {
          document.getElementById(e.target.id + "Error").textContent =
            "File size too large.";
        } else {
          document.getElementById(e.target.id + "Text").textContent =
            e.target.files[0].name +
            " - " +
            formatBytes(e.target.files[0].size);
          document.getElementById(e.target.id + "Preview").src =
            URL.createObjectURL(document.getElementById(e.target.id).files[0]);
        }
      }
    }
  };
  function changePreloaded(input) {
    setFinished(false);
    let newpreloaded = preloaded;
    newpreloaded[input] = null;
    setPreloaded(newpreloaded);
    console.log("changed");
    setFinished(true);
  }
  return finished ? (
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
          id="gardenName"
          autoComplete="gardenName"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.gardenName
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake mb-6`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none mb-10`
          }`}
          placeholder="Garden name..."
          {...register("gardenName", { required: true, minLength: 3 })}
        />
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

        <p className="error font-medium text-sm w-2/3">
          Upload first image of your garden(optional) - must be smaller than 2
          MB
          <span
            className="text-red-600 animate-shake ml-4"
            id="image1Error"
          ></span>
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            id="image1"
            onClick={checkImage}
            onChange={checkImage}
            accept="image/*"
          />

          <div
            className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2"
            id="image1Text"
          >
            Drag & drop your file here or click
          </div>
        </div>

        <img className="w-1/2 m-auto mb-10" id="image1Preview" src="" />
        <p className="error font-medium text-sm w-2/3">
          Upload first image of your garden(optional) - must be smaller than 2
          MB
          <span
            className="text-red-600 animate-shake ml-4"
            id="image2Error"
          ></span>
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            id="image2"
            onClick={checkImage}
            onChange={checkImage}
            accept="image/*"
          />

          <div
            className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2"
            id="image2Text"
          >
            Drag & drop your file here or click
          </div>
        </div>

        <img className="w-1/2 m-auto mb-10" id="image2Preview" src="" />

        <p className="error font-medium text-sm w-2/3">
          Upload first image of your garden(optional) - must be smaller than 2
          MB
          <span
            className="text-red-600 animate-shake ml-4"
            id="image3Error"
          ></span>
        </p>
        <div className="group relative border-2 rounded-xl border-gray-300 bg-blue-50/50 h-32 transition hover:bg-blue-50 w-2/3 m-auto mt-2 mb-10">
          <input
            className="z-10 absolute w-full h-full opacity-0 cursor-pointer"
            type="file"
            id="image3"
            onClick={checkImage}
            onChange={checkImage}
            accept="image/*"
          />

          <div
            className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2"
            id="image3Text"
          >
            Drag & drop your file here or click
          </div>
        </div>

        <img className="w-1/2 m-auto mb-10" id="image3Preview" src="" />

        {/* <p className="error font-medium text-sm w-2/3">
          Upload third image of your garden(optional) - must be smaller than 2
          MB
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
          <div className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2 align-middle">
            {watch("image3")
              ? !watch("image3")[0]
                ? "Drag & drop your file here or click"
                : `${
                    watch("image3")[0].name +
                    " - " +
                    formatBytes(watch("image3")[0].size)
                  }`
              : "Drag & drop your file here or click"}
          </div>
        </div> */}

        <h1 className="text-lg font-bold text-center mb-6">Add Food</h1>
        <hr className="mb-10 w-3/4 m-auto border-t-2 rounded-lg border-black" />

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
        <p
          className="error font-medium text-sm w-2/3"
          id="foodImageErrorContainer"
        >
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
          <div
            className="text-center  w-full h-full text-slate-500 flex flex-col items-center justify-center space-y-2"
            id="foodImageText"
          >
            Drag & drop your file here or click
            {/* <span className="w-full overflow-hidden whitespace-nowrap text-ellipsis p-1">
                  {watch("image1")[0].name +
                    " - " +
                    formatBytes(watch("image1")[0].size)}
                </span> */}
          </div>
        </div>
        <img className="w-1/2 m-auto mb-10" id="foodImagePreview" src="" />
        <div id="foods"></div>

        <a
          className="m-auto bg-gray-300 rounded-md text-black font-normal p-2 block lg:w-1/4 md:w-1/3 sm:w-1/2 w-2/3 text-center cursor-pointer mb-10"
          onClick={addFood}
        >
          + Add another food
        </a>
        <button
          type="submit"
          className="bg-green-500 rounded-md text-white font-medium p-4 block m-auto mt-8 sm:w-1/3 lg:w-1/4"
        >
          Continue
        </button>
      </form>
    </div>
  ) : (
    ""
  );
};

export default UpdateSellerData;
