import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm,setSignInForm] = useState(true);

    const toggleSignInForm =()=>{
        setSignInForm(!isSignInForm);
    }
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
        className="
          absolute 
          bg-black/75
          w-[400px] 
          p-10 
          rounded-md 
          text-white 
          left-0 right-0 mx-auto 
          top-10
        "
      >
        <h1 className="font-bold text-3xl mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (<input
        type="Full Name"
        placeholder="Full Name"
        className="w-full p-3 my-3 bg-zinc-800 bg-opacity-70 rounded outline-none border border-gray-600 text-white"
        />)}

        <input
          type="text"
          placeholder="Email or mobile number"
          className="w-full p-3 my-3 bg-zinc-800 bg-opacity-70 rounded outline-none border border-gray-600 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 my-3 bg-zinc-800 bg-opacity-70 rounded outline-none border border-gray-600 text-white"
        />

        <button className="w-full bg-red-600 py-3 my-5 rounded font-semibold hover:bg-red-700">
          {isSignInForm ? "SignIn" : "SignUp"}
        </button>

        <p className="text-center text-gray-400">OR</p>

        <button className="w-full bg-gray-500 bg-opacity-40 py-3 my-3 rounded font-semibold hover:bg-gray-400 hover:bg-opacity-60">
          Use a sign-in code
        </button>

        <div className="text-center">
          <a className="text-blue-400 text-sm cursor-pointer hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="flex text-sm mt-4 gap-2">
          <input type="checkbox" className="accent-red-600" />
          <label>Remember me</label>
        </div>

        <p className="mt-4 text-gray-400 text-sm">

          <span className="text-white font-medium cursor-pointer hover:underline" onClick={toggleSignInForm}>
            {isSignInForm ? "New to Netflix? SignUp now" : "Already Registered? SignIn Now"}
          </span>
        </p>

        <p className="text-xs text-gray-400 mt-4 leading-4">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">Learn more.</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
