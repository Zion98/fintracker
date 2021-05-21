import React,{useState} from "react";
import SideBar from "./components/SideBar";
import Nav from "./components/Nav";
import { accessToken } from "./helpers/helperFunc";
import jwt_decode from "jwt-decode";

const NavSideBar = () => {
  console.log("tredefef");
  console.log(accessToken);
  let decoded: Record<string, unknown> = jwt_decode(accessToken);

  let names = decoded.name;
  let isAdminBool = decoded.isAdmin;
  console.log(decoded);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    // <div className="container">
        <>
      <Nav name={names} openSideBar={openSideBar} />
      <SideBar
        isAdmin={isAdminBool}
        decoded={decoded}
        sideBarOpen={sideBarOpen}
        closeSideBar={closeSideBar}
      />
      </>
//   </div>
  );
};

export default NavSideBar;
