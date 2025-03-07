import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../slices/themeSlice';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleSwitch = () => {
    dispatch(setTheme(!isDarkMode));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Cài đặt Giao diện</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10 }}>Chế độ tối</Text>
        <Switch value={isDarkMode} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
}