import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  // Everytime we change a page, we pass down a page into history. useHistory is a React hook
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        onClick={() => {
          history.push("./");
        }}
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        onClick={() => {
          history.push("./profile");
        }}
        className="nav_avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
    </div>
  );
}

export default Nav;
