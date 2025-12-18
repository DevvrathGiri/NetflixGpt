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
        fixed top-0 left-0 right-0 z-[100]
        bg-gradient-to-b from-black/70 via-black/30 to-transparent
        px-4 md:px-8 lg:px-12 py-2 md:py-3
        transition-all duration-300
      "
    >
      <div className="flex items-center justify-between h-12 md:h-14 max-w-7xl mx-auto">
        {/* Logo */}
        <img
          className="w-20 md:w-28 lg:w-32 h-auto cursor-pointer select-none"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix"
        />

        {/* Right controls desktop */}
        {user && (
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {showGptSearch && (
              <select
                className="
                  bg-black/30
                  text-xs md:text-sm text-white font-medium
                  px-3 md:px-4 py-1.5 md:py-2 rounded-md
                  border border-white/20
                  hover:bg-black/45 hover:border-white/40
                  transition-all duration-200
                "
                onChange={handleLanguageChange}
              >
                <option value="en" className="bg-black text-white">English</option>
                <option value="hindi" className="bg-black text-white">Hindi</option>
                <option value="spanish" className="bg-black text-white">Spanish</option>
              </select>
            )}

            <button
              className="
                bg-red-600 text-white text-xs md:text-sm font-semibold
                px-4 md:px-5 py-1.5 md:py-2 rounded-md
                hover:bg-red-500 transition-all duration-200
              "
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <button
              onClick={handleSignOut}
              className="
                bg-black/35 text-white text-xs md:text-sm font-semibold
                px-4 md:px-5 py-1.5 md:py-2 rounded-md
                border border-white/25
                hover:bg-white/15 transition-all duration-200
              "
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Mobile right controls */}
        {user && (
          <div className="md:hidden flex items-center gap-2">
            <button
              className="
                bg-black/35 text-white text-xs font-semibold
                px-3 py-1.5 rounded-md border border-white/25
              "
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT"}
            </button>
            <button
              onClick={handleSignOut}
              className="
                bg-black/30 text-white text-xs font-semibold
                px-3 py-1.5 rounded-full border border-white/25
              "
            >
              👤
            </button>
          </div>
        )}
      </div>
    </header>
  );

};

export default Header;
