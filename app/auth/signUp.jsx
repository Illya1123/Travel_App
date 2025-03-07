import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomToast, { showToast } from '../../components/customToast';

import Input from '../../components/Input';
import { registerUser } from '../../services';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validate';
import { sendOTP } from '../../services';

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!isValidEmail(email)) {
      showToast('error', 'Lỗi', 'Email không hợp lệ. Vui lòng nhập email @gmail.com');
      return;
    }
  
    if (!isValidName(name)) {
      showToast('error', 'Lỗi', 'Họ và tên phải chứa nhiều hơn 2 ký tự.');
      return;
    }
  
    if (!isValidPassword(password)) {
      showToast(
        'error',
        'Lỗi',
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.'
      );
      return;
    }
  
    if (password !== confirmPassword) {
      showToast('error', 'Lỗi', 'Mật khẩu và Nhập lại mật khẩu không khớp!');
      return;
    }
  
    try {
      // Gửi OTP tới email
      await sendOTP({ email });
  
      // Lưu thông tin người dùng vào router params để dùng ở màn hình OTP
      router.push({
        pathname: '/auth/OTP',
        params: { email, name, password }
      });
    } catch (error) {
      console.error('Lỗi gửi OTP:', error);
      showToast('error', 'Lỗi gửi OTP', 'Không thể gửi mã OTP. Vui lòng thử lại.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-8">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('../../assets/images/logo.jpg')}
          className="w-40 h-40 mb-6"
        />
        <Text className="text-3xl font-bold mb-6 text-center">
          Đăng ký tài khoản mới
        </Text>

        <Input
          icon="mail-outline"
          placeholder="Email"
          keyboardType="email-address"
          type="text"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          icon="person-outline"
          placeholder="Họ và tên"
          type="text"
          value={name}
          onChangeText={setName}
        />

        <Input
          icon="lock-closed-outline"
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChangeText={setPassword}
        />

        <Input
          icon="lock-closed-outline"
          placeholder="Nhập lại mật khẩu"
          type="password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="w-full bg-blue-500 p-4 rounded-lg mb-4"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Đăng ký
          </Text>
        </TouchableOpacity>

        <Text className="text-center">
          Bạn đã có tài khoản?{' '}
          <Text
            className="text-blue-500 font-semibold"
            onPress={() => router.push('/auth/signIn')}
          >
            Đăng nhập
          </Text>
        </Text>
      </View>

      <CustomToast />
    </SafeAreaView>
  );
}
