import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const authService = {
  register: async (name: string, email: string, password: string) => {
    return axios.post(`${API_URL}/register`, { name, email, password });
  },

  login: async (email: string, password: string) => {
    return axios.post(`${API_URL}/login`, { email, password });
  },
};

export default authService;
