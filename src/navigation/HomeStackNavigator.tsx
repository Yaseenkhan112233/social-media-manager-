import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from '../Screens/HomeScreen';
import HomeDetailScreen from '../Screens/HomeDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from './NavigationTypes';
import RecentPostScreen from '../Screens/RecentPostMain';
import GenerationScreen from '../Screens/GenerationScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import HashtagsScreen from '../Screens/HashtagsScreen';
import Influencer from '../Screens/Influencer';
import NewGeneration from '../Screens/NewGeneration';
import NotificationScreen from '../Screens/NotificationScreen';

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="HomeDetail" component={HomeDetailScreen} />
      <HomeStack.Screen name="RecentPost" component={RecentPostScreen} />
      <HomeStack.Screen name="GenerationScreen" component={GenerationScreen} />
      <HomeStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <HomeStack.Screen name="HashtagsScreen" component={HashtagsScreen} />
      <HomeStack.Screen name="Influencer" component={Influencer} />
      <HomeStack.Screen name="NewGeneration" component={NewGeneration} />
      <HomeStack.Screen
        name="NotificationsMain"
        component={NotificationScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
