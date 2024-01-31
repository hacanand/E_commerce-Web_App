import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import axiosClient from "../../utils/axiosClient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart({ onClose }) {
  // @ts-ignore
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });
  const isCartEmpty = cart.length === 0;

  const handleCheckOut = async () => {
    try {
      const response = await axiosClient.post("/orders", {
        products: cart,
      });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: response.data.stripeId,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose /> Close
          </div>
        </div>
        <div className="cartItem">
          {cart?.map((cart) => (
            <CartItem key={cart.key} cart={cart} />
          ))}
        </div>
        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        )}
        {!isCartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total</h3>
              <h3 className="total-value">₹{totalAmount}</h3>
            </div>
            <div
              className="checkout center btn-primary"
              onClick={handleCheckOut}
            >
              Checkout Now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
