// src/screens/BodyScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TourList from '../../components/tourList';

export default function BodyScreen() {
  return (
    <View style={styles.container}>
      <TourList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
