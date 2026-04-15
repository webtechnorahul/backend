import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ChatArea from "../components/ChatArea";

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Topbar */}
        <Topbar />

        {/* Chat Area */}
        <ChatArea />

      </div>
    </div>
  );
};

export default App;