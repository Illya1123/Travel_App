import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

const { height: screenHeight } = Dimensions.get('window')

export default function DetailScreen() {
  const { id } = useLocalSearchParams()
  const dispatch = useDispatch()
  const tours = useSelector(state => state.tour.tours)
  const favoriteTours = useSelector(state => state.tour.favoriteTours) || []
  const tour = tours.find(t => t._id === id)
  const isFavorite = favoriteTours.includes(id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: id })
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: id })
    }
  }

  const handleBookingRequest = () => {
    Alert.alert('Yêu cầu đặt tour', 'Bạn có muốn gửi yêu cầu đặt tour này không?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đồng ý', onPress: () => Alert.alert('Đã gửi yêu cầu đặt tour') }
    ])
  }

  if (!tour) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Tour không tồn tại hoặc đã bị xoá</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white relative">
        <ScrollView className="flex-1 px-3 mb-20">
          <Image
            source={{ uri: tour?.image }}
            style={{ height: screenHeight * 0.45 }}
            className="w-full mb-4 rounded-lg"
            resizeMode="cover"
          />

          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold">{tour?.title || 'Chưa cập nhật'}</Text>
          </View>

          <View className="flex-row items-center bg-gray-100 p-3 rounded-lg mb-2">
            <Ionicons name="cash-outline" size={24} color="#317adc" className="mr-2" />
            <Text className="text-xl font-bold text-gray-700">
              {tour?.price?.toLocaleString() || 'Chưa cập nhật giá'}
              <Text className="text-lg font-normal text-gray-500"> VNĐ</Text>
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <View className="rounded-lg p-2 items-center justify-center bg-[#9fc43a]">
              <Text className="text-white font-bold text-base">{tour.score ?? 'N/A'}</Text>
            </View>
            <Text className="text-green-500 font-semibold text-xl ml-2">
              {tour?.score_description || 'Không có đánh giá'}
            </Text>
          </View>

          <View className="flex flex-col space-y-2">
            <View className="flex-row items-center bg-gray-100 p-3 rounded-lg">
              <Ionicons name="calendar-outline" size={20} color="#317adc" className="mr-2" />
              <Text className="text-base text-gray-700">
                <Text className="font-semibold">Ngày khởi hành:</Text> {tour?.date || 'Chưa cập nhật'}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 p-3 rounded-lg">
              <Ionicons name="pricetag-outline" size={20} color="#317adc" className="mr-2" />
              <Text className="text-base text-gray-700">
                <Text className="font-semibold">Loại tour:</Text> {tour?.type || 'Không xác định'}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 p-3 rounded-lg">
              <Ionicons name="location-outline" size={20} color="#317adc" className="mr-2" />
              <Text className="text-base text-gray-700">
                <Text className="font-semibold">
                  {tour?.type === 'Tour Trong Nước' ? 'Thành phố' : 'Quốc gia'}:
                </Text>{' '}
                {tour?.country || 'Không xác định'}
              </Text>
            </View>
          </View>

          <View className="mt-4 mb-2">
            <Text className="text-lg font-semibold mb-2">Dịch vụ bao gồm:</Text>
            {tour?.services?.length > 0 ? (
              <View className="flex flex-wrap flex-row">
                {tour.services.map((service, index) => (
                  <View
                    key={index}
                    className="flex-row items-center bg-blue-500 text-white px-3 py-2 rounded-lg mb-2 mr-2 w-[48%]"
                  >
                    <Ionicons name="checkmark-circle-sharp" size={16} color="white" className="mr-2" />
                    <Text className="text-base font-medium">{service}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-base mb-2">Không có dịch vụ</Text>
            )}
          </View>

          <View className="mt-4 mb-2">
            <Text className="text-lg font-semibold mb-2">Tổng quan:</Text>
            {tour?.overview?.length > 0 ? (
              <View>
                {tour.overview.map((item, index) => (
                  <View
                    key={index}
                    className={`bg-green-100 border-l-4 border-green-500 p-3 rounded-lg ${
                      index !== tour.overview.length - 1 ? 'mb-2' : ''
                    }`}
                  >
                    <Text className="text-base text-green-800">• {item}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-base mb-2">Không có thông tin tổng quan</Text>
            )}
          </View>
          <View className="mt-4 mb-8">
            <Text className="text-lg font-semibold mb-2">Liên hệ trực tiếp để trao đổi:</Text>

            <View className="flex-row items-center bg-gray-100 p-3 rounded-lg mb-2">
              <Ionicons name="call-outline" size={20} color="#317adc" className="mr-2" />
              <Text className="text-base text-gray-700">
                <Text className="font-semibold">Số điện thoại:</Text> {tour?.contactPhone || '0815 555 555'}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 p-3 rounded-lg">
              <Ionicons name="mail-outline" size={20} color="#317adc" className="mr-2" />
              <Text className="text-base text-gray-700">
                <Text className="font-semibold">Email:</Text> {tour?.contactEmail || 'lequocanh0101@gmail.com'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-4 left-4 right-4 flex-row justify-between items-center pointer-events-none">
          <TouchableOpacity
            onPress={handleFavoriteToggle}
            className="bg-white p-3 rounded-full shadow-md pointer-events-auto"
          >
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={isFavorite ? 'red' : 'gray'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBookingRequest}
            className="bg-[#317adc] flex-1 ml-4 py-3 rounded-lg pointer-events-auto"
          >
            <Text className="text-white text-center text-2xl font-bold">Yêu cầu đặt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
