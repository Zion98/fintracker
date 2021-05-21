import React from "react";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import PollIcon from "@material-ui/icons/Poll";

const SideBar = ({ isAdmin, sideBarOpen, closeSideBar }: any) => {
  function handleLogout() {
    const name = document.cookie.split("=")[0];
    if (name) {
      document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
  return (
    <nav className={sideBarOpen ? "active" : ""}>
      <p className={sideBarOpen ? "close" : "cancel"} onClick={closeSideBar}>
        <i className="far fa-window-close"></i>
      </p>
      <Link to="/dashboard">
        <div className="decagon-logo">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAeCAYAAAAB4BHRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDBFOTgyMjE3QzU1MTFFQUI4MzZFOTBDMzY0MkIyMUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDBFOTgyMjI3QzU1MTFFQUI4MzZFOTBDMzY0MkIyMUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMEU5ODIxRjdDNTUxMUVBQjgzNkU5MEMzNjQyQjIxQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMEU5ODIyMDdDNTUxMUVBQjgzNkU5MEMzNjQyQjIxQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuRLJ70AAA7PSURBVHja7FsJ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"
            alt="decagon-logo"
          />
        </div>
      </Link>
      <div className="subNav">
        {isAdmin ? (
          <>
            <Link to="/nav/analytics">
              <p className="nav-options">
                <PollIcon className="icons" />
                Analytics
              </p>
            </Link>

            <Link to="/nav/upgrade">
              <p className="nav-options">
                <PollIcon className="icons" />
                Upgrade Users
              </p>
            </Link>
          </>
        ) : null}
        <Link to="/nav/dashboard">
          <p className="nav-options">
            <DashboardOutlinedIcon className="icons" /> Dashboard
          </p>
        </Link>

        <Link to="/nav/create">
          <p className="nav-options">
            <AddCircleOutlinedIcon className="icons" /> Create Request
          </p>
        </Link>

        <a href="/" onClick={handleLogout} className="link">
          <p className="nav-options">
            <ExitToAppOutlinedIcon className="icons" /> Log Out{" "}
          </p>
        </a>
      </div>
    </nav>
  );
};

export default SideBar;
