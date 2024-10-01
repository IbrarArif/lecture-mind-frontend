import axios from 'axios';
import { BASE_URL } from './constant';

// Generic function to make API requests, accepts token as a parameter
const apiRequest = async (method, endpoint, token, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authentication
        'Content-Type': 'application/json', // Set the content type
      },
      data,
    };

    const response = await axios(config);
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle error and throw it for further handling
    if (error.response) {
      throw new Error(error.response.data.message || "Error occurred");
    } else {
      throw new Error("Network Error");
    }
  }
};

export { apiRequest };
