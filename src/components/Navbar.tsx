import { NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const isAddActive = location.pathname.split("/")[1] === "add";

  return (
    <nav className="w-full h-20 bg-slate-200 flex items-center justify-start">
      <div className="text-lg font-light mx-8 bg-slate-200">
        The Video Library
      </div>
      <div className="flex items-center gap-12 text-xl font-bold bg-slate-200">
        <NavLink
          to="/"
          className={`${
            !isAddActive ? "text-red-500" : "hover:text-red-800"
          } bg-slate-200`}
        >
          Videos
        </NavLink>
        <NavLink
          to="/add"
          className={`${
            isAddActive ? "text-red-500" : "hover:text-red-800"
          } bg-slate-200`}
        >
          Add Video
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
