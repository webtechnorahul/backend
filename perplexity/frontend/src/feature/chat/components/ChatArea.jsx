import React from "react";

const ChatArea = () => {
  return (
    <div className="flex flex-col justify-between flex-1 p-6">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-700">
            This is your chat content area (code/messages).
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="mt-4">
        <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow">

          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 outline-none"
          />

          <button className="ml-2 bg-black text-white px-4 py-1 rounded-full">
            Send
          </button>

        </div>
      </div>

    </div>
  );
};

export default ChatArea;