import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuth} from '../context/AuthContext';

const SettingsDetailScreen = () => {
  const {logout, currentUser} = useAuth();

  return <View></View>;
};

export default SettingsDetailScreen;

const styles = StyleSheet.create({});
