// Sidebar.js
import React from 'react';
import {
  HiOutlineLibrary,
  HiOutlineDocumentText, // Better match for 'YouTube Videos'
  HiOutlineVideoCamera,  // For 'Your Content'
  HiOutlineChatAlt2,     // For 'Chatbot'
} from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa'; // More user-friendly for Profile
import { NavLink } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react'; // Import UserButton and useUser

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const { user } = useUser(); // Access user data

  return (
    <div className={`fixed top-0 left-0 h-full flex flex-col bg-gray-800 text-white transition-all duration-500 ease-in-out ${isExpanded ? 'w-60' : 'w-20'}`}>
      {/* Toggle Button */}
      <button
        className="w-full h-16 flex items-center justify-center bg-gray-700"
        onClick={toggleSidebar}
      >
        <HiOutlineLibrary size={32} />
      </button>

      {/* Icons List */}
      <div className="flex flex-col items-start mt-4 space-y-2 w-full">
        <NavLink
          className="flex items-center w-full h-16 hover:bg-gray-700 px-4"
          to="/load_and_vectorize"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(55 65 81)' : '',
          })}
        >
          <div className="w-12 flex justify-center">
            <HiOutlineDocumentText size={30} />
          </div>
          {isExpanded && <span className="ml-2">Upload YouTube Video</span>}
        </NavLink>

        <NavLink
          className="flex items-center w-full h-16 hover:bg-gray-700 px-4"
          to="/youtube_content"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(55 65 81)' : '',
          })}
        >
          <div className="w-12 flex justify-center">
            <HiOutlineVideoCamera size={30} />
          </div>
          {isExpanded && <span className="ml-2">Your Content</span>}
        </NavLink>

        <NavLink
          className="flex items-center w-full h-16 hover:bg-gray-700 px-4"
          to="/chatbot"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(55 65 81)' : '',
          })}
        >
          <div className="w-12 flex justify-center">
            <HiOutlineChatAlt2 size={30} />
          </div>
          {isExpanded && <span className="ml-2">Chatbot</span>}
        </NavLink>

        <NavLink
          className="flex items-center w-full h-16 hover:bg-gray-700 px-4"
          to="/user-profile"
          style={({ isActive }) => ({
            backgroundColor: isActive ? 'rgb(55 65 81)' : '',
          })}
        >
          <div className="w-12 flex justify-center">
            <FaUserCircle size={30} />
          </div>
          {isExpanded && <span className="ml-2">Profile</span>}
        </NavLink>
      </div>

      {/* User Info and Button at the Bottom */}
      <div className="mt-auto p-4 ml-2 flex">
        <UserButton />
        {user && isExpanded && (
          <span className="ml-2 mb-2">{user.firstName} {user.lastName}</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
