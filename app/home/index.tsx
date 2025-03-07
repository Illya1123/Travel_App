// HomeScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';
import BodyScreen from './body';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header />
        <BodyScreen />
      </View>
    </SafeAreaView>
  );
}
