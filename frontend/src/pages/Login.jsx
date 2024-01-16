import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/userslice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx";

function Login() {
  const { user, isLoading, isError } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const email = formdata.get("email");
    const password = formdata.get("password");

    try {
      dispatch(userActions.signInStarted());

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      
      if (response.status != 200) {
        dispatch(userActions.signInFailed());
        return;
      }
      const data = await response.data;
      dispatch(userActions.signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(userActions.signInFailed());
      setTimeout(()=>{
        dispatch(userActions.reset());
      },2000)
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-8 ">Log In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white text-xl hover:opacity-95 p-3 rounded-xl disabled:placeholder-opacity-80">
          {isLoading ? "Logging In" : "Log In"}{" "}
        </button>
        <OAuth/>
        <div className="flex gap-4 my-3">
          <p>Dont have an account?</p>
          <Link to={"/signup"} className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {isError && <p className="text-red-400">An Error Occured, Please Provide Correct Credentials</p>}
      </form>
    </div>
  );
}

export default Login;
