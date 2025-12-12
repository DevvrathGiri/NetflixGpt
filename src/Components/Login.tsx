import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/Validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Utils/firebase";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "--" + errorMessage);
          // ..
        });
    }
    //Sign in logic
    else {
      signInWithEmailAndPassword(
        auth,
        email.current!.value,
        password.current!.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "--" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
    setErrorMessage(null); // Reset error message when toggling
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

        {/* FULL NAME (only for signup) */}
        {!isSignInForm && (
          <input
            ref={fullname}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
          />
        )}

        {/* EMAIL FIELD */}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
        />

        {/* PASSWORD FIELD */}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 my-3 bg-zinc-900/60 rounded outline-none border border-gray-600 text-white focus:border-red-600"
        />

        {/* ERROR MESSAGE (Improved CSS) */}
        {errorMessage && (
          <p className="text-red-500 bg-red-500/10 border border-red-600 px-3 py-2 rounded text-sm mt-2 mb-2 text-center">
            {errorMessage}
          </p>
        )}

        {/* MAIN BUTTON */}
        <button
          className="
            w-full bg-red-600 py-3 mt-4 rounded font-semibold 
            hover:bg-red-700 transition active:scale-[0.98]
          "
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center justify-center gap-2 text-gray-400 my-4">
          <span className="bg-gray-700 h-[1px] w-16"></span>
          OR
          <span className="bg-gray-700 h-[1px] w-16"></span>
        </div>

        {/* SIGN-IN CODE BUTTON */}
        <button className="w-full bg-gray-500 bg-opacity-40 py-3 mb-3 rounded font-semibold hover:bg-gray-400/60 transition">
          Use a sign-in code
        </button>

        {/* FORGOT PASSWORD */}
        <div className="text-center">
          <a className="text-blue-400 text-sm cursor-pointer hover:underline">
            Forgot password?
          </a>
        </div>

        {/* REMEMBER ME */}
        <div className="flex items-center text-sm mt-4 gap-2">
          <input type="checkbox" className="accent-red-600" />
          <label>Remember me</label>
        </div>

        {/* SIGN UP TOGGLE */}
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

        {/* RECAPTCHA TEXT */}
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
