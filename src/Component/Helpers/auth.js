import { useAuth } from '@clerk/clerk-react';

const getToken = () => {
  return localStorage.getItem('clerk-token');
};

const refreshToken = async () => {
  const { getToken } = useAuth();

  try {
    const token = await getToken({ ignoreCache: true });
    localStorage.setItem('clerk-token', token); // Store new token
    return token; // Return the new token
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

export { getToken, refreshToken };