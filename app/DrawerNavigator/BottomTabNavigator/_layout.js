import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { Tabs } from 'expo-router';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import palettes from '../../../themes/palettes';
import useNavigation from '../../../utils/useNavigation';
import useWindowDimensions from '../../../utils/useWindowDimensions';

export default function Layout() {
  const theme = useTheme();

  const tabBarOrDrawerIcons = {
    BlankScreen: 'AntDesign/home',
    CalendarTestAmitScreen: 'Entypo/game-controller',
    AddBlocksScreen: 'AntDesign/table',
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background.base,
          borderBottomColor: 'transparent',
        },
        headerTintColor: theme.colors.text.strong,
        headerTitleStyle: theme.typography.headline5,
        tabBarActiveTintColor: theme.colors.branding.primary,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarLabelStyle: theme.typography.caption,
        tabBarStyle: {
          backgroundColor: theme.colors.background.base,
          borderTopColor: 'transparent',
        },
      }}
      initialRouteName={'index'}
    >
      <Tabs.Screen
        name="AddBlocksScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/table"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          tabBarStyle: { borderTopColor: 'transparent' },
          title: 'Add Blocks',
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="AntDesign/home"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          tabBarStyle: { borderTopColor: 'transparent' },
          title: 'Blank',
        }}
      />

      <Tabs.Screen
        name="CalendarTestAmitScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="Entypo/game-controller"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          tabBarStyle: { borderTopColor: 'transparent' },
          title: 'Calendar Test - Amit',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
