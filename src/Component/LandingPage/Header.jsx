import React, { useState } from "react";

const LandingPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Handle YouTube video submission
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (videoUrl) {
      setSummary("This is a mock summary of the YouTube video you entered.");
    }
  };

  // Handle chat input
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput) {
      setChatHistory([...chatHistory, { user: "User", message: chatInput }]);
      // Simulate a bot response
      setChatHistory([
        ...chatHistory,
        { user: "User", message: chatInput },
        { user: "Bot", message: "This is a mock response." },
      ]);
      setChatInput(""); // Clear chat input after submitting
    }
  };

  return (
    <>
      {/* Header Section */}
      <section>
        <nav className="flex flex-col lg:flex-row justify-around text-base sm:text-xl font-medium bg-slate-900 p-4 sm:p-7">
          <a href="#home" className="text-white hover:text-red-500">
            AI
          </a>
          <a href="#home" className="text-white hover:text-red-500">
            Home
          </a>
          <a href="#about" className="text-white hover:text-red-500">
            About
          </a>
          <a href="#pricing" className="text-white hover:text-red-500">
            Pricing
          </a>
          <a href="#contact" className="text-white hover:text-red-500">
            Contact
          </a>
        </nav>
      </section>

      {/* Hero Section */}
      <section className="bg-slate-900 py-10 text-center">
        <h1 className="text-6xl font-semibold text-white">
          UnLock the power of{" "}
          <span className="text-red-500">YouTube</span> videos
        </h1>
        <p className="text-white font-light py-4 w-full sm:w-1/2 mx-auto">
          Enter a YouTube URL, chat with its content, and generate summaries in
          real time!
        </p>
      </section>

      {/* Video Input Section */}
      <section className="py-10 bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white">
            Enter a YouTube Video URL
          </h2>
          <form onSubmit={handleVideoSubmit} className="mt-6">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube video URL here"
              className="px-4 py-2 border border-gray-600 rounded w-1/2 bg-slate-700 text-white"
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Video Summary</h3>
            <p className="mt-4 p-4 bg-slate-700 border border-gray-600 rounded text-white">
              {summary}
            </p>
          </div>
        )}
      </section>

      {/* Chat Section */}
      <section className="py-10 bg-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white">
            Chat with the Video Content
          </h2>
          <div className="mt-6">
            <div className="border border-gray-600 p-4 w-1/2 mx-auto h-64 overflow-y-auto bg-slate-700 text-white">
              {/* Chat History */}
              {chatHistory.map((chat, index) => (
                <div key={index} className="mb-4">
                  <strong>{chat.user}: </strong>
                  <span>{chat.message}</span>
                </div>
              ))}
            </div>
            {/* Chat Input */}
            <form onSubmit={handleChatSubmit} className="mt-4 flex justify-center">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message here"
                className="px-4 py-2 border border-gray-600 rounded w-1/2 bg-slate-700 text-white"
              />
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
