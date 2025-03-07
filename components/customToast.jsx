// components/CustomToast.js
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Tuỳ chỉnh giao diện Toast
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#4CAF50' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#F44336' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
    />
  ),
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

export default CustomToast;

// Hàm hiển thị toast tiện lợi
export const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
  });
};
