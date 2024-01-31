import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

import {ShimmerProductPage} from "../../components/shimmerCard/ShimmerProductPage";

function ProductDetails() {
  //?hooks
  const params = useParams();
  const dispatch = useDispatch();
  // @ts-ignore
  const cart = useSelector((state) => state.cartReducer.cart);
  //?states

  const [product, setProduct] = useState(null);
  const productKey = params.productId;
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  //?functions
  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${productKey}&populate=images`
    );

    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [productKey]);

  return (
    <>
      {!product ? (
        <ShimmerProductPage />
      ) : (
        <div className="ProductDetails">
          <div className="container">
            <div className="product-layout">
              <div className="product-img center">
                <img
                  src={product?.attributes.images?.data.attributes.url}
                  alt="img"
                />
              </div>
              <div className="product-info">
                <h1 className="heading">{product?.attributes.title}</h1>
                <h3 className="price">₹{product?.attributes.price}</h3>
                <p className="description">{product?.attributes.desc}</p>
                <div className="cart-options">
                  <div className="quantity-selector">
                    <span
                      className="btn decrement"
                      onClick={() => dispatch(removeFromCart(product))}
                    >
                      -
                    </span>
                    <span className="quantity">{quantity}</span>
                    <span
                      className="btn increment"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      +
                    </span>
                  </div>
                  <button
                    className="btn-primary add-to-cart"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="return-policy">
                  <ul>
                    <li>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      consequatur dolorem deserunt tempora possimus?
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      commodi aperiam voluptatum, quibusdam, voluptatibus
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
