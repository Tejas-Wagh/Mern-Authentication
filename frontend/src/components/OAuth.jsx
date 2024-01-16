import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      const data = await response.data;
      dispatch(userActions.signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Couldn't login with google", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-red-700 hover:opacity-95 p-3 text-white uppercase rounded-xl"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
