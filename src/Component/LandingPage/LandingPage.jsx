import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaCommentDots, FaLightbulb, FaRocket, FaSun, FaMoon, FaUsers, FaLaptopCode, FaChartLine, FaCheckCircle, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import ParticleBackground from './ParticleBackground'; // Ensure ParticleBackground is defined elsewhere

function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
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
    <div className={`bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''} min-h-screen flex flex-col items-center justify-center relative`}>
      
      <header className={`bg-white ${isDarkMode ? 'dark:bg-gray-950' : ''} shadow-md w-full px-4 py-8`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-3xl font-bold text-gray-800 ${isDarkMode ? 'dark:text-white' : ''}`}>Lecture Mind</h1>
          <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-700' : ''}`} onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
        </div>
      </header>
      {/* <ParticleBackground /> */}

      <section className={`container mx-auto px-4 py-12 ${isDarkMode ? 'dark:text-white' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-6xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Unlock the Secrets of <span className='text-red-500'>YouTube</span> Videos
          </h2>
          <p className={`text-xl text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Effortlessly chat with any YouTube video and instantly understand the key points.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {['Watch Any Video', 'Chat with the Video', 'Get Key Points'].map((title, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 transition-transform duration-300 transform hover:scale-105 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
              {index === 0 && <FaPlayCircle className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />}
              {index === 1 && <FaCommentDots className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />}
              {index === 2 && <FaLightbulb className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />}
              <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
                {title}
              </h3>
              <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
                {index === 0 && 'Connect with any YouTube video and dive into the content.'}
                {index === 1 && 'Ask questions, get insights, and engage with the video in a conversational way.'}
                {index === 2 && 'Instantly receive a comprehensive summary of the video\'s key takeaways.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            Learn Faster, Remember More
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            Lecture Mind helps you absorb knowledge more effectively and retain it for longer.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {['Boost Your Learning', 'Improve Retention', 'Save Time'].map((title, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 transition-transform duration-300 transform hover:scale-105 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
              {index === 0 && <FaRocket className={`text-5xl text-red-500 mb-4 ${isDarkMode ? 'dark:text-red-500' : ''}`} />}
              {index === 1 && <FaLightbulb className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />}
              {index === 2 && <FaPlayCircle className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />}
              <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
                {title}
              </h3>
              <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
                {index === 0 && 'Active learning through interactive chat leads to deeper understanding.'}
                {index === 1 && 'Key points summaries provide concise and memorable takeaways.'}
                {index === 2 && 'Quickly grasp essential information without spending hours watching videos.'}
              </p>
            </div>
          ))}
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
          <button onClick={handleNavigate} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ${isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-700' : ''}`}>
            Get Started Today!
          </button>
        </div>
      </section>

      <section className={`container mx-auto px-4 py-12 bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
            How Lecture Mind Works
          </h2>
          <p className={`text-lg text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
            See how Lecture Mind simplifies learning and enhances your understanding.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {['Connect with Any Video', 'Ask Questions, Get Answers', 'Key Points Summarized'].map((title, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md p-6 text-center w-full md:w-1/3 transition-transform duration-300 transform hover:scale-105 ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
              {index === 0 && <FaUsers className={`text-5xl text-blue-500 mb-4 ${isDarkMode ? 'dark:text-blue-500' : ''}`} />}
              {index === 1 && <FaLaptopCode className={`text-5xl text-green-500 mb-4 ${isDarkMode ? 'dark:text-green-500' : ''}`} />}
              {index === 2 && <FaChartLine className={`text-5xl text-yellow-500 mb-4 ${isDarkMode ? 'dark:text-yellow-500' : ''}`} />}
              <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>
                {title}
              </h3>
              <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
                {index === 0 && 'Simply upload or link a video and start chatting.'}
                {index === 1 && 'Engage in a dialogue and receive instant responses.'}
                {index === 2 && 'Get concise summaries of key points from the video.'}
              </p>
            </div>
          ))}
        </div>
      </section>
      <footer className={`bg-white ${isDarkMode ? 'dark:bg-gray-950' : ''} w-full px-4 py-4 text-center`}>
        <div className={`container mx-auto text-center ${isDarkMode? 'dark:text-gray-400': ''}`}>
          <p>Developed by Malik Ibrar</p>
          <div className="flex justify-center mt-2">
            <a href="http://linkedin.com/in/malik-ibrar" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transform transition"> 
              <FaLinkedin className="text-4xl" />
              </a>
      </div>
      </div>  
        <p className={`text-gray-600 ${isDarkMode ? 'dark:text-gray-400' : ''}`}>
          &copy; 2024 Lecture Mind. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-600 hover:text-gray-800 transition duration-300">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition duration-300">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
