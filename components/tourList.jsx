import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function TourList() {
  const tours = useSelector((state) => state.tour.tours);
  const [filteredTours, setFilteredTours] = useState(tours);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [sortType, setSortType] = useState('Mặc định');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100000000);
  const [price, setPrice] = useState(maxPrice);
  const [tempPrice, setTempPrice] = useState(maxPrice);

  const router = useRouter();

  useEffect(() => {
    applyFilterAndSort();
  }, [tours, filterType, sortType, price, searchQuery]);

  const applyFilterAndSort = () => {
    let updatedTours = tours;

    // Lọc theo loại tour
    if (filterType !== 'Tất cả') {
      updatedTours = updatedTours.filter((tour) => tour.type === filterType);
    }

    // Lọc theo giá
    updatedTours = updatedTours.filter((tour) => (tour.price || 0) <= price);

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim() !== '') {
      updatedTours = updatedTours.filter((tour) =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sắp xếp theo giá
    if (sortType === 'Giá tăng dần') {
      updatedTours.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortType === 'Giá giảm dần') {
      updatedTours.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredTours(updatedTours);
  };

  const renderItem = ({ item }) => (
    <View className="p-4 bg-white mb-2 rounded-lg shadow">
      <Image
        source={{ uri: item?.image }}
        className="w-full h-40 mb-2 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold text-[#3f3b3b]">{item?.title || 'Chưa cập nhật'}</Text>
      <Text className="text-[#f79320] text-2xl font-bold">{(item?.price || 0).toLocaleString()} VNĐ</Text>
      <Text className="text-[#a0c43b] font-semibold">
        {item?.score_description !== 'N/A' ? item.score_description : 'Không có đánh giá'}
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

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row items-center bg-white p-3 rounded-lg shadow mb-4">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Tìm kiếm tour..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 ml-2 text-lg"
        />
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold">Danh sách tour</Text>
        <TouchableOpacity
          className="items-center justify-center bg-blue-500 p-3 rounded-full w-12 h-12"
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {showFilterOptions && (
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-xl font-bold mb-2">Bộ lọc & Sắp xếp</Text>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Lọc theo loại tour:</Text>
            {['Tất cả', 'Tour Nước Ngoài', 'Tour Trong Nước'].map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-lg mb-2 ${filterType === type ? 'bg-blue-500' : 'bg-gray-300'}`}
                onPress={() => setFilterType(type)}
              >
                <Text className={`${filterType === type ? 'text-white' : 'text-black'} font-semibold`}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2">Lọc theo giá tối đa (VNĐ):</Text>
            <View className="flex-row justify-between">
              <Text>0 VNĐ</Text>
              <Text>{price.toLocaleString()} VNĐ</Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={maxPrice}
              value={price}
              onValueChange={setTempPrice}
              onSlidingComplete={setPrice}
              step={100000}
              minimumTrackTintColor="#1E90FF"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#1E90FF"
            />
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">Sắp xếp theo giá:</Text>
            {['Mặc định', 'Giá tăng dần', 'Giá giảm dần'].map((sort) => (
              <TouchableOpacity
                key={sort}
                className={`px-4 py-2 rounded-lg mb-2 ${sortType === sort ? 'bg-green-500' : 'bg-gray-300'}`}
                onPress={() => setSortType(sort)}
              >
                <Text className={`${sortType === sort ? 'text-white' : 'text-black'} font-semibold`}>
                  {sort}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={filteredTours}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
