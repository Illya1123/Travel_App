import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.user);

  // Lấy giờ hệ thống và xác định lời chào
  const currentHour = new Date().getHours();
  let greeting = 'Xin chào';

  if (currentHour < 12) {
    greeting = 'Chào buổi sáng 🌻';
  } else if (currentHour < 18) {
    greeting = 'Chào buổi chiều ☀️';
  } else {
    greeting = 'Chào buổi tối 🌃';
  }

  const handleNotificationPress = () => {
    console.log('Đã nhấn vào biểu tượng thông báo');
  };

  return (
    <View className="mx-3 mt-3 flex-row items-center justify-between">
      <View>
        <View className="flex-row items-center mb-1">
          <Image
            source={{ uri: user.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View>
            <Text className="text-xl font-medium">{greeting}</Text>
            <Text className="text-3xl font-semibold">{user.name}</Text>
          </View>
        </View>
        <Text className="text-lg text-gray-500">Tôi sẽ là hoa tiêu của bạn 😉</Text>
      </View>

      <TouchableOpacity onPress={handleNotificationPress}>
        <Ionicons name="notifications-outline" size={32} color="#317adc" />
      </TouchableOpacity>
    </View>
  );
}
