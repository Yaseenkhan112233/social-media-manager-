import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileScreen from '../Screens/ProfileScreen';
import ProfileDetailScreen from '../Screens/ProfileDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileStackParamList} from './NavigationTypes';
import Influencer from '../Screens/Influencer';

const ProfileStack = createStackNavigator<ProfileStackParamList>();
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="influencer" component={Influencer} />
      <ProfileStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({});
