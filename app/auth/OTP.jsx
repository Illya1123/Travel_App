import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { verifyOTP, registerUser } from '../../services';
import CustomToast, { showToast } from '../../components/customToast';

export default function AuthenticateOTP() {
  const router = useRouter();
  const { email, name, password } = useLocalSearchParams();

  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    try {
      // Xác thực mã OTP với server
      await verifyOTP({ email, otp });

      // Nếu OTP hợp lệ, tiến hành tạo tài khoản
      const result = await registerUser({ email, name, password });
      console.log('Đăng ký thành công:', result);

      showToast('success', 'Đăng ký thành công', 'Vui lòng đăng nhập để tiếp tục.');
      // Đợi 5 giây trước khi chuyển sang trang đăng nhập
      setTimeout(() => {
        router.push('/auth/signIn');
      }, 5000);
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      showToast('error', 'Lỗi xác thực OTP', error.response?.data?.message || 'OTP không hợp lệ.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        className="h-full w-full bg-white"
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text className="font-bold" style={{ fontSize: 36, marginVertical: 60 }}>TRAVEL APP</Text>
          <Text style={{ fontSize: 25 }} className="font-bold">Xác thực OTP</Text>
          <Text style={{ fontSize: 15 }} className="text-center">
            Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã OTP để xác thực tài khoản.
          </Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 22 }} className="w-full">
          <OTPInputView
            style={{ width: '100%', height: 100 }}
            pinCount={4}
            autoFocusOnLoad
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              color: "#f4a135",
              borderWidth: 0,
              borderBottomWidth: 3,
              borderBottomColor: 'black'
            }}
            codeInputHighlightStyle={{ borderColor: "#2ab12f" }}
            onCodeFilled={setOtp}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#8224cf',
              paddingVertical: 12,
              alignItems: 'center',
              borderRadius: 10,
              paddingHorizontal: 16,
            }}
            onPress={handleVerifyOTP}
          >
            <Text style={{ fontSize: 20, color: 'white' }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>

        <CustomToast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
