import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const fullname = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current!.value,
      password.current!.value
    );

    setErrorMessage(message);
    if (message) return;

    // ================= SIGN UP =================
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      )
        .then((userCredential) => {
          return updateProfile(userCredential.user, {
            displayName: fullname.current!.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          });
        })
        .then(() => {
          const user = auth.currentUser!;
          const { uid, email, displayName } = user;

          dispatch(
            addUser({
              uid,
              email: email ?? "", // ✅ null safe
              displayName: displayName ?? "", // ✅ null safe
            })
          );
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }

    // ================= SIGN IN =================
    else {
      signInWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email, displayName } = user;

          dispatch(
            addUser({
              uid,
              email: email ?? "", // ✅ null safe
              displayName: displayName ?? "", // ✅ null safe
            })
          );
        })
        .catch((error) => {
          setErrorMessage(error.code + " -- " + error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_large.jpg"
        alt="bg"
      />

      {/* Header */}
      <Header />

      {/* Login Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          absolute 
          bg-black/60 
          backdrop-blur-sm
          w-[400px] 
          p-10 
          rounded-md 
          text-white 
          left-0 right-0 mx-auto 
          top-20
          shadow-xl
        "
      >
        <h1 className="font-bold text-3xl mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={fullname}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
        />

        {errorMessage && (
          <p className="text-red-500 bg-red-500/10 border border-red-600 px-3 py-2 rounded text-sm mt-2 mb-2 text-center">
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleButtonClick}
          className="
            w-full bg-red-600 py-3 mt-4 rounded font-semibold 
            hover:bg-red-700 transition active:scale-[0.98]
          "
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400 my-4">
          <span className="bg-gray-700 h-[1px] w-16"></span>
          OR
          <span className="bg-gray-700 h-[1px] w-16"></span>
        </div>

        <button className="w-full bg-gray-500 bg-opacity-40 py-3 mb-3 rounded font-semibold hover:bg-gray-400/60 transition">
          Use a sign-in code
        </button>

        <div className="text-center">
          <a className="text-blue-400 text-sm cursor-pointer hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="flex items-center text-sm mt-4 gap-2">
          <input type="checkbox" className="accent-red-600" />
          <label>Remember me</label>
        </div>

        <p className="mt-4 text-gray-300 text-sm">
          <span
            className="text-white font-medium cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Netflix? Sign Up now"
              : "Already registered? Sign In now"}
          </span>
        </p>

        <p className="text-xs text-gray-400 mt-4 leading-5">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Learn more.
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
