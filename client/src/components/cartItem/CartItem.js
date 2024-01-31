import React from "react";
import "./CartItem.scss";
// @ts-ignore
 
import { AiOutlineClose } from "react-icons/ai";
import { addToCart, makeItemZero, removeFromCart } from "../../redux/cartSlice";
import { useDispatch  } from "react-redux";
 

function CartItem({cart}) {
  const dispatch = useDispatch();
  
  // @ts-ignore
 
  return (
    <div className="CartItem">
      <div className="item-img">
        <img src={cart.image} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="item-info">
          <p className="title">{cart.title}</p>
          <p className="price">₹{cart.price}</p>
          <div className="quantity-selector">
            <span
              className="btn decrement"
              onClick={() => dispatch(removeFromCart(cart))}
            >
              -
            </span>
            <span className="quantity">{cart.quantity}</span>
            <span
              className="btn increment"
              onClick={() => dispatch(addToCart(cart))}
            >
              +
            </span>
          </div>
          <p className="total-price ">Subtotal ₹{cart.quantity * cart.price}</p>
        </div>
        <div className="item-remove ">
          <div className="icon" onClick={() => dispatch(makeItemZero(cart))}>
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
