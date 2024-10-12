import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import LoadAndVectorize from "./Component/Pages/LoadAndVectorize";
import UploadedContent from "./Component/Pages/UploadedContent";
import Chatbot from "./Component/Pages/Chatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignedIn, SignedOut, SignIn, UserProfile, useUser } from "@clerk/clerk-react";
import LandingPage from "./Component/LandingPage/LandingPage";
import Notes from "./Component/Pages/Notes";

// ProtectedRoute ensures only signed-in users can access specific routes
function ProtectedRoute({ children }) {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }
  return children;
}

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // For routes that don't need the sidebar (like the landing page)
  const isLandingPage = location.pathname === "/";

  return (
    <div className="flex">
      <SignedIn>
        {/* Sidebar is only shown when it's not the landing page */}
        {!isLandingPage && (
          <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        )}
        <div className={`flex-grow ${!isLandingPage ? (isExpanded ? 'ml-60' : 'ml-20') : ''} transition-all duration-300`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<SignIn />} />
                        <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LoadAndVectorize />
                </ProtectedRoute>
              }
            />
            <Route
              path="/load_and_vectorize"
              element={
                <ProtectedRoute>
                  <LoadAndVectorize />
                </ProtectedRoute>
              }
            />
             {/* <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Header/>
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/youtube_content"
              element={
                <ProtectedRoute>
                  <UploadedContent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute>
                  <div className="flex justify-center items-center">
                    <UserProfile />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex-grow flex justify-center items-center">
          <SignIn />
        </div>
      </SignedOut>
      <ToastContainer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
