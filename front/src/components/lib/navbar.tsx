import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, LogInIcon, LogOutIcon, PencilRulerIcon } from "lucide-react";
import { MouseEvent } from "react";
import { useSession } from "./session";

const Navbar = ({ place }: { place?: string }) => {
  const session = useSession();
  const navigate = useNavigate();
  const signOut = (e: MouseEvent) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    console.log("we are signing out");
  };
  return (
    <nav
      className={`pt-4 w-full ${
        place === "black" ? "pb-8 pr-10 mb-1 bg-white" : "mb-6"
      }`}
    >
      <ul className="flex justify-end">
        <div
          className={` text-blue-100 flex-row ${
            place === "black" ? "xmenu" : "menu"
          }`}
        >
          <Link to="/">
            <HomeIcon className="w-5 h-5 inline-block" /> Home
          </Link>
          <Link to="/services">
            <PencilRulerIcon className="w-5 h-5 inline-block" /> Services
          </Link>
          {session?.auth === "ok" ? (
            <Link onClick={signOut} to="/">
              <LogOutIcon className="w-5 h-5 inline-block" /> Logout
            </Link>
          ) : (
            <Link to="/users/login">
              <LogInIcon className="w-5 h-5 inline-block" /> Login
            </Link>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
