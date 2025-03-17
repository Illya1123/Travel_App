import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { setUser } from '../slices/userSlice'
import { isValidPhoneNumber } from '../../utils/validate';
import CustomToast, { showToast } from '../../components/customToast';
import AddressModal from '../../components/addressModal';
import { updateInfoContactUser } from '../../services/index';

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const handleSave = async () => {
    if (!isValidPhoneNumber(phone)) {
      showToast('error', 'Lỗi', 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.');
      return;
    }
  
    try {
      const body = {
        mobile: phone,
        address: address,
        dateOfBirth: birthday
      }
  
      const data = await updateInfoContactUser(body, user.token);
  
      if (data && data.success) {
        const updatedUser = {
          ...user,
          phone: phone,
          address: address,
          birthday: birthday
        };
  
        dispatch(setUser(updatedUser));
        showToast('success', 'Thành công', 'Cập nhật thông tin thành công.');
        setModalVisible(false);
      } else {
        showToast('error', 'Lỗi', data.message || 'Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      showToast('error', 'Lỗi', 'Không thể kết nối đến máy chủ.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="items-center mb-6">
          <Image
            source={{ uri: user.avatar }}
            className="w-32 h-32 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold">{user.name}</Text>
          <Text className="text-lg text-gray-600">{user.email}</Text>
        </View>

        <View className="p-4 bg-gray-100 rounded-2xl mb-4 relative">
          <Text className="text-lg font-semibold mb-2">Thông tin cá nhân</Text>
          <Text className="text-base mb-1">Số điện thoại: {user.phone}</Text>
          <Text className="text-base mb-1">Địa chỉ: {user.address}</Text>
          <Text className="text-base mb-1">Ngày sinh: {user.birthday}</Text>

          <TouchableOpacity 
            className="absolute top-3 right-3"
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="bg-blue-500 p-3 rounded-2xl flex-row items-center justify-center mb-4"
          onPress={() => router.push('/order')}
        >
          <Ionicons name="list-outline" size={24} color="white" className="mr-2" />
          <Text className="text-white text-lg font-semibold">Đơn đặt tour</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-500 p-3 rounded-2xl flex-row items-center justify-center"
          onPress={() => dispatch({ type: 'LOGOUT' })}
        >
          <Ionicons name="log-out-outline" size={24} color="white" className="mr-2" />
          <Text className="text-white text-lg font-semibold">Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-2xl w-4/5">
            <Text className="text-xl font-bold mb-4">Chỉnh sửa thông tin</Text>

            <Text className="text-base mb-1">Số điện thoại:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-3"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
            />

            <Text className="text-base mb-1">Địa chỉ:</Text>
            <TouchableOpacity 
              className="border border-gray-300 p-2 rounded-lg mb-3"
              onPress={() => setAddressModalVisible(true)}
            >
              <Text>{address || "Chọn địa chỉ"}</Text>
            </TouchableOpacity>

            <Text className="text-base mb-1">Ngày sinh:</Text>
            <TextInput
              className="border border-gray-300 p-2 rounded-lg mb-3"
              value={birthday}
              onChangeText={setBirthday}
              placeholder="Nhập ngày sinh"
            />

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity 
                className="bg-gray-300 p-3 rounded-lg flex-1 mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-center">Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-blue-500 p-3 rounded-lg flex-1"
                onPress={handleSave}
              >
                <Text className="text-white text-center">Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <CustomToast />
      <AddressModal 
        visible={addressModalVisible}
        onClose={() => setAddressModalVisible(false)}
        onSelect={(selectedAddress) => {
          setAddress(selectedAddress);
          setAddressModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
