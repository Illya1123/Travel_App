import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Input({ 
  icon, 
  placeholder, 
  keyboardType = 'default', 
  type = 'text' ,
  value,
  onChangeText
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-12 border border-gray-400 rounded-lg mb-4 flex-row items-center">
      {/* Icon phía trước input */}
      <Ionicons
        name={icon}
        size={24}
        color="gray"
        className="px-2"
      />

      {/* Input có điều kiện hiển thị mật khẩu hoặc bình thường */}
      <TextInput
        className="flex-1 px-4"
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={type === 'password' && !showPassword}
        value={value}
        onChangeText={onChangeText}
      />

      {/* Nút ẩn/hiện mật khẩu nếu là input loại mật khẩu */}
      {type === 'password' && (
        <TouchableOpacity
          className="p-2"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
