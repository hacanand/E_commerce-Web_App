import React from "react";
import "./Footer.scss";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
// @ts-ignore
import pngwing from "../../assets/pngwing.com.png";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow Us</h3>
            <ul className="follow">
              <li className="hover-link center">
                <AiOutlineInstagram />
              </li>
              <li className="hover-link center">
                <AiOutlineFacebook />
              </li>

              <li className="hover-link center">
                <AiOutlineTwitter />
              </li>
              <li className="hover-link center">
                <AiOutlineYoutube />
              </li>
              <li className="hover-link center">
                <AiOutlineWhatsApp />
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-lin">Contact Us</li>
              <li className="hover-lin">Privacy Policy</li>
              <li className="hover-lin">Returns and Exchange Policy</li>
              <li className="hover-lin">Shipping Policy</li>
              <li className="hover-lin">Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="subfooter">
          <div className="credit-card-icon">
            <img src={pngwing} alt="Paypal" />
          </div>
          <p>
            Copyright © {new Date().getFullYear()} <strong>Posterz</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
