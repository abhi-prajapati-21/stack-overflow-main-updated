import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import logo from "../../assets/logo.png";
import "../Navbar/navbar.css";
import searchLogo from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import { useCurrentUser, useLogout } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
  }, [user]);

  const handleLogOut = () => {
    logout();
  };

  return (
    <nav>
      <div className="navbar">
        {/* <button className="slide-in-icon" onClick={() => handleSlideIn()}>
          <img src={bars} alt="bars" width="15" />
        </button> */}
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="stackOverflow logo" />
          </Link>
          <Link to="/About" className="nav-item nav-btn res-nav">
            About
          </Link>
          <Link to="/Products" className="nav-item nav-btn res-nav">
            Products
          </Link>
          <Link to="/ForTeams" className="nav-item nav-btn res-nav">
            For Teams
          </Link>
          <form>
            <input type="search" placeholder="Search..." />
            <img
              src={searchLogo}
              alt="search"
              width="18"
              className="search-icon"
            />
          </form>
        </div>
        <div className="navbar-2">
          {user === null ? (
            <Link to="/Auth" className="nav-item nav-link">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="12px"
                py="7px"
                borderRadius="50%"
                cursor="pointer"
              >
                <Link
                  to={`/Users/${user?.result?._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {user?.result?.name?.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-link" onClick={handleLogOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
