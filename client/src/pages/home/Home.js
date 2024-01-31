import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import "./Home.scss";
// @ts-ignore
import Category from "../../components/category/Category";
import Product from "../../components/product/Product";
import axiosClient from "../../utils/axiosClient";
import { useSelector } from "react-redux";
 
 
function Home() {
 
  const [topProducts, setTopProducts] = useState(null);
   // @ts-ignore
   const categories = useSelector((state) => state.categoryReducer.categories);
   
  async function fetchData() {
     
    const topProductsResponse = await axiosClient.get(
      "/products?filters[isTopPic][$eq]=true&populate=images"
    );
   // setCategories(categoryResponse.data.data);
    setTopProducts(topProductsResponse.data.data);
    
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2>Shop By Categories</h2>
          <p className="subheading">
            Shop from the best,our Film and TV Posters Collection.
          </p>
        </div>
        <div className="content">
          
            { categories?.map((category) => (
            <Category key={category.id} category={category} />
            ))
          }
        
          
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2>Our Top Picks</h2>
          <p className="subheading">
            All New Designs,from the best artists around the world.
          </p>
        </div>
        <div className="content">
          {topProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
