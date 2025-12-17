import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import type { RootState } from "../Utils/appStore";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { changeLanguage } from "../Utils/configSlice";
import type { LanguageKey } from "../Utils/languageConstants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: RootState) => store.user);
  const showGptSearch = useSelector(
    (store: RootState) => store.gpt.showGptSearch
  );

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

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(changeLanguage(e.target.value as LanguageKey));
  };

  return (
    <header
     className="
        fixed top-0 left-0 z-50 w-full
        bg-gradient-to-b from-black/60 via-black/30 to-transparent
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          flex flex-wrap items-center justify-between
          gap-3
          px-4 py-2
          md:px-10 md:py-3
        "
      >
        {/* Logo */}
        <img
          className="w-24 md:w-32 select-none"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix"
        />

        {user && (
          <div
            className="
              flex flex-wrap items-center justify-end
              gap-2 md:gap-3
            "
          >
            {showGptSearch && (
              <select
                className="
                  bg-black/40 backdrop-blur-[3px]
                  text-xs md:text-sm text-white font-semibold
                  px-3 md:px-4 py-1.5 md:py-2 rounded-full
                  border border-red-500/60
                  shadow-md shadow-red-500/30
                  cursor-pointer
                  focus:outline-none
                  focus:ring-2 focus:ring-red-500/70
                  transition duration-300 ease-out
                  hover:bg-black/60
                "
                onChange={handleLanguageChange}
              >
                <option value="en" className="bg-black text-white">
                  English
                </option>
                <option value="hindi" className="bg-black text-white">
                  Hindi
                </option>
                <option value="spanish" className="bg-black text-white">
                  Spanish
                </option>
              </select>
            )}

            <button
              className="
                relative overflow-hidden
                bg-gradient-to-r from-red-500 via-red-600 to-red-700
                text-white font-semibold
                text-xs md:text-sm
                px-4 md:px-5 py-1.5 md:py-2 rounded-full
                shadow-lg shadow-red-500/40
                border border-red-500/60
                backdrop-blur-[2px]
                transition
                duration-300
                ease-out
                hover:from-red-400 hover:via-red-500 hover:to-red-600
                hover:shadow-red-500/70
                hover:-translate-y-0.5
                hover:scale-[1.03]
                active:scale-[0.97]
              "
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <button
              onClick={handleSignOut}
              className="
                relative overflow-hidden
                bg-black/40
                text-white font-semibold
                text-xs md:text-sm
                px-4 md:px-5 py-1.5 md:py-2 rounded-full
                border border-red-500/70
                shadow-md shadow-black/40
                backdrop-blur-[3px]
                transition
                duration-300
                ease-out
                hover:bg-red-600/90
                hover:border-red-400
                hover:shadow-red-500/60
                hover:-translate-y-0.5
                hover:scale-[1.03]
                active:scale-[0.97]
              "
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
