// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {useSavedPosts} from '../context/SavedPostsContext';

// import {useNavigation} from '@react-navigation/native';
// import CustomHeader from '../Components/CustomHeader';
// import {Layout} from '../constant/layout';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const NotificationScreen = () => {
//   const {savedPosts, removePost} = useSavedPosts();
//   // const {goBack} = useNavigation();

//   if (savedPosts.length === 0) {
//     return (
//       <>
//         <CustomHeader title="Saved Posts" />

//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>No saved posts yet</Text>
//         </View>
//       </>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {savedPosts.map(post => (
//         <View key={post.timestamp} style={styles.postCard}>
//           <Image
//             source={
//               typeof post.images[0] === 'number'
//                 ? post.images[0]
//                 : {uri: post.images[0]}
//             }
//             style={styles.postImage}
//             resizeMode="cover"
//           />
//           <View style={styles.postContent}>
//             <Text style={styles.postTitle}>{post.title}</Text>
//             <Text style={styles.postDescription}>{post.description}</Text>
//             <Text style={styles.postHashtags}>{post.hashtags.join(' ')}</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.removeButton}
//             onPress={() => removePost(post.timestamp)}>
//             <Text style={styles.removeButtonText}>Remove</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     padding: 16,
//     // padding: Layout.PADDING_HORIZONTAL_MEDIUM,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     // paddingHorizontal: Layout.PADDING_HORIZONTAL_LARGE,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   postCard: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },

//   postContent: {
//     padding: 16,
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   postDescription: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//     lineHeight: 20,
//   },
//   postHashtags: {
//     fontSize: 14,
//     color: '#007BFF',
//   },
//   removeButton: {
//     backgroundColor: '#dc3545',
//     padding: 8,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default NotificationScreen;

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import {useSavedPosts} from '../context/SavedPostsContext';

// import {useNavigation} from '@react-navigation/native';
// import CustomHeader from '../Components/CustomHeader';
// import {Layout} from '../constant/layout';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const NotificationScreen = () => {
//   const {savedPosts, removePost} = useSavedPosts();

//   return (
//     <>
//       <View style={{paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL}}>
//         <CustomHeader title="Saved Posts" />
//       </View>

//       {savedPosts.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>No saved posts yet</Text>
//         </View>
//       ) : (
//         <ScrollView style={styles.container}>
//           {savedPosts.map(post => (
//             <View key={post.timestamp} style={styles.postCard}>
//               <Image
//                 source={
//                   typeof post.images[0] === 'number'
//                     ? post.images[0]
//                     : {uri: post.images[0]}
//                 }
//                 style={styles.postImage}
//                 resizeMode="cover"
//               />
//               <View style={styles.postContent}>
//                 <Text style={styles.postTitle}>{post.title}</Text>
//                 <Text style={styles.postDescription}>{post.description}</Text>
//                 <Text style={styles.postHashtags}>
//                   {post.hashtags.join(' ')}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.removeButton}
//                 onPress={() => removePost(post.timestamp)}>
//                 <Text style={styles.removeButtonText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//     padding: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   postCard: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   postContent: {
//     padding: 16,
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   postDescription: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//     lineHeight: 20,
//   },
//   postHashtags: {
//     fontSize: 14,
//     color: '#007BFF',
//   },
//   removeButton: {
//     backgroundColor: '#dc3545',
//     padding: 8,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default NotificationScreen;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSavedPosts} from '../context/SavedPostsContext';

import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';
import {Layout} from '../constant/layout';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationScreen = ({route}) => {
  const {savedPosts, removePost} = useSavedPosts();

  // Check if the screen was navigated from HomeStack or BottomTab
  const isFromHomeStack = route.params?.fromHomeStack;

  return (
    <>
      {isFromHomeStack && (
        <View style={{paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL}}>
          <CustomHeader title="Saved Posts" />
        </View>
      )}

      {savedPosts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved posts yet</Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {savedPosts.map(post => (
            <View key={post.timestamp} style={styles.postCard}>
              <Image
                source={
                  typeof post.images[0] === 'number'
                    ? post.images[0]
                    : {uri: post.images[0]}
                }
                style={styles.postImage}
                resizeMode="cover"
              />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDescription}>{post.description}</Text>
                <Text style={styles.postHashtags}>
                  {post.hashtags.join(' ')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePost(post.timestamp)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  postHashtags: {
    fontSize: 14,
    color: '#007BFF',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
