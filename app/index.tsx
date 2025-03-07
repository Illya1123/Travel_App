import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const screenHeight = Dimensions.get('window').height;

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 relative">
      {/* Hình nền toàn màn hình */}
      <Image
        source={require('../assets/images/TravelBackGround.jpg')}
        className="absolute w-full h-full object-cover"
      />

      {/* Ô nổi nằm ở phía dưới */}
      <View
        className="absolute bottom-0 w-full bg-sky-400 p-6 shadow-lg rounded-t-3xl flex justify-between"
        style={{ height: screenHeight * 0.45 }} // Chiều cao chiếm 45% màn hình
      >
        <View>
          <Text className="text-4xl font-bold mb-4 text-center text-black">
            Chào mừng đến với Travel App! 👋
          </Text>
          <Text className="text-lg text-center text-black font-semibold">
            Hãy bắt đầu hành trình của bạn ngay bây giờ!
          </Text>
        </View>

        {/* Các nút cách đều nhau và tự động giãn chiều cao */}
        <View className="flex-1 justify-evenly mt-6">
          <TouchableOpacity
            className="bg-white py-4 px-6 rounded-2xl"
            onPress={() => router.push('/auth/signUp')}
          >
            <Text className="text-blue-600 text-center font-semibold text-lg">
              Bắt đầu
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 py-4 px-6 rounded-2xl"
            onPress={() => router.push('/auth/signIn')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Đã có tài khoản? Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
