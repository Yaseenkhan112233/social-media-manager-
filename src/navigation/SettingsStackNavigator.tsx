import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SettingsScreen from '../Screens/SettingsScreen';
import SettingsDetailScreen from '../Screens/SettingsDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsStackParamList} from './NavigationTypes';
import SubscriptionScreen from '../Screens/SubscriptionScreen';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen
        name="SettingsDetail"
        component={SettingsDetailScreen}
      />
      <SettingsStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;

const styles = StyleSheet.create({});
