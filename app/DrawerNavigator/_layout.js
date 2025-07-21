import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { Drawer } from 'expo-router/drawer';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import palettes from '../../themes/palettes';
import useNavigation from '../../utils/useNavigation';
import useWindowDimensions from '../../utils/useWindowDimensions';

function DefaultDrawerIcon({ tintColor }) {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

export default function Layout() {
  const theme = useTheme();

  const tabBarOrDrawerIcons = {
    BottomTabNavigator: '',
    GoToTheWebScreen: '',
    OpenAIScreen: '',
  };
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: theme.colors.branding.primary,
        drawerInactiveTintColor: theme.colors.text.light,
        drawerLabelStyle: theme.typography.subtitle2,
        drawerStyle: { backgroundColor: theme.colors.background.base },
        headerLeft: ({ tintColor }) => (
          <DefaultDrawerIcon tintColor={tintColor} />
        ),
        headerStyle: {
          backgroundColor: theme.colors.background.base,
          borderBottomColor: 'transparent',
        },
        headerTintColor: theme.colors.text.strong,
        headerTitleStyle: theme.typography.headline5,
      }}
      initialRouteName={'index'}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerLeft: ({ tintColor }) => (
            <DefaultDrawerIcon tintColor={tintColor} />
          ),
          title: 'Go to the web',
        }}
      />

      <Drawer.Screen
        name="OpenAIScreen"
        options={{
          headerLeft: ({ tintColor }) => (
            <DefaultDrawerIcon tintColor={tintColor} />
          ),
          title: 'Open AI',
        }}
      />

      <Drawer.Screen
        name="BottomTabNavigator"
        options={{
          title: 'Bottom Tab Navigator',
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({});
