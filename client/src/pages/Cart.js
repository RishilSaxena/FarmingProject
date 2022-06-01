import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";

const Cart = ({ toggleLoading }) => {
  useEffect(() => {
    toggleLoading(true);

    axios.get("/api/getCart").then(function (data) {
      setCart(data.data);
      toggleLoading(false);
      setLoaded(true);
      console.log(data.data);
    });
  }, []);
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="container align-middle p-6 w-3/4 m-auto">
      {loaded
        ? cart.map((e) => {
            return <CartItem e={e} />;
          })
        : ""}
    </div>
  );
};

export default Cart;
