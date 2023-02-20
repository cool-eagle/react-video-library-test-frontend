import { NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const isAddActive = location.pathname.split("/")[1] === "add";

  return (
    <nav className="w-full h-20 bg-slate-300 flex items-center justify-start">
      <div className="text-lg font-light mx-20 mr-4 md:mx-8 bg-slate-300">
        The Video Library
      </div>
      <div className="flex items-center gap-12 text-xl font-bold bg-slate-300">
        <NavLink
          to="/"
          className={`${
            !isAddActive ? "text-red-500" : "hover:text-red-800"
          } bg-slate-300`}
        >
          Videos
        </NavLink>
        <NavLink
          to="/add"
          className={`${
            isAddActive ? "text-red-500" : "hover:text-red-800"
          } bg-slate-300`}
        >
          Add Video
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
