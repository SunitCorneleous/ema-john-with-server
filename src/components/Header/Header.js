import React, { useContext } from "react";
import "./Header.css";
import Logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="header">
      <img src={Logo} alt="logo" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/order">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>
        {user?.uid ? (
          <button className="btn-logout" onClick={logOut}>
            Log out
          </button>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
