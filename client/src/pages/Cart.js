import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

const Cart = ({ toggleLoading }) => {
  useEffect(() => {
    toggleLoading(true);

    axios.get("/api/getCart").then(function (data) {
      setCart(data.data);
      let total = 0;
      data.data.forEach((e) => {
        console.log(total + e.price * e.quantity)
        total = (total  + (e.price * e.quantity));
      })
      setTotal(total.toFixed(2))
      toggleLoading(false);
      setLoaded(true);
      console.log(data.data);
    });
  }, []);
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);

  return (
    <>
    <div className="container align-middle p-6 w-3/4 m-auto text-center">
      {loaded
        ? <>{cart.map((e) => {
            return <CartItem e={e} />;
          })}
          <h1 className="font-bold text-2xl mt-10">Subtotal: ${total}</h1></>
        : ""}
        
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md m-auto w-1/6 mt-12">Checkout</button>
    </div>
    </>
  );
};

export default Cart;
