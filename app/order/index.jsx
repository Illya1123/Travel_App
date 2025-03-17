import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getTourOrderByUserId } from '../../services'

export default function OrderTourByUserId() {
  const user = useSelector(state => state.user)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Đang lấy đơn đặt tour cho user:', user.uid);
        const ordersData = await getTourOrderByUserId(user.uid);
        setOrders(ordersData);
        console.log('Dữ liệu nhận được từ API:', ordersData);
      } catch (error) {
        console.error('Lỗi khi lấy đơn đặt tour:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text className="text-gray-500 mt-2">Đang tải đơn đặt tour...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-center text-blue-600 mb-6">Danh sách đơn đặt tour</Text>
      
      {orders.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">Bạn chưa có đơn đặt tour nào.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-6 rounded-2xl shadow-lg border border-gray-200">
              <Text className="font-semibold text-lg text-blue-700">Mã đơn: {item.orderId || 'Không có mã đơn'}</Text>
              <Text className="text-sm text-gray-600">Trạng thái: <Text className="font-medium text-green-600">{item.status || 'Không rõ'}</Text></Text>
              <Text className="text-sm text-gray-600">Phương thức thanh toán: <Text className="font-medium">{item.paymentMethod || 'Không rõ'}</Text></Text>
              <Text className="text-sm text-gray-600">Tổng tiền: <Text className="font-medium text-red-600">{item.totalPrice?.toLocaleString() || '0'} VNĐ</Text></Text>
              <Text className="text-sm text-gray-600">
                Thanh toán lúc: {item.createdAt ? new Date(item.createdAt).toLocaleString('vi-VN', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                }) : 'Không rõ'}
              </Text>

              {Array.isArray(item.tour) && item.tour.length > 0 ? (
                <FlatList
                  data={item.tour}
                  keyExtractor={(tourItem, index) => tourItem._id || index.toString()}
                  renderItem={({ item: tourItem }) => (
                    <View className="mt-4 bg-gray-100 p-3 rounded-xl">
                      {tourItem.tourId?.image ? (
                        <Image source={{ uri: tourItem.tourId.image }} className="w-full h-48 rounded-xl" />
                      ) : (
                        <Text className="text-gray-400 text-center">Không có hình ảnh tour</Text>
                      )}

                      <Text className="mt-2 font-semibold text-lg text-blue-700">{tourItem.tourId?.title || 'Chưa có tiêu đề'}</Text>
                      <View className="flex-row justify-between mt-2">
                        <View>
                          <Text className="text-sm text-gray-600">👨‍🦰 Người lớn: {tourItem.numberOfAdults || 0}</Text>
                          <Text className="text-sm text-gray-600">👦 Trẻ em: {tourItem.numberOfChildren || 0}</Text>
                        </View>
                        <View>
                          <Text className="text-sm text-gray-600">📅 Ngày khởi hành: {tourItem.tourId.date || "Chưa cập nhật"}</Text>
                          <Text className="text-sm text-gray-600">💰 Giá: <Text className="text-red-500 font-medium">{tourItem.tourId?.price?.toLocaleString() || '0'} VNĐ</Text></Text>
                        </View>
                      </View>
                    </View>
                  )}
                  scrollEnabled={false}
                />
              ) : (
                <Text className="text-gray-500 mt-3 text-center">Không có thông tin tour</Text>
              )}
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  )
}
