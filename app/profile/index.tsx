import React from 'react';
import { View, Text } from 'react-native';
import SettingScreen from './setting';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>Màn hình Cài đặt</Text>
      <SettingScreen />
    </View>
  );
}