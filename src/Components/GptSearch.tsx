import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ✅ ONE SINGLE BACKGROUND IMAGE (FULL PAGE) */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_large.jpg"
        alt="bg"
        className="fixed inset-0 w-full h-full object-cover -z-30"
      />

      {/* ✅ DARK + TRANSPARENT GRADIENT OVERLAY */}
      <div
        className="
          fixed inset-0
          bg-gradient-to-b
          from-black/40
          via-black/60
          to-black/90
          
          backdrop-blur-[2px]
          -z-20
        "
      />

      {/* ✅ CONTENT LAYER */}
      <div className="relative z-10">

        {/* SEARCH BAR (Hero area) */}
        <div className="pt-32 flex justify-center">
          <GptSearchBar />
        </div>

        {/* RESULTS AREA (SAME BG CONTINUES) */}
        <div className="mt-20 px-6 pb-32">
          <GptMovieSuggestion />
        </div>

      </div>
    </div>
  );
};

export default GptSearch;
