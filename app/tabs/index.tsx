import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '@/app/home';
import ProfileScreen from '@/app/profile';
import ExploreScreen from '@/app/explore';
import TripsScreen from '@/app/trip';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Thông tin') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          } else if (route.name === 'Chuyến đi') {
            iconName = focused ? 'car-sport-sharp' : 'car-sport-outline';
          } else if (route.name === 'Khám phá') {
            iconName = focused ? 'navigate-circle-sharp' : 'navigate-circle-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8224cf',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Khám phá" component={ExploreScreen} />
      <Tab.Screen name="Chuyến đi" component={TripsScreen} />
      <Tab.Screen name="Thông tin" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
