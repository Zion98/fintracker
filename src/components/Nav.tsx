import React from "react";
import { User } from "../helpers/helperFunc";

//@ts-expect-error
const Nav = ({ name,openSideBar }) => {
  return (
    <header>
      <div className="menu-icon" onClick={openSideBar}>
        <i className="fas fa-bars header__menu"></i>
      </div>
      <p className="initials">
        <span>{User(name)}</span>
      </p>
    </header>
  );
};

export default Nav;
