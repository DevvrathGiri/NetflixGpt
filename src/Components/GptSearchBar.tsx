const GptSearchBar = () => {
  return (
    <div className="flex justify-center">
      <form
        className="
          w-full max-w-2xl
          flex items-center gap-3
          bg-black/70 backdrop-blur-md
          p-4 rounded-xl shadow-lg
        "
      >
        <input
          type="text"
          className="
            flex-1
            p-3 rounded-lg
            bg-gray-900 text-white
            placeholder-gray-400
            outline-none
            focus:ring-2 focus:ring-red-600
          "
          placeholder="What would you like to watch today?"
        />

        <button
          className="
            bg-red-600 hover:bg-red-700
            text-white font-semibold
            px-6 py-3 rounded-lg
            transition
          "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
