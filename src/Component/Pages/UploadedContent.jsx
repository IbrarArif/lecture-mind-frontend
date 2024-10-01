import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineMessage, AiOutlineFileText } from 'react-icons/ai'; // Add the file-text icon for notes
import { apiRequest } from '../Helpers/apiRequest';
import { showToast } from '../Helpers/notif';
import { Spinner } from './Spinner';
import { useAuth } from '@clerk/clerk-react'; // Import Clerk's useAuth hook

const UploadedContent = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth(); // Get the getToken function from Clerk

  // Fetch content from backend
  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = await getToken({ ignoreCache: true }); // Fetch the token here
      const content = await apiRequest('GET', '/youtube_content', token); // Pass the token to apiRequest
      setContent(content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching content:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const totalPages = useMemo(() => Math.ceil(content.length / pageSize), [content, pageSize]);

  const paginatedContent = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return content.slice(startIndex, startIndex + pageSize);
  }, [content, page, pageSize]);

  const handleDelete = async (id) => {
    try {
      const token = await getToken({ ignoreCache: true }); // Fetch the token here
      await apiRequest('DELETE', `/youtube_video/${id}`, token); // Pass the token to apiRequest
      setContent((prevContent) => prevContent.filter((item) => item.id !== id));
      showToast('success', "Youtube video deleted");
    } catch (error) {
      console.error("Error deleting video:", error.message);
    }
  };

  const handleViewNotes = (id) => {
    navigate(`/notes/${id}`); // Navigate to the notes page for the specific video
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? <Spinner /> : null}
        {content.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">No Youtube Video Uploaded yet</p>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="px-4 py-2 text-left text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Channel</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContent.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="px-10 py-2 font-sans text-sm">{item.id}</td>
                    <td className="px-4 py-2 font-sans text-lg semibold">{item.title}</td>
                    <td className="px-4 py-2 font-sans text-lg semibold">{item.channal}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewNotes(item.id)}
                      >
                        <AiOutlineFileText fontSize={24} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        <AiOutlineDelete fontSize={24} />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => navigate('/chatbot')}
                      >
                        <AiOutlineMessage fontSize={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadedContent;
