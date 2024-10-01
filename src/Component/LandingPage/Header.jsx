import React from 'react';

const Header = () => {
  return (
    <header className="fixed w-full bg-white dark:bg-gray-900">
      <nav className="border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <a href="/" className="flex items-center">
            <img src="https://demo.themesberg.com/landwind/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold dark:text-white">ChatWithVideos</span>
          </a>
          <div className="flex items-center lg:order-2">
            <a href="#" className="text-white bg-purple-700 hover:bg-purple-800 px-5 py-2 rounded-lg dark:bg-purple-600">Get Started</a>
            <button className="p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden dark:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
