import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AntDesign from '@expo/vector-icons/AntDesign';

import styles from "../../style/style";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
          <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E5E7EB",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.navbar
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'CurrentList',
          tabBarIcon: ({color}) => <AntDesign name="unordered-list" size={28} color={color} style={styles.navButtonColor} />,
      }} />
      </Tabs>
    </GestureHandlerRootView>
  
  );
}
