import React from "react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b">

      <h1 className="font-semibold">ChatGPT</h1>

      <div className="flex items-center gap-4">
        <button className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg">
          Get Plus
        </button>

        <button className="p-2 rounded hover:bg-gray-100">
          ⋯
        </button>
      </div>

    </div>
  );
};

export default Topbar;