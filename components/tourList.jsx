import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; // Thư viện icon

export default function TourList() {
  const tours = useSelector((state) => state.tour.tours);
  const [filteredTours, setFilteredTours] = useState(tours);
  const [filterType, setFilterType] = useState('Tất cả'); // Lọc tour
  const [sortType, setSortType] = useState('Mặc định'); // Sắp xếp tour
  const [showFilterOptions, setShowFilterOptions] = useState(false); // Hiển thị tùy chọn bộ lọc
  const router = useRouter();

  useEffect(() => {
    applyFilterAndSort(filterType, sortType);
  }, [tours, filterType, sortType]);

  const applyFilterAndSort = (filterType, sortType) => {
    let updatedTours = [...tours];

    // Lọc tour theo loại
    if (filterType !== 'Tất cả') {
      updatedTours = updatedTours.filter((tour) => tour.type === filterType);
    }

    // Sắp xếp tour theo giá
    if (sortType === 'Giá tăng dần') {
      updatedTours.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortType === 'Giá giảm dần') {
      updatedTours.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredTours(updatedTours);
  };

  const renderItem = ({ item }) => {
    const price = item?.price ? item.price.toLocaleString() : 'Chưa cập nhật giá';

    return (
      <View className="p-4 bg-white mb-2 rounded-lg shadow">
        <Image
          source={{ uri: item?.image }}
          className="w-full h-40 mb-2 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-lg font-bold text-[#3f3b3b]">{item?.title || 'Chưa cập nhật'}</Text>
        <Text className="text-[#f79320] text-2xl font-bold">{price} VNĐ</Text>
        <Text className="text-[#a0c43b] font-semibold">
          {item?.score_description && item.score_description !== 'N/A'
            ? item.score_description
            : 'Không có đánh giá'}
        </Text>
        <Text>Ngày bắt đầu: {item?.date || 'Chưa cập nhật'}</Text>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded-lg mt-2"
          onPress={() => router.push(`/home/detailScreen/${item._id}`)}
        >
          <Text className="text-white text-center">Xem thêm</Text>
      </TouchableOpacity>
      </View>
    );
  };

  if (!filteredTours || filteredTours.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-500">Không có tour nào để hiển thị</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Danh sách tour</Text>
        <TouchableOpacity
          className="items-center justify-center bg-blue-500 p-3 rounded-full w-12 h-12"
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tùy chọn Lọc & Sắp xếp */}
      {showFilterOptions && (
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-xl font-bold mb-2">Bộ lọc & Sắp xếp</Text>

          {/* Lọc Tour */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Lọc theo loại tour:</Text>
            {['Tất cả', 'Tour Nước Ngoài', 'Tour Trong Nước'].map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-lg mb-2 ${
                  filterType === type ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onPress={() => setFilterType(type)}
              >
                <Text
                  className={`${
                    filterType === type ? 'text-white' : 'text-black'
                  } font-semibold`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sắp xếp Tour */}
          <View>
            <Text className="text-lg font-semibold mb-2">Sắp xếp theo giá:</Text>
            {['Mặc định', 'Giá tăng dần', 'Giá giảm dần'].map((sort) => (
              <TouchableOpacity
                key={sort}
                className={`px-4 py-2 rounded-lg mb-2 ${
                  sortType === sort ? 'bg-green-500' : 'bg-gray-300'
                }`}
                onPress={() => setSortType(sort)}
              >
                <Text
                  className={`${
                    sortType === sort ? 'text-white' : 'text-black'
                  } font-semibold`}
                >
                  {sort}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Danh sách Tour */}
      <FlatList
        data={filteredTours}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
