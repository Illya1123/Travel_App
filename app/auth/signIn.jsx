import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { setTours } from '../slices/tourSlice';
import CustomToast, { showToast } from '../../components/customToast';

import Input from '../../components/Input';
import { LoginUser, getAllTours } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Kiểm tra xem đã chọn "Ghi nhớ đăng nhập" trước đó chưa
    const loadRememberedData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');
        const remember = await AsyncStorage.getItem('rememberMe') === 'true';

        if (remember && savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu đăng nhập:', error);
      }
    };

    loadRememberedData();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      showToast('error', 'Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng nhập!');
      return;
    }

    const userData = { email, password };

    try {
      const result = await LoginUser(userData);
      console.log('Đăng nhập thành công:', result);

      showToast('success', 'Đăng nhập thành công', 'Chào mừng bạn trở lại!');

      const user = {
        uid: result.userData._id,
        email: result.userData.email,
        name: result.userData.name,
        token: result.accessToken,
        avatar: result.userData.avatar,
      };

      dispatch(setUser(user));

      const tours = await getAllTours();
      dispatch(setTours(tours));

      // Lưu thông tin đăng nhập nếu chọn "Ghi nhớ đăng nhập"
      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
        await AsyncStorage.setItem('rememberedPassword', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
        await AsyncStorage.removeItem('rememberedPassword');
        await AsyncStorage.setItem('rememberMe', 'false');
      }

      // Lưu token người dùng
      await AsyncStorage.setItem('userToken', result.accessToken);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      // Điều hướng sang trang tabs
      setTimeout(() => {
        router.push('/tabs');
      }, 500);
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      showToast(
        'error',
        'Lỗi đăng nhập',
        error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      );
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
          Đăng nhập
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
          icon="lock-closed-outline"
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChangeText={setPassword}
        />

        <View className="flex-row items-center mb-4">
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text className="ml-2 text-lg">Ghi nhớ đăng nhập</Text>
        </View>

        <TouchableOpacity
          className="w-full bg-blue-500 p-4 rounded-lg mb-4"
          onPress={handleSignIn}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <Text className="text-center">
          Bạn chưa có tài khoản?{' '}
          <Text
            className="text-blue-500 font-semibold"
            onPress={() => router.push('/auth/signUp')}
          >
            Đăng ký
          </Text>
        </Text>
      </View>

      <CustomToast />
    </SafeAreaView>
  );
}
