import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r p-4 flex flex-col justify-between">

      <div>
        <h2 className="text-lg font-bold mb-4">ChatGPT</h2>

        <button className="w-full bg-gray-200 p-2 rounded-lg mb-4">
          + New Chat
        </button>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Your chats</p>

          <div className="bg-gray-100 p-2 rounded-lg cursor-pointer">
            Register Form with React
          </div>

          <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            LangChain Import
          </div>

          <div className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            VS Code AI
          </div>
        </div>
      </div>

      {/* User */}
      <div className="flex items-center gap-2 border-t pt-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        <div>
          <p className="text-sm font-medium">Rahul Kumar</p>
          <p className="text-xs text-gray-500">Free</p>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;