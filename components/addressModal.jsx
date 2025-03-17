import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, FlatList, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import addressData from '../utils/country.json'

const { height } = Dimensions.get('window')

export default function AddressModal({ visible, onClose, onSelect }) {
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [selectedWard, setSelectedWard] = useState(null)
  const [openTab, setOpenTab] = useState(null)

  const toggleTab = tab => {
    setOpenTab(openTab === tab ? null : tab)
  }

  const handleSelectProvince = province => {
    setSelectedProvince(province)
    setSelectedDistrict(null)
    setSelectedWard(null)
    setOpenTab(null)
  }

  const handleSelectDistrict = district => {
    setSelectedDistrict(district)
    setSelectedWard(null)
    setOpenTab(null)
  }

  const handleSelectWard = ward => {
    setSelectedWard(ward)
    setOpenTab(null)
  }

  const handleConfirm = () => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const fullAddress = `${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`
      onSelect(fullAddress)
      onClose()
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="bg-white p-5 rounded-2xl w-11/12"
          style={{ maxHeight: height * 0.85 }}
        >
          <Text className="text-2xl font-bold mb-4 text-center text-gray-800">Chọn địa chỉ</Text>

          <TouchableOpacity onPress={() => toggleTab('province')} className="p-3 bg-gray-100 rounded-lg mb-3 shadow-sm">
            <Text className="font-semibold text-gray-700">
              Tỉnh/Thành phố: {selectedProvince ? selectedProvince.name : 'Chọn'}
            </Text>
          </TouchableOpacity>
          {openTab === 'province' && (
            <View style={{ maxHeight: height * 0.3 }}>
              <FlatList
                data={addressData}
                keyExtractor={item => item.code.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectProvince(item)} className="p-3 border-b border-gray-200">
                    <Text className="text-gray-700">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {selectedProvince && (
            <>
              <TouchableOpacity
                onPress={() => toggleTab('district')}
                className="p-3 bg-gray-100 rounded-lg mb-3 shadow-sm"
              >
                <Text className="font-semibold text-gray-700">
                  Quận/Huyện: {selectedDistrict ? selectedDistrict.name : 'Chọn'}
                </Text>
              </TouchableOpacity>
              {openTab === 'district' && (
                <View style={{ maxHeight: height * 0.3 }}>
                  <FlatList
                    data={selectedProvince.districts}
                    keyExtractor={item => item.code.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectDistrict(item)}
                        className="p-3 border-b border-gray-200"
                      >
                        <Text className="text-gray-700">{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </>
          )}

          {selectedDistrict && (
            <>
              <TouchableOpacity onPress={() => toggleTab('ward')} className="p-3 bg-gray-100 rounded-lg mb-3 shadow-sm">
                <Text className="font-semibold text-gray-700">
                  Phường/Xã: {selectedWard ? selectedWard.name : 'Chọn'}
                </Text>
              </TouchableOpacity>
              {openTab === 'ward' && (
                <View style={{ maxHeight: height * 0.3 }}>
                  <FlatList
                    data={selectedDistrict.wards}
                    keyExtractor={item => item.code.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectWard(item)} className="p-3 border-b border-gray-200">
                        <Text className="text-gray-700">{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </>
          )}

          <View className="flex-row justify-between mt-5">
            <TouchableOpacity className="bg-gray-300 p-3 rounded-lg flex-1 mr-2 shadow-sm" onPress={onClose}>
              <Text className="text-center text-gray-700">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-3 rounded-lg flex-1 shadow-sm ${selectedWard ? 'bg-blue-500' : 'bg-gray-300'}`}
              onPress={handleConfirm}
              disabled={!selectedWard}
            >
              <Text className="text-white text-center">Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}
