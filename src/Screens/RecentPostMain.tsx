// import React from 'react';
// import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// import {RecentPostStackParamList} from '../navigation/NavigationTypes';
// import {Layout} from '../constant/layout';

// type RecentPostScreenRouteProp = RouteProp<
//   RecentPostStackParamList,
//   'RecentPostMain'
// >;

// const RecentPostScreen = () => {
//   const {params} = useRoute<RecentPostScreenRouteProp>();
//   const {id, title, image}: any = params;
//   const goback = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.title}>{id}</Text> */}
//       <Text style={styles.title}> {title}</Text>
//       <Image style={styles.image} source={image} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingHorizontal: Layout.PADDING_HORIZONTAL_LARGE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//     marginTop: 16,
//   },
// });

// export default RecentPostScreen;

import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RecentPostStackParamList} from '../navigation/NavigationTypes';

type RecentPostScreenRouteProp = RouteProp<
  RecentPostStackParamList,
  'RecentPostMain'
>;

const RecentPostScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RecentPostScreenRouteProp>();
  const {id, title, description, image}: any = params;

  console.log('Description:', description); // Debugging line

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Image */}
      <Image
        style={styles.image}
        source={typeof image === 'string' ? {uri: image} : image}
      />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>
        {description || 'No description available.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1c1c1c',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginHorizontal: 16,
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
