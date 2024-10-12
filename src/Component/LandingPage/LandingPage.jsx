import React, { useState } from 'react';
import { FaPlayCircle, FaCommentDots, FaLightbulb, FaRocket, FaSun, FaMoon, FaUsers, FaLaptopCode, FaChartLine, FaCheckCircle, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate()
  const { isSignedIn } = useUser();
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleNavigate = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      navigate('/sign-in'); 
    }
  };

  return (
    <div className={`bg-gray-100 ${isDarkMode ? 'dark:bg-gray-800' : ''} min-h-screen flex flex-col items-center justify-center`}>
      <header className={`bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''} shadow-md w-full px-4 py-8`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-3xl font-bold text-gray-800 ${isDarkMode ? 'dark:text-white' : ''}`}>Lecture Mind</h1>
          <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-700' : ''}`} onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>
      </header>

      <section className={`container mx-auto px-4 py-12 ${isDarkMode ? 'dark:text-white' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-6xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Unlock the Secrets of YouTube Videos
          </h2>
          <p className={`text-xl text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Effortlessly chat with any YouTube video and instantly understand the key points.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center transition-transform transform justify-center gap-4 duration-300 ease-in-out hover:scale-105">
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaPlayCircle className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Watch Any Video
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Connect with any YouTube video and dive into the content.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaCommentDots className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Chat with the Video
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Ask questions, get insights, and engage with the video in a conversational way.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaLightbulb className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Get Key Points
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Instantly receive a comprehensive summary of the video's key takeaways.
            </p>
          </div>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 bg-gray-200 ${isDarkMode ? 'dark:bg-gray-700' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Learn Faster, Remember More
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Lecture Mind helps you absorb knowledge more effectively and retain it for longer.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaRocket className={`text-5xl text-red-500 mb-4 ${isDarkMode ? 'dark:text-red-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Boost Your Learning
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Active learning through interactive chat leads to deeper understanding.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaLightbulb className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Improve Retention
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Key points summaries provide concise and memorable takeaways.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaPlayCircle className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Save Time
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Quickly grasp essential information without spending hours watching videos.
            </p>
          </div>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 ${isDarkMode ? 'dark:text-white' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Join the Revolution in Learning
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Experience the future of learning with Lecture Mind.
          </p>
        </div>
        <div className="text-center">
          <button onClick={handleNavigate} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-700' : ''}`}>
            Get Started Today!
          </button>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 bg-gray-200 ${isDarkMode ? 'dark:bg-gray-700' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            How Lecture Mind Works
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            See how Lecture Mind simplifies learning and enhances your understanding.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaUsers className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Connect with Any Video
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Simply share the link to any YouTube video with Lecture Mind and start interacting.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaLaptopCode className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Ask Questions, Get Answers
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Engage in a conversational chat with the video, asking questions and receiving insightful responses.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaChartLine className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Key Points Summarized
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Get a concise and organized summary of the video's key takeaways, helping you retain information effectively.
            </p>
          </div>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 bg-gray-200 ${isDarkMode ? 'dark:bg-gray-700' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Benefits of Using Lecture Mind
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Discover how Lecture Mind can transform your learning experience.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaCheckCircle className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Deeper Understanding
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Active engagement with the content through chat promotes deeper understanding.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaCheckCircle className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Improved Retention
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Key point summaries provide concise and memorable takeaways, enhancing information retention.
            </p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <FaCheckCircle className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
              Time Efficiency
            </h3>
            <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
              Lecture Mind helps you save time by quickly grasping essential information without watching entire videos.
            </p>
          </div>
        </div>
      </section>

      <footer className={`bg-gray-800 text-white py-4 w-full px-4 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
        <div className="container mx-auto text-center">
          <p>Developed by</p>
          <p className='text-xl font-medium'>Malik Ibrar</p>
          <p>© 2024 Lecture Mind. All rights reserved.</p>
          <div className="flex justify-center mt-2">
            <a href="http://linkedin.com/in/malik-ibrar" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className='text-4xl'/> 
            </a>
           
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;