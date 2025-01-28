import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NotificationDetailScreen from '../Screens/NotificationDetailScreen';
import NotificationScreen from '../Screens/NotificationScreen';

import {NotificationsStackParamList} from './NavigationTypes';
import {createStackNavigator} from '@react-navigation/stack';

const NotificationsStack = createStackNavigator<NotificationsStackParamList>();
const NotificationsStackNavigator = () => {
  return (
    <NotificationsStack.Navigator screenOptions={{headerShown: false}}>
      <NotificationsStack.Screen
        name="NotificationsMain"
        component={NotificationScreen}
      />
      <NotificationsStack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
      />
    </NotificationsStack.Navigator>
  );
};

export default NotificationsStackNavigator;

const styles = StyleSheet.create({});
