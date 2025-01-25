import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RecentPostStackParamList} from '../navigation/NavigationTypes';

type RecentPostScreenRouteProp = RouteProp<
  RecentPostStackParamList,
  'RecentPostMain'
>;

const RecentPostScreen = () => {
  const {params} = useRoute<RecentPostScreenRouteProp>();
  const {id, title, image}: any = params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.title}> {title}</Text>
      <Image style={styles.image} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 16,
  },
});

export default RecentPostScreen;
