import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, KeyboardAvoidingView, 
  Platform, TextInput, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { resetPasswordWithOTP } from '../../services';
import CustomToast, { showToast } from '../../components/customToast';

export default function ResetPasswordOTP() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Nhận email từ params

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      if (!otp || !newPassword) {
        return showToast('error', 'Lỗi', 'Vui lòng nhập đủ OTP và mật khẩu.');
      }
      if (newPassword.length < 6) {
        return showToast('error', 'Lỗi mật khẩu', 'Mật khẩu phải có ít nhất 6 ký tự.');
      }

      setLoading(true);
      const data = { email, otp, newPassword };

      const response = await resetPasswordWithOTP(data);

      if (response.success) {
        showToast('success', 'Thành công', 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập.');
        setTimeout(() => {
          router.push('/auth/signIn');
        }, 3000);
      } else {
        showToast('error', 'Lỗi', response.message || 'Không thể đặt lại mật khẩu.');
      }
    } catch (error) {
      console.error('Lỗi đặt lại mật khẩu:', error);
      showToast('error', 'Lỗi đổi mật khẩu', error.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#6a1b9a' }}>TRAVEL APP</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Xác thực OTP & Đổi mật khẩu</Text>
          <Text style={{ textAlign: 'center', marginTop: 5 }}>
            Nhập mã OTP gửi đến <Text style={{ fontWeight: 'bold' }}>{email}</Text> và tạo mật khẩu mới.
          </Text>
        </View>

        {/* Nhập mã OTP */}
        <OTPInputView
          style={{ width: '100%', height: 100 }}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={{
            width: 40,
            height: 50,
            color: "#6a1b9a",
            borderWidth: 1,
            borderRadius: 8,
            borderColor: '#6a1b9a',
            fontSize: 20,
            textAlign: 'center'
          }}
          onCodeFilled={setOtp}
        />

        {/* Nhập mật khẩu mới */}
        <TextInput
          style={{
            backgroundColor: 'white',
            padding: 14,
            borderRadius: 8,
            fontSize: 16,
            borderColor: '#ccc',
            borderWidth: 1,
            marginTop: 20
          }}
          secureTextEntry
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {/* Nút đặt lại mật khẩu */}
        <TouchableOpacity
          style={{
            backgroundColor: '#2ab12f',
            paddingVertical: 14,
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? <ActivityIndicator size="small" color="#fff" /> : null}
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginLeft: loading ? 10 : 0 }}>
            Đặt lại mật khẩu
          </Text>
        </TouchableOpacity>

        <CustomToast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
