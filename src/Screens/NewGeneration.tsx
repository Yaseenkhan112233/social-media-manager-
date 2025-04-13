// import {useNavigation, useRoute} from '@react-navigation/native';
// import React, {useState, useCallback, useMemo} from 'react';
// // import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Image,
//   Dimensions,
//   Modal,
//   Platform,
//   Alert,
//   Clipboard,
// } from 'react-native';
// import axios from 'axios'; // For making API requests
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import {IMAGES_PATH} from '../constant/imagesPath';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

// type RouteParams = {
//   contentType: string;
//   creativeType: string;
//   canvasSize: 'square' | 'portrait' | 'landscape';
// };

// interface ContentItem {
//   title: string;
//   description: string;
//   keywords: string[];
//   hashtags: string[];
//   images: string[];
// }

// // Function to check and request storage permissions
// const checkAndRequestPermissions = async () => {
//   try {
//     if (Platform.OS === 'android') {
//       const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
//       const result = await check(permission);
//       if (result === RESULTS.DENIED) {
//         const permissionResult = await request(permission);
//         return permissionResult === RESULTS.GRANTED;
//       }
//       return result === RESULTS.GRANTED;
//     } else if (Platform.OS === 'ios') {
//       const permission = PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;
//       const result = await check(permission);
//       if (result === RESULTS.DENIED) {
//         const permissionResult = await request(permission);
//         return permissionResult === RESULTS.GRANTED;
//       }
//       return result === RESULTS.GRANTED;
//     }
//     return false;
//   } catch (err) {
//     console.error('Error checking permissions:', err);
//     return false;
//   }
// };

// // Function to download an image
// const downloadImage = async (imageUrl: string) => {
//   try {
//     const hasPermission = await checkAndRequestPermissions();
//     if (!hasPermission) {
//       Alert.alert(
//         'Permission Denied',
//         'Please grant storage permission to download images.',
//       );
//       return;
//     }
//     const date = new Date();
//     const timestamp = date.getTime();
//     const ext = imageUrl.split('.').pop()?.split(/[#?]/)[0] || 'jpg';
//     const fileName = `image_${timestamp}.${ext}`;
//     const dirs = ReactNativeBlobUtil.fs.dirs;
//     const path =
//       Platform.OS === 'ios'
//         ? dirs.DocumentDir + '/' + fileName
//         : dirs.DownloadDir + '/' + fileName;
//     const res = await ReactNativeBlobUtil.config({
//       fileCache: true,
//       path: path,
//       appendExt: ext,
//     }).fetch('GET', imageUrl);
//     if (Platform.OS === 'ios') {
//       await ReactNativeBlobUtil.ios.previewDocument(res.path());
//     } else {
//       await ReactNativeBlobUtil.android.addCompleteDownload({
//         title: fileName,
//         description: 'Download complete',
//         mime: 'image/' + ext,
//         path: res.path(),
//         showNotification: true,
//       });
//     }
//     Alert.alert('Success', 'Image downloaded successfully!');
//   } catch (err) {
//     console.error('Error downloading image:', err);
//     Alert.alert('Error', 'Failed to download image. Please try again.');
//   }
// };

// const NewGeneration: React.FC = () => {
//   const {goBack} = useNavigation();
//   const route = useRoute();
//   const {contentType, creativeType, canvasSize} = route.params as RouteParams;
//   const [prompt, setPrompt] = useState('');
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedImages, setSelectedImages] = useState<(number | string)[]>([]);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   // Styles for images based on canvas size
//   const imageStyles = useMemo(() => {
//     const baseWidth = SCREEN_WIDTH - 64;
//     let width = baseWidth;
//     let height = baseWidth;
//     switch (canvasSize) {
//       case 'square':
//         height = width;

//         break;
//       case 'portrait':
//         height = width * 1.5;
//         break;
//       case 'landscape':
//         height = width * 0.67;
//         break;
//     }
//     return {
//       single: {
//         width,
//         height,
//       },
//       multiple: {
//         width: (baseWidth - 16) / 3,
//         height: (baseWidth - 16) / 3,
//       },
//     };
//   }, [canvasSize]);

//   // Dummy static images (you can replace these with your own static images)
//   const STATIC_IMAGES = [
//     IMAGES_PATH.FIRST_SLIDER,
//     IMAGES_PATH.SECOND_SLIDER,
//     IMAGES_PATH.THIRD_SLIDER,
//   ];

//   // Function to generate content using your backend API
//   const API_URL = 'http://192.168.1.17:5000/generate-text'; // Update with your PC's IP
//   const handleGenerate = useCallback(async () => {
//     const trimmedPrompt = prompt.trim();
//     if (!trimmedPrompt) {
//       setError('Please enter a keyword');
//       setFilteredData([]);
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       console.log('Making API request to:', API_URL);
//       const response = await axios.post(API_URL, {
//         prompt: trimmedPrompt,
//       });
//       console.log('API response:', response.data);

//       // Destructure from response.data.data since we wrapped the response
//       const {data} = response.data;

//       setFilteredData([
//         {
//           title: data.title,
//           description: data.description,
//           // Handle hashtags whether they come as string or array
//           hashtags:
//             typeof data.hashtags === 'string'
//               ? data.hashtags.split(' ')
//               : data.hashtags,
//           images: data.images,
//         },
//       ]);
//     } catch (err: any) {
//       console.error('Full error object:', err);
//       console.error('Error fetching data from API:', err.message);
//       setError('An error occurred while generating content');
//     } finally {
//       setLoading(false);
//     }
//   }, [prompt]);

//   // Handle image press to open modal
//   const handleImagePress = useCallback((image: string) => {
//     setSelectedImage(image);
//     setIsModalVisible(true);
//   }, []);

//   // Handle image download
//   const handleDownload = useCallback(async () => {
//     if (selectedImage) {
//       await downloadImage(selectedImage);
//     }
//   }, [selectedImage]);

//   // Close modal
//   const handleCloseModal = useCallback(() => {
//     setIsModalVisible(false);
//     setSelectedImage(null);
//   }, []);

//   // Render image modal
//   const renderImageModal = () => {
//     return (
//       <Modal visible={isModalVisible} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             {imageLoading && (
//               <ActivityIndicator
//                 size="large"
//                 color="#fff"
//                 style={styles.loadingIndicator}
//               />
//             )}

//             {selectedImage && (
//               <Image
//                 source={{uri: selectedImage}}
//                 style={styles.modalImage}
//                 resizeMode="contain"
//                 onLoadStart={() => setImageLoading(true)}
//                 onLoadEnd={() => setImageLoading(false)}
//                 onError={() => setImageError(true)}
//               />
//             )}

//             <View style={styles.modalControls}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleDownload}>
//                 <Text style={styles.modalButtonText}>Download Image</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={handleCloseModal}>
//                 <Text style={styles.modalButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   // Render images for each content item
//   const renderImages = useCallback(
//     (item: ContentItem) => {
//       if (creativeType === 'singleImage') {
//         return (
//           <TouchableOpacity onPress={() => handleImagePress(item.images[0])}>
//             <Image
//               source={{uri: item.images[0]}}
//               style={imageStyles.single}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>
//         );
//       }
//       return (
//         <View style={styles.multipleImagesContainer}>
//           {item.images?.slice(0, 3).map((image, idx) => (
//             <TouchableOpacity key={idx} onPress={() => handleImagePress(image)}>
//               <Image
//                 source={{uri: image}}
//                 style={imageStyles.multiple}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       );
//     },
//     [creativeType, imageStyles, handleImagePress],
//   );
//   // Render content items
//   const renderContent = () => {
//     if (loading) {
//       return (
//         <View>
//           <ActivityIndicator size="large" color="#000" />
//           <Text>Generating content...</Text>
//         </View>
//       );
//     }
//     if (error) {
//       return (
//         <View>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       );
//     }
//     return (
//       <ScrollView>
//         {filteredData.map((item, index) => (
//           <View key={index} style={styles.itemContainer}>
//             {renderImages(item)}
//             <View style={styles.copyCardContainer}>
//               <Text style={styles.copyCardTitle}>Title</Text>
//               <View style={styles.copyCardContent}>
//                 <Text style={styles.copyCardText}>{item.title}</Text>
//                 <TouchableOpacity
//                   style={styles.copyButton}
//                   onPress={() => handleCopy(item.title)}>
//                   <Text style={styles.copyButtonText}>Copy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.copyCardContainer}>
//               <Text style={styles.copyCardTitle}>Description</Text>
//               <View style={styles.copyCardContent}>
//                 <Text style={styles.copyCardText}>{item.description}</Text>
//                 <TouchableOpacity
//                   style={styles.copyButton}
//                   onPress={() => handleCopy(item.description)}>
//                   <Text style={styles.copyButtonText}>Copy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={styles.copyCardContainer}>
//               <Text style={styles.copyCardTitle}>Hashtags</Text>
//               <View style={styles.copyCardContent}>
//                 <Text style={styles.copyCardText}>
//                   {item.hashtags.join(' ')}
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.copyButton}
//                   onPress={() => handleCopy(item.hashtags.join(' '))}>
//                   <Text style={styles.copyButtonText}>Copy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     );
//   };

//   // Handle copying text to clipboard
//   const handleCopy = useCallback((text: string) => {
//     Clipboard.setString(text);
//     Alert.alert('Copied', 'Text copied to clipboard');
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.promptContainer}>
//         <Text style={styles.promptLabel}>Enter your keyword</Text>
//         <TextInput
//           style={styles.input}
//           value={prompt}
//           onChangeText={setPrompt}
//           placeholder="e.g., sunset"
//         />
//         <TouchableOpacity
//           style={styles.generateButton}
//           onPress={handleGenerate}>
//           <Text style={styles.generateButtonText}>Generate</Text>
//         </TouchableOpacity>
//       </View>
//       {renderContent()}
//       {renderImageModal()}
//       <View style={styles.infoContainer}>
//         <Text style={styles.infoLabel}>Selected Parameters</Text>
//         <Text style={styles.infoText}>Content Type: {contentType}</Text>
//         <Text style={styles.infoText}>Creative Type: {creativeType}</Text>
//         <Text style={styles.infoText}>Canvas Size: {canvasSize}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f4f4f4',
//   },
//   promptContainer: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   promptLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     backgroundColor: '#fff',
//     color: '#333',
//   },
//   generateButton: {
//     backgroundColor: '#1c1c1c',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   generateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loading: {
//     marginVertical: 20,
//   },
//   errorText: {
//     fontSize: 16,
//     color: '#dc3545',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   itemContainer: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   multipleImagesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   copyCardContainer: {
//     marginBottom: 16,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     backgroundColor: '#f9f9f9',
//   },
//   copyCardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   copyCardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   copyCardText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#555',
//   },
//   copyButton: {
//     backgroundColor: '#1c1c1c',
//     padding: 6,
//     borderRadius: 8,
//     marginLeft: 10,
//   },
//   copyButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   infoContainer: {
//     marginTop: 16,
//     width: '100%',
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   infoLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(28, 28, 28, 0.98)', // Dark overlay using your 1c1c1c color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   modalImage: {
//     width: '100%',
//     height: '80%', // Give space for controls at bottom
//     backgroundColor: 'transparent',
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{translateX: -15}, {translateY: -15}], // Center the spinner
//   },
//   modalControls: {
//     position: 'absolute',
//     bottom: 40,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 16, // Space between buttons
//     paddingHorizontal: 20,
//   },
//   modalButton: {
//     backgroundColor: '#1c1c1c',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#333',
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default NewGeneration;

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
  Modal,
  Platform,
  Alert,
  Clipboard,
} from 'react-native';
import axios from 'axios'; // For making API requests
import ReactNativeBlobUtil from 'react-native-blob-util';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {IMAGES_PATH} from '../constant/imagesPath';
import {useSavedPosts} from '../context/SavedPostsContext'; // Import SavedPostsContext

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

type RouteParams = {
  contentType: string;
  creativeType: string;
  canvasSize: 'square' | 'portrait' | 'landscape';
};

interface ContentItem {
  title: string;
  description: string;
  keywords: string[];
  hashtags: string[];
  images: string[];
  timestamp: any;
}

// Function to check and request storage permissions
const checkAndRequestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        const permissionResult = await request(permission);
        return permissionResult === RESULTS.GRANTED;
      }
      return result === RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;
      const result = await check(permission);
      if (result === RESULTS.DENIED) {
        const permissionResult = await request(permission);
        return permissionResult === RESULTS.GRANTED;
      }
      return result === RESULTS.GRANTED;
    }
    return false;
  } catch (err) {
    console.error('Error checking permissions:', err);
    return false;
  }
};

// Function to download an image
const downloadImage = async (imageUrl: string) => {
  try {
    const hasPermission = await checkAndRequestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Please grant storage permission to download images.',
      );
      return;
    }
    const date = new Date();
    const timestamp = date.getTime();
    const ext = imageUrl.split('.').pop()?.split(/[#?]/)[0] || 'jpg';
    const fileName = `image_${timestamp}.${ext}`;
    const dirs = ReactNativeBlobUtil.fs.dirs;
    const path =
      Platform.OS === 'ios'
        ? dirs.DocumentDir + '/' + fileName
        : dirs.DownloadDir + '/' + fileName;
    const res = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: path,
      appendExt: ext,
    }).fetch('GET', imageUrl);
    if (Platform.OS === 'ios') {
      await ReactNativeBlobUtil.ios.previewDocument(res.path());
    } else {
      await ReactNativeBlobUtil.android.addCompleteDownload({
        title: fileName,
        description: 'Download complete',
        mime: 'image/' + ext,
        path: res.path(),
        showNotification: true,
      });
    }
    Alert.alert('Success', 'Image downloaded successfully!');
  } catch (err) {
    console.error('Error downloading image:', err);
    Alert.alert('Error', 'Failed to download image. Please try again.');
  }
};

const NewGeneration: React.FC = () => {
  const {goBack} = useNavigation();
  const route = useRoute();
  const {contentType, creativeType, canvasSize} = route.params as RouteParams;
  const [prompt, setPrompt] = useState('');
  const [filteredData, setFilteredData] = useState<ContentItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<(number | string)[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Use SavedPostsContext
  const {addPost} = useSavedPosts();

  // Styles for images based on canvas size
  const imageStyles = useMemo(() => {
    const baseWidth = SCREEN_WIDTH - 64;
    let width = baseWidth;
    let height = baseWidth;
    switch (canvasSize) {
      case 'square':
        height = width;

        break;
      case 'portrait':
        height = width * 1.5;
        break;
      case 'landscape':
        height = width * 0.67;
        break;
    }
    return {
      single: {
        width,
        height,
        marginBottom: 10,
      },
      multiple: {
        width: (baseWidth - 16) / 3,
        height: (baseWidth - 16) / 3,
        margin: 1,
      },
    };
  }, [canvasSize]);

  // Dummy static images (you can replace these with your own static images)
  const STATIC_IMAGES = [
    IMAGES_PATH.FIRST_SLIDER,
    IMAGES_PATH.SECOND_SLIDER,
    IMAGES_PATH.THIRD_SLIDER,
  ];

  // Function to generate content using your backend API
  // const API_URL = 'http://192.168.1.19:5000/generate-content'; // Update with your PC's IP
  // const handleGenerate = useCallback(async () => {
  //   const trimmedPrompt = prompt.trim();
  //   if (!trimmedPrompt) {
  //     setError('Please enter a keyword');
  //     setFilteredData([]);
  //     return;
  //   }
  //   setLoading(true);
  //   setError('');
  //   try {
  //     console.log('Making API request to:', API_URL);
  //     const response = await axios.post(API_URL, {prompt: trimmedPrompt});
  //     console.log('API response:', response.data);

  //     // Destructure from response.data.data since we wrapped the response
  //     const {data} = response.data;

  //     const generatedContent: ContentItem = {
  //       title: data.title || 'No Title', // Fallback for missing title
  //       description: data.description || 'No description available.', // Fallback for missing description
  //       hashtags:
  //         typeof data.hashtags === 'string'
  //           ? data.hashtags.split(' ')
  //           : data.hashtags,
  //       images: data.images,
  //       keywords: [], // Add keywords if needed
  //       timestamp: Date.now(), // Add a timestamp for uniqueness
  //     };

  //     // Save the generated content using the addPost function
  //     await addPost(generatedContent);

  //     setFilteredData([generatedContent]);
  //     // Alert.alert('Success', 'Generated content has been saved!');
  //   } catch (err: any) {
  //     console.error('Full error object:', err);
  //     console.error('Error fetching data from API:', err.message);
  //     setError('An error occurred while generating content');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [prompt, addPost]);

  const API_URL = 'http://192.168.227.90:5000/generate-content'; // Update with your PC's IP

  const handleGenerate = useCallback(async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setError('Please enter a keyword');
      setFilteredData([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Making API request to:', API_URL);
      const response = await axios.post(API_URL, {prompt: trimmedPrompt});
      console.log('API response:', response.data);

      // Destructure from response.data.data
      const {data} = response.data;

      // Check the console log to see exactly what's coming back
      console.log('Image data received:', data.image);

      const generatedContent: ContentItem = {
        title: data.title || 'No Title',
        description: data.description || 'No description available.',
        hashtags:
          typeof data.hashtags === 'string'
            ? data.hashtags.split(' ')
            : data.hashtags,
        // Fix: Convert single image string to array if that's what's returned
        images: data.image ? [data.image] : data.images || [],
        keywords: [],
        timestamp: Date.now(),
      };

      // Log the final object to verify structure
      console.log('Generated content:', generatedContent);

      // Save the generated content using the addPost function
      await addPost(generatedContent);

      setFilteredData([generatedContent]);
    } catch (err: any) {
      console.error('Full error object:', err);
      console.error('Error fetching data from API:', err.message);

      if (err.response) {
        console.error('API error response:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      }

      setError('An error occurred while generating content');
    } finally {
      setLoading(false);
    }
  }, [prompt, addPost]);

  // Handle image press to open modal
  const handleImagePress = useCallback((image: string) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  }, []);

  // Handle image download
  const handleDownload = useCallback(async () => {
    if (selectedImage) {
      await downloadImage(selectedImage);
    }
  }, [selectedImage]);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedImage(null);
  }, []);

  // Render image modal
  const renderImageModal = () => {
    return (
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {imageLoading && (
              <ActivityIndicator
                size="large"
                color="#fff"
                style={styles.loadingIndicator}
              />
            )}
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={styles.modalImage}
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => setImageLoading(false)}
                onError={() => setImageError(true)}
              />
            )}
            <View style={styles.modalControls}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDownload}>
                <Text style={styles.modalButtonText}>Download Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Render images for each content item
  const renderImages = useCallback(
    (item: ContentItem) => {
      if (creativeType === 'singleImage') {
        return (
          <TouchableOpacity
            onPress={() => handleImagePress(item.images[0])}
            key={item.images[0]}>
            <Image source={{uri: item.images[0]}} style={imageStyles.single} />
          </TouchableOpacity>
        );
      }
      return (
        <View style={styles.multipleImagesContainer}>
          {item.images?.slice(0, 3).map((image, idx) => (
            <TouchableOpacity
              onPress={() => handleImagePress(image)}
              key={`${image}-${idx}`}>
              <Image source={{uri: image}} style={imageStyles.multiple} />
            </TouchableOpacity>
          ))}
        </View>
      );
    },
    [creativeType, imageStyles, handleImagePress],
  );

  // Render content items
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1c1c1c" />
          <Text style={styles.loadingText}>Generating content...</Text>
        </View>
      );
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    return (
      <ScrollView>
        {filteredData.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            {renderImages(item)}
            <View style={styles.copyCardContainer}>
              <Text style={styles.copyCardTitle}>Title</Text>
              <View style={styles.copyCardContent}>
                <Text style={styles.copyCardText}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => handleCopy(item.title)}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.copyCardContainer}>
              <Text style={styles.copyCardTitle}>Description</Text>
              <View style={styles.copyCardContent}>
                <Text style={styles.copyCardText}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => handleCopy(item.description)}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.copyCardContainer}>
              <Text style={styles.copyCardTitle}>Hashtags</Text>
              <View style={styles.copyCardContent}>
                <View>
                  {item.hashtags.map((tag, index) => (
                    <Text key={index} style={styles.copyCardText}>
                      #{tag.trim()}
                    </Text>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => handleCopy(item.hashtags.join(' '))}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  // Handle copying text to clipboard
  const handleCopy = useCallback((text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Text copied to clipboard');
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.promptContainer}>
        <Text style={styles.promptLabel}>Enter your keyword</Text>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={setPrompt}
          placeholder="Enter keyword..."
          placeholderTextColor={'#000'}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>📌 Selected Parameters</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>📝 Content Type: {contentType}</Text>
          <Text style={styles.infoText}>🎨 Creative Type: {creativeType}</Text>
          <Text style={styles.infoText}>📐 Canvas Size: {canvasSize}</Text>
        </View>
      </View>

      {renderContent()}
      {renderImageModal()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  promptContainer: {
    width: '100%',
    marginBottom: 16,
  },
  promptLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    color: '#333',
    textAlignVertical: 'top',
  },
  generateButton: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  multipleImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  copyCardContainer: {
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  copyCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  copyCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyCardText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  copyButton: {
    backgroundColor: '#1c1c1c',
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    marginTop: 3,
  },

  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc', // light blue background
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },

  infoText: {
    fontSize: 14,
    color: '#555',
    marginRight: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 28, 28, 0.98)', // Dark overlay using your 1c1c1c color
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '80%', // Give space for controls at bottom
    backgroundColor: 'transparent',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}], // Center the spinner
  },
  modalControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16, // Space between buttons
    paddingHorizontal: 20,
  },
  modalButton: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    minWidth: 120,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NewGeneration;
