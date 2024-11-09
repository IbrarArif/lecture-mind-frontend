import { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { BASE_URL } from "../Helpers/constant";
import { AiOutlineOpenAI } from "react-icons/ai";
import Markdown from "react-markdown";
import { BiTable } from "react-icons/bi";
import { showToast } from "../Helpers/notif";
import { FaYoutube } from "react-icons/fa";
import { apiRequest } from "../Helpers/apiRequest";
import { useAuth } from '@clerk/clerk-react';

const Chatbot = () => {
  const [selectedVideo, setSelectedVideo] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [showVideoList, setShowVideoList] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
      const FetchVideos = async () => {
      const token = await getToken({ ignoreCache: true });
      const response = await apiRequest('GET', '/youtube_content', token)
      setVideoList(response)
     }
    FetchVideos();
    }, 
  [getToken]);

  const handleSend = async () => {
    if (!selectedVideo || !query) return showToast("error", "Please Select Video and enter query");
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: query },
    ]);
    setQuery("");

    setLoading(true);
    try {
      const token = await getToken({ ignoreCache: true });
      const response = await apiRequest('POST',`/qa_with_video`, token,  {
        video_id: selectedVideo,
        query: query,
      });
      setQuery("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: response.message },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVideo = (videoId) => {
    setSelectedVideo(videoId);
    setShowVideoList(false);
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-100 text-gray-900 flex flex-col overflow-auto">
        <main className="flex-1 p-4 overflow-y-auto flex flex-col-reverse md:flex-row">
          <div className="w-full bg-white p-4 rounded-lg h-full flex flex-col shadow-md md:w-2/3 md:mr-4">
            {/* Chatbot section */}
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`my-2 p-2 rounded-lg max-w-4xl font-sans text-xl w-fit  ${
                    msg.role === "user" ? "ml-auto bg-blue-100" : "mr-auto bg-gray-200"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <>
                        <FaUser className="text-gray-400" size={20} />
                        <span><Markdown>{msg.text}</Markdown></span>
                      </>
                    ) : (
                      <>
                        <AiOutlineOpenAI className="text-gray-600" size={40} />
                        <span>
                          <Markdown>{msg.text}</Markdown>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg w-fit max-w-2xl animate-pulse">
                  <div>Loading...</div>
                </div>
              )}
            </div>
            {/* Input and Send button section */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex w-full flex-row items-center gap-3 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
                <div className="flex">
                  <button
                    onClick={() => setShowVideoList(!showVideoList)}
                    className="ml-5 transition-colors duration-200"
                  >
                    <FaYoutube size={30} className="fill-red-600 p-0 m-0" />
                  </button>
                </div>
                <div className="relative grid h-full w-full min-w-[200px]">
                  <textarea
                    rows="2"
                    value={query}
                    placeholder="Your Message"
                    onChange={(e) => setQuery(e.target.value)}
                    className="peer h-full min-h-full w-full resize-y rounded-[7px] !border-0 border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-transparent focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  ></textarea>
                  <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                  ></label>
                </div>
                <div>
                  <button
                    onClick={handleSend}
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.9576 7.71521C13.0903 7.6487 13.2019 7.54658 13.2799 7.42027C13.3579 7.29396 13.3992 7.14845 13.3992 7.00001C13.3992 6.85157 13.3579 6.70606 13.2799 6.57975C13.2019 6.45344 13.0903 6.35132 12.9576 6.28481L1.75762 0.684812C1.61875 0.615327 1.46266 0.587759 1.30839 0.605473C1.15412 0.623186 1.00834 0.685413 0.888833 0.784565C0.769325 0.883716 0.681257 1.01551 0.635372 1.16385C0.589486 1.3122 0.587767 1.4707 0.630424 1.62001L1.77362 5.62001C1.82144 5.78719 1.92243 5.93424 2.06129 6.03889C2.20016 6.14355 2.36934 6.20011 2.54322 6.20001H6.20002C6.4122 6.20001 6.61568 6.2843 6.76571 6.43433C6.91574 6.58436 7.00002 6.78784 7.00002 7.00001C7.00002 7.21218 6.91574 7.41567 6.76571 7.5657C6.61568 7.71573 6.4122 7.80001 6.20002 7.80001H2.54322C2.36934 7.79991 2.20016 7.85647 2.06129 7.96113C1.92243 8.06578 1.82144 8.21283 1.77362 8.38001L0.631223 12.38C0.588482 12.5293 0.590098 12.6877 0.635876 12.8361C0.681652 12.9845 0.769612 13.1163 0.889027 13.2155C1.00844 13.3148 1.15415 13.3771 1.30838 13.3949C1.46262 13.4128 1.61871 13.3854 1.75762 13.316L12.9576 7.71601V7.71521Z"
                          fill="#90A4AE"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Youtube Video section */}
          <div className="w-full bg-white my-5 rounded-lg h-full flex flex-col shadow-md md:my-0 md:w-1/2">
            {selectedVideo ? (
              <>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* <div className="text-end">
        
              </div> */}
              </>
            ) : (
              // Display placeholder content when no video is selected
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-gray-400 text-lg text-center">Please select a video</p>
              </div>
            )}
          </div>
        </main>
        {/* Video selection modal */}
        {showVideoList && (
          <div className=" w-full fixed inset-0 py-10 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-xl p-5 w-5/6 h-5/6 overflow-y-auto md:w-1/3  md:h-3/4">
              <h3 className="text-lg font-semibold mb-4 text-center">Select a Video</h3>
              <ul>
                {videoList.map((video) => (
                  <li
                    key={video.video_id}
                    className="cursor-pointer mb-2 p-2 hover:bg-gray-200 rounded-lg"
                    onClick={() => handleSelectVideo(video.video_id)}
                  >
                    {video.title}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 w-full bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg"
                onClick={() => setShowVideoList(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;