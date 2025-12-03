import React from "react";
import { Link } from "react-router-dom";
import "./Index.css";
// Substitua pelo caminho do seu ícone de ajuda
import helpIcon from "../../components/Sidenav/iconsSideBar/home.png"; 

function ButtonFAQ() {
  return (
    <Link to="/ajuda" className="floating-faq-btn">
      {/* <img src={helpIcon}className="faq-icon" /> */}
      <span>Ajuda</span>
    </Link>
  );
}

export default ButtonFAQ;