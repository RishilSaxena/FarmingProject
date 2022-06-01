import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./register.css";
import Fuse from "fuse.js";
import Card from "../components/Card";
import axios from "axios";
// const NodeGeocoder = require("node-geocoder");

const Home = ({toggleLoading, toggleAddingToCart, setProductInformation}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [fuseSearchResults, setFuseSearchResults] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState(false);

  // Replace with your mapquest consumer API key
  // const options = {
  //   provider: "mapquest",
  //   apiKey: "rTSV5zJGQY6Z3SKclDUwctjlaxexcCri",
  // };

  // // Create a geocoder object that can query the mapquest API
  // const geocoder = NodeGeocoder(options);

  useEffect(async () => {
    axios.get("/api/getAllProducts").then(async function (data) {
      setProducts(data.data);
      console.log(document.cookie.id)
      // const res = await geocoder.geocode("28270")

    });
  }, []);

  const changeSearch = async (e) => {
    const fuse = new Fuse(products, {
      keys: ["food"],
    });
    if(e.target.id === "search") {
      console.log("hi")
      if (e.target.value.length > 2) {
        setFuseSearchResults(fuse.search(e.target.value));
      } else{
        setFuseSearchResults(null)
      }
      if (!e.target.value) {
        setFuseSearchResults(null);
      }
    } else if (e.target.id === "zipcode" && e.target.value.length == 5) { 
      console.log(e.target.value)
      toggleLoading(true)
      const zipcodes = await axios.get("/api/findZipcodesNearby/" + e.target.value )
      
      console.log(zipcodes.data)
      let currentResults = []
      
      if(fuseSearchResults){
        currentResults = fuseSearchResults;
        
      } else {
        currentResults = products
      }
      console.log(currentResults)
      const updatedResults = [];
      zipcodes.data.forEach((zipcode) => {
        currentResults.forEach((result) => {
          if(result.zipcode == zipcode){
            updatedResults.push({item: result})
          }
        })
      })
      
      setFuseSearchResults(updatedResults)
      toggleLoading(false)
      

    } else{
      setFuseSearchResults(null)
    }
  };
  const toggleAdvancedFilters = () => {
    setAdvancedFilters(!advancedFilters);
  };
  // const search = () => {
  //   fuseSearchResults.forEach(e=>{

  //   })

  // }

  return (
    <>
      {/* <div className="w-full">
      <div className="landing-image relative">
        <img
          className="w-full opacity-60"
          src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/3/29/0/shutterstock_Irina-Fischer_491150020_garden-design.jpg.rend.hgtvcom.1280.853.suffix/1522338145651.jpeg"
        />
        <h1 className="absolute bottom-1/2 left-1/4 text-8xl text-black font-bold w-1/2 text-center m-auto animate-fadeIn">Welcome to the future of food!</h1>
      </div>
    </div> */}
      <div className="container bg-white rounded-md shadow-lg p-4 mt-6 m-auto">
        <h1 className="text-center font-bold text-xl mb-10">
          Check out some of your local farmers' goods!
        </h1>

        {/* <p className="error font-medium text-red-500">
          {errors.search ? "Invalid username." : ""}
        </p> */}
        <input
          type="text"
          name="search"
          autoComplete="search"
          id="search"
          className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-1 block m-auto ${
            errors.search
              ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake`
              : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none`
          }`}
          placeholder="Search a food..."
          onChange={changeSearch}
        />
        {advancedFilters ? (
          <input
            type="text"
            name="zipcode"
            autoComplete="zipcode"
            id="zipcode"
            className={`w-2/3 border-2 border-gray-300 rounded-md p-2 outline-none mt-8 block m-auto ${
              errors.zipcode
                ? `ring-2 ring-red-500 border-none outline-none bg-red-300 animate-shake`
                : `focus:ring-2 focus:ring-blue-700 focus:border-none focus:outline-none`
            }`}
            placeholder="Enter a zipcode..."
            onChange={changeSearch}
          />
        ) : (
          ""
        )}
        <a
          className="text-blue-500 font-medium cursor-pointer hover:text-blue-700 error mb-10 display-block"
          onClick={toggleAdvancedFilters}
        >
          {!advancedFilters
            ? "Show advanced filters..."
            : "Hide advanced filters..."}
        </a>

        {/* <button className="bg-green-500 rounded-md text-white font-bold p-4 block m-auto  sm:w-1/6 lg:w-1/12 float-none">
          Search!
        </button> */}
        <div className="mt-10 text-center" id="foods">
          {fuseSearchResults
            ? fuseSearchResults.length > 0
              ? fuseSearchResults.map((e) => <Card e={e.item} toggleAddingToCart={toggleAddingToCart} setProductInformation={setProductInformation}/>)
              : "No results found."
            : products.map((e) => <Card e={e} toggleAddingToCart={toggleAddingToCart} setProductInformation={setProductInformation}/>)}
        </div>
      </div>
    </>
  );
};

export default Home;
