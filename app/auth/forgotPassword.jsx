import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { forgotPassword } from '../../services';

const ForgotPasswordScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert('Lỗi', 'Vui lòng nhập email');
            return;
        }
        setLoading(true);
        try {
            const response = await forgotPassword(email);
            router.push({
                pathname: '/auth/changePassword',
                params: { email },
            }
            );
        } catch (error) {
            Alert.alert('Lỗi', error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center px-6 bg-gray-100">
            <Text className="text-3xl font-bold text-blue-600 mb-6">Quên Mật Khẩu</Text>
            <Text className="text-gray-600 text-center mb-6">
                Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
            </Text>

            <View className="w-full bg-white flex-row items-center p-3 rounded-lg shadow mb-4">
                <Ionicons name="mail-outline" size={24} color="gray" />
                <TextInput
                    className="flex-1 ml-3 text-lg"
                    placeholder="Nhập email của bạn"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <TouchableOpacity
                onPress={handleForgotPassword}
                className="bg-blue-500 w-full p-4 rounded-lg items-center shadow-lg"
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text className="text-white text-lg font-bold">Gửi yêu cầu</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity className="mt-6" onPress={() => router.push('/auth/signIn')}>
                <Text className="text-blue-500 text-lg">Đi đến đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPasswordScreen;
