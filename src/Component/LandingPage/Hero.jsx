import React from 'react';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pt-28 pb-8">
      <div className="grid max-w-screen-xl px-4 mx-auto lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1 className="text-5xl font-extrabold dark:text-white">Chat with YouTube Videos using AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4">A powerful AI-based solution that helps you interact with video content to learn faster.</p>
          <div className="mt-6 space-y-4 sm:flex sm:space-x-4">
            <a href="#" className="bg-white text-gray-900 border-gray-200 px-5 py-3 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600">Get Figma File</a>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="AI app image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
