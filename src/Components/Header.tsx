import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../Utils/appStore";
import { toggleGptSearchView } from "../Utils/gptSlice";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid,
            email: email ?? "",
            displayName: displayName ?? "",
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, [dispatch, navigate]);

  const handleGptSearchClick = () =>{
dispatch(toggleGptSearchView());
  }

  return (
    <header
      className="
        fixed top-0 left-0 z-50 w-full
        flex items-center justify-between
        px-10 py-3
        bg-gradient-to-b from-black/40 via-black/20 to-transparent
        backdrop-blur-[2px]

      "
    >
      <img
        className="w-32 select-none"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix"
      />

      {user && (
        <div className="flex p-2">
          <button className="
          bg-red-600 hover:bg-red-700
          text-white font-semibold
          px-4 py-2 rounded
          transition 
        " onClick={handleGptSearchClick}>GPT Search</button>
      <button
        onClick={handleSignOut}
        className="
          bg-red-600 hover:bg-red-700
          text-white font-semibold
          px-4 py-2 rounded
          transition
        "
      >
        Sign Out
      </button>
        </div>
      )}
     
    </header>
  );
};

export default Header;
