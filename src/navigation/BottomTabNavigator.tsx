import React, {useState, useEffect} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from './NavigationTypes';
import HomeStackNavigator from './HomeStackNavigator';
import NotificationsStackNavigator from './NotificationsStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {TabBarIcon} from '../Components/TabBarIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <BottomTab.Navigator
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => {
          const iconMap: any = {
            Home: 'home',
            History: 'time',
            Influencer: 'star',
            Profile: 'person',
          };

          const iconName = iconMap[route.name];

          return (
            <TabBarIcon
              name={iconName}
              color={color}
              size={24}
              focused={focused}
            />
          );
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: (() => {
          const currentRoute =
            navigation?.getState()?.routes[navigation.getState().index];
          const routeName =
            currentRoute?.state?.routes?.slice(-1)[0]?.name ?? '';
          const params = currentRoute?.state?.routes?.slice(-1)[0]?.params;

          // Check if the screen is accessed from recent posts
          const isFromRecentPosts = params?.fromRecentPosts === true;

          const hideTabBarScreens = [
            'GenerationScreen',
            'SettingsScreen',
            'Influencer',
            'HashtagsScreen',
          ];

          // Hide tab bar if screen is in hideTabBarScreens OR if it's NotificationsMain accessed from recent posts
          if (
            isKeyboardVisible ||
            hideTabBarScreens.includes(routeName) ||
            (routeName === 'NotificationsMain' && isFromRecentPosts)
          ) {
            return {display: 'none'};
          }

          return {
            display: 'flex',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
          };
        })(),
        tabBarLabel: route.name,
      })}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{tabBarLabel: 'Home'}}
      />
      <BottomTab.Screen
        name="History"
        component={NotificationsStackNavigator}
        options={{tabBarLabel: 'History'}}
      />
      <BottomTab.Screen
        name="Influencer"
        component={ProfileStackNavigator}
        options={{tabBarLabel: 'Influencer'}}
      />
      <BottomTab.Screen
        name="Profile"
        component={SettingsStackNavigator}
        options={{tabBarLabel: 'Profile'}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
