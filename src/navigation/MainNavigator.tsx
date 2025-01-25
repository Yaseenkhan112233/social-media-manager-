import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {MainStackParamList} from './types';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RecentPostScreen from '../Screens/RecentPostMain';
import GenerationScreen from '../Screens/GenerationScreen';
import HashtagsScreen from '../Screens/HashtagsScreen';
import Influencer from '../Screens/Influencer';
// import Subscription from '../Screens/Subscription';
// import SubscriptionScreen from '../Screens/SubscriptionScreen';
// import NewGeneration from '../Screens/NewGeneration';

const Stack: any = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
        }}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.screen name="RecentPost" component={RecentPostScreen} />
      <Stack.screen name="GenerationScreen" component={GenerationScreen} />
      <Stack.screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.screen name="HashtagsScreen" component={HashtagsScreen} />
      <Stack.screen name="Influencer" component={Influencer} />
      {/* <Stack.screen name="NewGeneration" component={NewGeneration} /> */}
      {/* <Stack.screen name="SubscriptionScreen" component={SubscriptionScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
