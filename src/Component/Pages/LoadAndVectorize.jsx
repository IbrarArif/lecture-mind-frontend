import React, { useState } from 'react';
import { showToast } from '../Helpers/notif';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from './Spinner'; 
import { SupportLangaues } from '../Helpers/SupportLanguages';
import { apiRequest } from '../Helpers/apiRequest';
import { useAuth } from '@clerk/clerk-react'; // Import Clerk's useAuth hook

const LoadAndVectorize = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false); // Loading state
  const { getToken } = useAuth(); // Get the getToken function from Clerk

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const payload = {
      url: url,
      language: language,
    };

    try {
      const token = await getToken({ ignoreCache: true }); // Fetch token here
      const response = await apiRequest('POST', '/load_and_vectorize', token, payload); // Pass token and payload to apiRequest

      if (!response) {
        showToast("error", 'Unexpected response status. Please try again.');
      } else {
        showToast("success", 'Video Loaded and notes generated successfully!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="bg-gray-50 p-10 rounded-xl shadow-lg w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Load and Generate Notes</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="url">
              YouTube URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="shadow-sm border border-gray-400 rounded-lg w-full py-3 px-4 focus:border-gray-600 focus:ring focus:ring-gray-300 transition ease-in-out"
              placeholder="Enter YouTube URL"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="language">
              Language of video
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-600 transition ease-in-out"
            >
              {SupportLangaues.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          {/* Loading spinner */}
          {loading ? (
            <div className="flex justify-center my-4">
              <Spinner /> 
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-700 transition-colors duration-300 ease-in-out"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoadAndVectorize;
