import { Route, Routes } from "react-router-dom";
import Categories from "./components/category/Categories";
import Navbar from "./components/navbar/Navbar";
import React, { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productDetails/ProductDetails";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/categorySlice";
import Payment from "./components/payment/Payment";
 
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
   // @ts-ignore
   dispatch(fetchCategories())

  });
    
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId?" element={<Categories />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/payment/:status" element={<Payment />} />
        <Route path="/products/:status" element={<Payment />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
