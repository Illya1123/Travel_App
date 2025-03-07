import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const tours = useSelector((state) => state.tour.tours);
  const tour = tours.find((t) => t._id === id);

  if (!tour) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Tour không tồn tại hoặc đã bị xoá</Text>
      </View>
    );
  }

  return (
      <ScrollView className="flex-1 bg-white px-4 mt-7">
        <Image source={{ uri: tour?.image }} className="w-full h-60 mb-4 rounded-lg" resizeMode="cover" />
        <Text className="text-2xl font-bold mb-2">{tour?.title || 'Chưa cập nhật'}</Text>
  
        <Text className="text-lg text-gray-500 mb-2">
          {tour?.price?.toLocaleString() || 'Chưa cập nhật giá'} VND
        </Text>
        <Text className="text-green-500 mb-2">
          {tour?.score_description || 'Không có đánh giá'} ({tour?.score || 'N/A'})
        </Text>

        <Text className="text-base mb-2">Ngày bắt đầu: {tour?.date || 'Chưa cập nhật'}</Text>
        <Text className="text-base mb-2">Loại tour: {tour?.type || 'Không xác định'}</Text>
        <Text className="text-base mb-2">Quốc gia: {tour?.country || 'Không xác định'}</Text>

        <Text className="text-lg font-semibold mt-4 mb-2">Mô tả:</Text>
        <Text className="text-base mb-4">{tour?.description || 'Không có mô tả'}</Text>

        <Text className="text-lg font-semibold mt-4 mb-2">Dịch vụ bao gồm:</Text>
        {tour?.services?.length > 0 ? (
          tour.services.map((service, index) => (
            <Text key={index} className="text-base mb-1">• {service}</Text>
          ))
        ) : (
          <Text className="text-base mb-2">Không có dịch vụ</Text>
        )}

        <Text className="text-lg font-semibold mt-4 mb-2">Tổng quan:</Text>
        {tour?.overview?.length > 0 ? (
          tour.overview.map((item, index) => (
            <Text key={index} className="text-base mb-1">• {item}</Text>
          ))
        ) : (
          <Text className="text-base mb-2">Không có thông tin tổng quan</Text>
        )}
      </ScrollView>
  );
}