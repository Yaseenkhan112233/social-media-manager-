import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES_PATH} from '../constant/imagesPath';

const Fallback = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image source={IMAGES_PATH.NEW_TODO} />

      <Text style={{color: 'black'}}>Start Adding Your Task</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({});
