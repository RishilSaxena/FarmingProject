import "./index.css";
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdateSellerData from "./pages/UpdateSellerData";
import SellerPage from "./pages/SellerPage";
import Carousel, {CarouselItem} from "./components/Carousel";
import LoadingModal from "./components/LoadingModal";
import AddToCartModal from "./components/AddToCartModal";
import Cart from "./pages/Cart"


function App() {
  const [loading, setLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [productInformation, setProductInformation] = useState({})
  
  const toggleLoading = (bool) => {
    setLoading(bool)
  }
  const toggleAddingToCart = (bool) => {
    setAddingToCart(bool)
  }
  
  
  return(
    <>

    <Router>
      <Navbar/>
      
      <div className={loading || addingToCart? "opacity-20" : ""}>
      

      <Switch>
        <Route exact path="/" element={<Home toggleLoading={toggleLoading} setProductInformation={setProductInformation} toggleAddingToCart={toggleAddingToCart}/>}/>
        <Route path="/login" element={<Login toggleLoading={toggleLoading}/>}/>
        <Route path="/register" element={<Register toggleLoading={toggleLoading}/>}/>
        <Route path="/updateSellerData" element={<UpdateSellerData toggleLoading={toggleLoading}/>}/>
        <Route path="/seller/:id" element={<SellerPage toggleLoading={toggleLoading} setProductInformation={setProductInformation} toggleAddingToCart={toggleAddingToCart}/>}/>
        <Route path="/cart" element={<Cart toggleLoading={toggleLoading}/>}/>
      </Switch>
      </div>
      {loading ? <LoadingModal/> : ""}
      {addingToCart ? <AddToCartModal productInformation={productInformation} toggleAddingToCart={toggleAddingToCart}/> : ""}
      
    </Router>
    </>
    /*
    
    */
  //  <>
  //  <Carousel>
  //    <CarouselItem>Item 1</CarouselItem>
  //    <CarouselItem>Item 2</CarouselItem>
  //    <CarouselItem>Item 3</CarouselItem>
  //  </Carousel>
  //  </>
  )
}

export default App;




