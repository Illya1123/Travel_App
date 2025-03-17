import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { requestMoMoPayment } from '../../services/index'

export default function payment() {
  const { id } = useLocalSearchParams() // Lấy tourId từ URL
  const router = useRouter()
  const dispatch = useDispatch()

  // Lấy thông tin user từ Redux
  const user = useSelector((state) => state.user);
  const tours = useSelector(state => state.tour.tours)
  const tour = tours.find(t => t._id === id)

  // State lưu thông tin đặt tour
  const [numberOfAdults, setNumberOfAdults] = useState('1')
  const [numberOfChildren, setNumberOfChildren] = useState('0')
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản')
  const [note, setNote] = useState('')

  if (!tour) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Tour không tồn tại hoặc đã bị xoá</Text>
      </View>
    )
  }

  const childDiscount = 15 // Giảm giá 15%
  const childPrice = tour.price - (tour.price * childDiscount) / 100

  // Tính tổng tiền
  const totalPrice = tour.price * parseInt(numberOfAdults) + childPrice * parseInt(numberOfChildren)

  const handlePayment = async () => {
    if (!user) {
      Alert.alert("Lỗi", "Bạn cần đăng nhập để đặt tour!");
      return;
    }
  
    if (parseInt(numberOfAdults) < 1) {
      Alert.alert("Lỗi", "Cần ít nhất 1 người lớn.");
      return;
    }
  
    const orderData = {
      userId: user.uid.toString(),
      status: "Đã đặt",
      tour: [
        {
          tourId: tour._id.toString(),
          numberOfAdults: parseInt(numberOfAdults),
          numberOfChildren: parseInt(numberOfChildren),
        },
      ],
      paymentMethod,
      note,
      totalPrice,
    };
  
    try {
      const result = await requestMoMoPayment(orderData);
      console.log("Kết quả thanh toán:", result);
  
      if (result.resultCode === 0 && result.payUrl) {
        router.push({ pathname: "payment/webview", params: { url: result.payUrl } });
      } else {
        Alert.alert("Lỗi", result.message || "Thanh toán thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      Alert.alert("Lỗi", "Không thể kết nối với server.");
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">
        <Text className="text-2xl font-bold text-center my-4">Thanh toán Tour</Text>

        <View className="bg-gray-100 p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold">{tour.title}</Text>
          <Text className="text-gray-600">Giá: {tour.price.toLocaleString()} VNĐ/người lớn</Text>
          <Text className="text-gray-600">Giá trẻ em: {childPrice.toLocaleString()} VNĐ</Text>
          <Text className="text-gray-600">Ngày khởi hành: {tour.date}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Số lượng khách</Text>

          <View className="flex-row items-center justify-between bg-gray-100 p-3 rounded-lg mb-2">
            <Text className="text-base">Người lớn:</Text>
            <TextInput
              keyboardType="numeric"
              value={numberOfAdults}
              onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  const newValue = text === '' ? '1' : text
                  setNumberOfAdults(parseInt(newValue) < 1 ? '1' : newValue)
                }
              }}
              className="bg-white p-2 rounded-lg w-20 text-center border border-gray-300"
            />
          </View>

          <View className="flex-row items-center justify-between bg-gray-100 p-3 rounded-lg">
            <Text className="text-base">Trẻ em:</Text>
            <TextInput
              keyboardType="numeric"
              value={numberOfChildren}
              onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  const newValue = text === '' ? '0' : text
                  setNumberOfChildren(parseInt(newValue) < 0 ? '0' : newValue)
                }
              }}
              className="bg-white p-2 rounded-lg w-20 text-center border border-gray-300"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Phương thức thanh toán</Text>

          <TouchableOpacity
            disabled
            onPress={() => setPaymentMethod('Tiền mặt')}
            className={`p-3 rounded-lg border ${
              paymentMethod === 'Tiền mặt' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
            } mb-2 opacity-50`}
          >
            <Text className="text-base">
              <Ionicons name="cash-outline" size={18} /> Tiền mặt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPaymentMethod('Chuyển khoản')}
            className={`p-3 rounded-lg border ${
              paymentMethod === 'Chuyển khoản' ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
            }`}
          >
            <Text className="text-base">
              <Ionicons name="card-outline" size={18} /> Chuyển khoản
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">Ghi chú</Text>
          <TextInput
            placeholder="Nhập ghi chú (nếu có)"
            value={note}
            onChangeText={setNote}
            className="bg-gray-100 p-3 rounded-lg border border-gray-300"
            multiline
          />
        </View>

        <View className="bg-gray-100 p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold">Tổng tiền</Text>
          <Text className="text-xl font-bold text-green-600">{totalPrice.toLocaleString()} VNĐ</Text>
        </View>

        <TouchableOpacity onPress={handlePayment} className="bg-blue-600 py-3 rounded-lg">
          <Text className="text-white text-center text-lg font-bold">Xác nhận đặt tour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
