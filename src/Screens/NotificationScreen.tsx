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

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import {useSavedPosts} from '../context/SavedPostsContext';

import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';
import {Layout} from '../constant/layout';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationScreen = ({route}: any) => {
  const {savedPosts, removePost} = useSavedPosts();

  // State for managing the modal visibility and selected post
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Check if the screen was navigated from HomeStack or BottomTab
  const isFromHomeStack = route.params?.fromHomeStack;

  const handleRemovePress = (post: any) => {
    setSelectedPost(post); // Store the selected post to remove
    setIsModalVisible(true); // Show the confirmation modal
  };

  const handleConfirmRemove = () => {
    if (selectedPost) {
      removePost(selectedPost.timestamp); // Remove the post if confirmed
    }
    setIsModalVisible(false); // Close the modal
  };

  const handleCancelRemove = () => {
    setIsModalVisible(false); // Close the modal without removing
  };

  return (
    <>
      {isFromHomeStack && (
        <View
          style={{
            paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL,
            marginTop: 20,
            position: 'fixed',

            width: '100%',
          }}>
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
                onPress={() => handleRemovePress(post)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={handleCancelRemove}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              Do you really want to remove this post?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={handleCancelRemove}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.confirmButton}
                onPress={handleConfirmRemove}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    color: '#777',
    marginBottom: 8,
  },
  postHashtags: {
    fontSize: 12,
    color: '#999',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    // alignSelf: 'flex-center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: SCREEN_WIDTH - 50,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#cc7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NotificationScreen;
