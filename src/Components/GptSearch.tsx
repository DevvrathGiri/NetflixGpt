import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* 1️⃣ BACKGROUND IMAGE – full page */}
      <div className="fixed inset-0 -z-30">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_large.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2️⃣ DARK OVERLAY (THODA TRANSPARENT) */}
      <div
        className="
          fixed inset-0 -z-20
          bg-gradient-to-b from-black/40 via-black/60 to-black/85
        "
      />

      {/* 3️⃣ SCROLLABLE CONTENT – YAHAN KABHI bg-black mat lagana */}
      <div className="relative z-10 pt-28 md:pt-28 lg:pt-28 pb-16">
        <div className="flex justify-center px-4 md:px-8">
          <GptSearchBar />
        </div>

        <div className="mt-10 md:mt-14">
          <GptMovieSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
