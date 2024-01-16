import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function MainNavigation() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center  max-w-6xl mx-auto p-3">
        <h1 className="font-semibold text-xl">Mern Auth</h1>
        <ul className="flex  gap-7">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
          {user?.email ? (
            <NavLink to={"/profile"}><img src={user.profilePicture} alt="Profile" className="w-7 h-7 object-cover rounded-full"/></NavLink>
          ) : (
            <>
              <NavLink to="/signup">
                <li>Sign Up</li>
              </NavLink>
              <NavLink to="login">
                <li>Log In</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MainNavigation;
