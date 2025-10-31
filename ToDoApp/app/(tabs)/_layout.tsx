import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'CurrentList',
          tabBarIcon: ({color}) => <AntDesign name="unordered-list" size={28} color={color} />,
      }} />w
      <Tabs.Screen 
        name='doneTasks'
        options={{
          title: 'Done tasks',
          tabBarIcon: ({ color }) => <AntDesign name="file-done" size={24} color={color} />,
        }}
      />
      </Tabs>
  );
}
