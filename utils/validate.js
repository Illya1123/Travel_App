// Kiểm tra email có đuôi @gmail.com
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return emailRegex.test(email);
};

// Kiểm tra họ và tên (phải lớn hơn 2 ký tự)
export const isValidName = (name) => name.trim().length > 2;

// Kiểm tra mật khẩu phức tạp
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
