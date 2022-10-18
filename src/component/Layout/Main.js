import React from "react";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav className="py-4 ">
        <Link to="/login">login</Link>
        <Link className="p-3" to="/register">
          Register
        </Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
