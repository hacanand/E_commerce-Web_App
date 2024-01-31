import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);

  // @ts-ignore
  const cart = useSelector((state) => state.cartReducer.cart);
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });
  // @ts-ignore
  const categories = useSelector((state) => state.categoryReducer.categories);
  //console.log(categories);
  return (
    <>
      <nav className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {categories.map((category) => (
                <li className="hover-link" key={category.id}>
                  <Link to={`/category/${category.attributes.key}`}>
                    {category.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">Posterz</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div
              className="nav-cart hover-link"
              onClick={() => setOpenCart(!openCart)}
            >
              <BsCart2 className="icon " />
              <span className="cart-count center">{cartCount} </span>
            </div>
          </div>
        </div>
      </nav>
      {openCart && <Cart onClose={() => setOpenCart(false)} />}
    </>
  );
}

export default Navbar;
