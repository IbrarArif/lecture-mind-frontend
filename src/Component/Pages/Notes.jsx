import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { apiRequest } from '../Helpers/apiRequest';
import { useAuth } from '@clerk/clerk-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Dark theme

const Notes = () => {
  const { id } = useParams(); // Get video ID from URL
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    // Fetch the notes for the specific video
    const fetchNotes = async () => {
      try {
        const token = await getToken({ ignoreCache: true });
        const response = await apiRequest('GET', `/youtube_content/${id}`, token);
        setNotes(response.summary); // Assuming the API returns a 'summary' field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  // Custom renderers for code blocks and tables
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return inline ? (
        <code className="bg-gray-200 rounded p-1" {...props}>
          {children}
        </code>
      ) : (
        <SyntaxHighlighter
          language={match ? match[1] : 'plaintext'}
          style={atomOneDark} // Dark theme for code blocks
          customStyle={{
            borderRadius: '0.5rem',
            padding: '1rem',
           fontSize: '1.5rem',
           font: 'blod', 
            backgroundColor: '#f1f5f9', // Dark background for better readability
            color: '#030712',
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      );
    },
    // Custom table renderer with improved styling and checks
    table({ children }) {
      const tableChildren = React.Children.toArray(children); // Ensure children is an array

      const headerRow = tableChildren[0]?.props?.children ?? [];
      const bodyRows = tableChildren[1]?.props?.children ?? [];

      return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                {Array.isArray(headerRow) &&
                  headerRow.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-left text-gray-600 font-semibold border-b border-gray-300"
                    >
                      {header.props.children}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bodyRows) &&
                bodyRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-gray-50' : ''}`}
                  >
                    {Array.isArray(row.props.children) &&
                      row.props.children.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-4 py-2 border-b border-gray-300"
                        >
                          {cell.props.children}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    },
  };

  return (
    <div className="container mx-auto p-6 shadow-xl bg-white min-h-screen">
      {loading ? (
        <p className="text-lg text-gray-600">Loading notes...</p>
      ) : (
        <div>
          <div className="h-full overflow-y-auto p-4  border-gray-300 rounded-lg">
            <ReactMarkdown
              className="prose prose-lg font-sans  text-xl"
              remarkPlugins={[remarkGfm]} // Add the GFM plugin for tables
              components={renderers} // Use custom renderers for code blocks and tables
            >
              {notes}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
