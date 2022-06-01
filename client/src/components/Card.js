import React from "react";
import {Link, useNavigate} from "react-router-dom"

const Card = ({e, toggleAddingToCart, setProductInformation}) => {
  const navigate = useNavigate()
  const addToCart = () => {
    if(document.cookie){
    setProductInformation(e)
    toggleAddingToCart(true)
    } else{
      navigate("/login")
    }
  }
  return(
  <div className="p-6 ml-4 mr-4 rounded-md w-1/5 inline-block bg-white shadow-xl">
    <img className="rounded-full w-20 m-auto mb-2" src={e.foodImage} />
    <h1 className="font-bold text-lg">{e.food}</h1>
    {e.sellMethod == "weight" ? (
      <p className="font-medium text-md mb-2">${e.price} per pound</p>
    ) : (
      <p className="font-medium text-md mb-2">${e.price} each</p>
    )}
    <Link to={"/seller/" + e.sellerId} className="block text-blue-500 font-medium mb-2 hover:text-blue-400">Seller Page</Link>

    <button className="bg-green-500 p-4 rounded-md text-white hover:bg-green-400" onClick={addToCart}>
      Add to cart!
    </button>
  </div>
  )
};

export default Card;
