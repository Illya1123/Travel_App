import axios from "axios";
// import { API_BASE_URL } from '@env';

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

export const forgotPassword = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user/forgotPasswordWithOtp`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi quên mật khẩu:', error.response?.data || error.message);
    throw error;
  }
}

export const resetPasswordWithOTP = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user/resetPasswordWithOtp`, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đặt lại mật khẩu:', error.response?.data || error.message);
    throw error;
  }
};

export const requestMoMoPayment = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/payment-momo/momo`, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu thanh toán MoMo:", error.response?.data || error.message);
    throw error;
  }
};

export const updateInfoContactUser = async (data, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user/updateInfoContactUser`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error('Lỗi khi cập nhật thông tin người dùng:', error.response?.data || error.message);
    throw error;
  }
};

export const getTourOrderByUserId = async (userId) => {
  try {
    if (!userId) return [];
    const response = await axios.get(`${API_BASE_URL}/api/tour-order/user/${userId}`);
    return response.data.orders;
  } 
  catch (error) {
    console.error('Lỗi khi lấy đơn đặt tour:', error);
    return [];
  }
};