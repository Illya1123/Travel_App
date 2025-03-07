import axios from "axios";

const API_BASE_URL = `http://192.168.31.228:3000`;

// Gửi mã OTP tới email
export const sendOTP = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/send-otp`, data);
  return response.data;
};

// Xác thực mã OTP
export const verifyOTP = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, data);
  return response.data;
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng ký người dùng:', error.response?.data || error.message);
    throw error;
  }
};

export const LoginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng nhập người dùng:', error.response?.data || error.message);
    throw error;
  }
};

// Lấy tất cả các tour
export const getAllTours = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tour/getAllTours`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tour:', error.response?.data || error.message);
    throw error;
  }
};

// Tạo mới tour (Admin)
export const createTour = async (tourData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/tour/createTours`, tourData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo tour:', error.response?.data || error.message);
    throw error;
  }
};

// Xóa tour theo ID (Admin)
export const deleteTour = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/tour/deleteTours/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa tour:', error.response?.data || error.message);
    throw error;
  }
};

