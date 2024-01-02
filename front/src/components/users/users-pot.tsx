import { Outlet } from "react-router-dom";
import Navbar from "../lib/navbar";

const Users = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Navbar place="black" />
      <Outlet />
    </div>
  );
};

export default Users;
