import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import "./Payment.scss";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

function Payment() {
    
  const params = useParams();
    const status = params.status;
    const dispatch = useDispatch();
  const infoData = {
    success: {
      message: "Payment Successful! Your order will be delivered soon!",
      cta: "shop more",
      icon: <BsFillCartCheckFill />,
    },
    failure: {
      message: "Payment Failed! Please try again!",
      cta: "Try Again", 
      icon: <BiErrorCircle />,
    },
    };
    if(status==="success"){
        dispatch(resetCart())
    }

  return (
    <div className="Payment">
<div className="icon"> {infoData[status].icon}</div>
      <h3 className="message">{infoData[status].message}</h3>
    <button className="btn-primary">{infoData[status].cta}</button>
    </div>
  );
}

export default Payment;
