import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
import {IMAGES_PATH} from '../constant/imagesPath';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useSavedPosts} from '../context/SavedPostsContext';
import CustomHeader from '../Components/CustomHeader';
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
}

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
  const {addPost} = useSavedPosts();

  const [prompt, setPrompt] = useState('');
  const [filteredData, setFilteredData] = useState<ContentItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<(number | string)[]>([]);

  const [selectedImage, setSelectedImage] = useState<number | string | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      },
      multiple: {
        width: (baseWidth - 16) / 3,
        height: (baseWidth - 16) / 3,
      },
    };
  }, [canvasSize]);

  const DummyData: ContentItem[] = [
    {
      title: 'React Native Tutorial for Beginners',
      description:
        'Learn how to build mobile applications using React Native with this comprehensive tutorial. Suitable for beginners who want to get started with mobile app development.',
      keywords: [
        'React Native',
        'Mobile Development',
        'Beginner Tutorial',
        'App',
      ],
      hashtags: ['#ReactNative', '#MobileDev', '#Tutorial', '#Beginner'],
      images: [IMAGES_PATH.AI, IMAGES_PATH.FINANCE, IMAGES_PATH.FITNESS],
    },
    {
      title: 'Top 10 JavaScript Libraries for Web Development',
      description:
        'Discover the top JavaScript libraries that can enhance your web development experience. These libraries will make your coding process faster and more efficient.',
      keywords: [
        'JavaScript',
        'Web Development',
        'Libraries',
        'Coding',
        'Programming',
      ],
      hashtags: ['#JavaScript', '#WebDev', '#Libraries', '#Coding'],
      images: [
        IMAGES_PATH.FIRST_SLIDER,
        IMAGES_PATH.SECOND_SLIDER,
        IMAGES_PATH.THIRD_SLIDER,
      ],
    },
  ];

  const handleCopy = useCallback((text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied', 'Text copied to clipboard');
  }, []);

  const handleGenerate = useCallback(() => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      setError('Please enter a keyword');
      setFilteredData([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = DummyData.filter(item =>
        item.keywords.some(keyword =>
          keyword.toLowerCase().includes(trimmedPrompt.toLowerCase()),
        ),
      );

      setTimeout(() => {
        if (result.length > 0) {
          setFilteredData(result);
          result.forEach(post => addPost(post));
          Alert.alert('Success', 'Posts saved successfully!');
        } else {
          setError('No content found for the given keyword');
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred while generating content');
      setLoading(false);
    }
  }, [prompt, addPost]);

  const handleImagePress = useCallback((image: number | string) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  }, []);

  const handleDownload = useCallback(async () => {
    if (selectedImage && typeof selectedImage === 'string') {
      await downloadImage(selectedImage);
    } else if (selectedImage && typeof selectedImage === 'number') {
      try {
        const hasPermission = await checkAndRequestPermissions();

        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Please grant storage permission to download images.',
          );
          return;
        }

        const resolvedAsset = Image.resolveAssetSource(selectedImage);
        if (!resolvedAsset || !resolvedAsset.uri) {
          throw new Error('Could not resolve asset source');
        }

        const date = new Date();
        const timestamp = date.getTime();
        const fileName = `local_image_${timestamp}.jpg`;
        const dirs = ReactNativeBlobUtil.fs.dirs;

        const destPath =
          Platform.OS === 'ios'
            ? `${dirs.DocumentDir}/${fileName}`
            : `${dirs.DownloadDir}/${fileName}`;

        const response = await ReactNativeBlobUtil.config({
          fileCache: true,
          appendExt: 'jpg',
          path: destPath,
        }).fetch('GET', resolvedAsset.uri);

        const filePath = response.path();

        if (Platform.OS === 'ios') {
          await ReactNativeBlobUtil.ios.previewDocument(filePath);
        } else {
          await ReactNativeBlobUtil.android.addCompleteDownload({
            title: fileName,
            description: 'Image downloaded successfully',
            mime: 'image/jpeg',
            path: filePath,
            showNotification: true,
          });
        }

        Alert.alert(
          'Success',
          `Image saved ${Platform.OS === 'ios' ? 'to Photos' : 'to Downloads'}`,
        );
      } catch (err) {
        console.error('Error downloading image:', err);
        Alert.alert('Error', 'Failed to download image. Please try again.');
      }
    }
  }, [selectedImage]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedImage(null);
  }, []);

  const renderImageModal = () => {
    return (
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={handleCloseModal}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={
                typeof selectedImage === 'number'
                  ? selectedImage
                  : {uri: selectedImage as string}
              }
              style={styles.modalImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}>
              <Text style={styles.downloadButtonText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderImages = useCallback(
    (item: ContentItem) => {
      if (creativeType === 'singleImage') {
        return (
          <TouchableOpacity onPress={() => handleImagePress(item.images[0])}>
            <Image
              source={
                typeof item.images[0] === 'number'
                  ? item.images[0]
                  : {uri: item.images[0]}
              }
              style={[styles.itemImage, imageStyles.single]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      }

      return (
        <View style={styles.multipleImagesContainer}>
          {item.images.slice(0, 3).map((image, idx) => (
            <TouchableOpacity key={idx} onPress={() => handleImagePress(image)}>
              <Image
                source={typeof image === 'number' ? image : {uri: image}}
                style={[styles.itemImage, imageStyles.multiple]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    },
    [creativeType, imageStyles, handleImagePress],
  );

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#007BFF"
          style={styles.loading}
        />
      );
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <View style={styles.resultContainer}>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
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
                <Text style={styles.copyCardText}>
                  {item.hashtags.join(' ')}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => handleCopy(item.hashtags.join(' '))}>
                  <Text style={styles.copyButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.promptContainer}>
        <CustomHeader title="" />
        <Text style={styles.promptLabel}>Enter your keyword</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your keyword...."
          value={prompt}
          onChangeText={setPrompt}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
      {renderImageModal()}

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Selected Parameters</Text>
        <Text style={styles.infoText}>Content Type: {contentType}</Text>
        <Text style={styles.infoText}>Creative Type: {creativeType}</Text>
        <Text style={styles.infoText}>Canvas Size: {canvasSize}</Text>
      </View>
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
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  multipleImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemImage: {
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: '#1c1c1c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  resultContainer: {
    width: '100%',
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
  image: {
    width: '100%',
    height: SCREEN_WIDTH - 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  backButton: {
    marginRight: 10,
    // position: 'static',
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
    marginTop: 16,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 12,
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
export default NewGeneration;
