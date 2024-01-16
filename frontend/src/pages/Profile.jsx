import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store/userslice";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function Profile() {
  const { user, isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    try {
      dispatch(userActions.signInStarted());
      const response = await axios.post(
        `http://localhost:3000/api/auth/update/${user._id}`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const resData = await response.data;
      dispatch(userActions.updateSuccess(resData));
      navigate("/");
    } catch (error) {
      dispatch(userActions.updateFailed());
      setTimeout(()=>{
        dispatch(userActions.reset());
      },2000)
    }
  }

  async function handleDelete() {
    const proceed = window.confirm("Are you Sure?");

    if (!proceed) {
      return;
    }

    try {
      dispatch(userActions.deleteStarted());
      const response = await axios.get(
        `http://localhost:3000/api/auth/delete/${user._id}`
      );
      dispatch(userActions.deleteSuccess());
      navigate("/signup");
    } catch (error) {
      dispatch(userActions.deleteFailed());
      setTimeout(()=>{
        dispatch(userActions.reset());
      },2000)
    }
  }

  async function handleSignOut(){
    const proceed= window.confirm("Are you sure?");

    if(!proceed){
      return;
    }

    try{
      const response= await axios.get("http://localhost:3000/api/auth/signout");
      dispatch(userActions.signOutSuccess());
      navigate("/signup");
    }catch(err){
      console.log(err);
    }




  }

  return (
    <>
      <div className="p-3 max-w-lg  mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <img
            src={user.profilePicture}
            alt="profile"
            className="h-24 2-24 self-center cursor-pointer rounded-full object-cover mt-2 "
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="bg-slate-200  rounded-lg p-3 "
            defaultValue={user.username}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="bg-slate-200  rounded-lg p-3 "
            defaultValue={user.email}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="bg-slate-200 rounded-lg p-3 "
          />
          <button
            className="bg-slate-700 p-3 rounded-xl text-white hover:opacity-95 disabled:opacity-80"
            type="submit"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <div className="flex justify-between mt-5">
            <span
              className="text-red-700 cursor-pointer hover:font-semibold"
              onClick={handleDelete}
            >
              Delete Account
            </span>
            <span className="text-red-700 cursor-pointer hover:font-semibold" onClick={handleSignOut}>
              Sign Out
            </span>
          </div>

          {isError && <p className="text-red-500">An error occured!</p>}
        </form>
      </div>
    </>
  );
}

export default Profile;
