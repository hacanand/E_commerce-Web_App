import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Product from "../product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosClient from "../../utils/axiosClient";
 

function Categories() {
  const navigate = useNavigate();
  const params = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState();
  const [productsAll, setProductsAll] = useState();
  // @ts-ignore
  const categories = useSelector((state) => state.categoryReducer.categories);

  const sortOptions = [
    {
      value: "Price Low-to-High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];
  const [sortKey, setSortKey] = useState(sortOptions[0].sort);

  async function fetchProductsAll() {
    const responseAll = await axiosClient.get(
      `products?populate=images&sort=${sortKey}`
    );
    setProductsAll(responseAll.data.data);
    console.log(responseAll.data.data);
  }
  async function fetchProducts() {
    const response = await axiosClient.get(
      `products?populate=images &filters[category][key][$eq]=${params.categoryId}&sort=${sortKey}`
    );
    setProducts(response.data.data);
  }
  useEffect(() => {
    fetchProducts();
    setCategoryId(params.categoryId);
    fetchProductsAll();
  
  }, [params, sortKey]);
  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }
  function updateCategoryAll() {
    navigate(`/category/all`);
  }

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore our exclusive collection of Artwork and Prints</h2>
            <p>
              India's largest selection of Artwork and Prints, curated by our
              experts
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <h3 className="sort-by-text">Sort By</h3>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortKey(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.sort} value={option.sort}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              <div className="filter-radio">
                <input
                  name="category"
                  type="radio"
                  id="all"
                  value="all"
                  onChange={updateCategoryAll}
                  checked={params.categoryId === 'all'}
                />
                <label htmlFor="all">All</label>
                {categories.map((item) => (
                  <div key={item.id} className="filter-radio">
                    <input
                      name="category"
                      type="radio"
                      value={item.attributes.key}
                      id={item.id}
                      onChange={updateCategory}
                      checked={categoryId === item.attributes.key}
                    />
                    <label htmlFor={item.id}> {item.attributes.title}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-box">
            {
              // @ts-ignore
            params.categoryId === 'all' ?
              // @ts-ignore
              productsAll?.map((product) => (
                <Product key={product.id} product={product} />
              ))
            :
               // @ts-ignore
               products?.map((product) => (
                <Product key={product.id} product={product} />
              ))
              
             
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
