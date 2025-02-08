import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {IMAGES_PATH} from '../constant/imagesPath';
import {useAuth} from '../context/AuthContext';
import {Layout} from '../constant/layout';

const {SCREEN_WIDTH, SCREEN_HEIGHT} = Layout;

interface IntroSliderProps {
  onFinish: () => void;
}

const IntroSlider: React.FC<IntroSliderProps> = ({onFinish}) => {
  const {signInWithGoogle, loading} = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Sign in result:', result);
      if (result?.user) {
        console.log('Sign in successful, calling onFinish');
        onFinish();
      }
    } catch (error: any) {
      console.error('Error in handleGoogleSignIn:', error);
      Alert.alert(
        'Sign In Error',
        'Unable to sign in with Google. Please try again.',
        [{text: 'OK'}],
      );
    }
  };

  const data = [
    {
      TopText: 'Automate Your Content Creation',
      Image: IMAGES_PATH.FIRST_SLIDER,
      BottomText:
        'Easily generate engaging posts with AI-powered content suggestions and keyword optimization',
      Button: 'Next',
      onPress: () => handleNext(),
    },
    {
      TopText: 'Analyze Your Competition',
      Image: IMAGES_PATH.SECOND_SLIDER,
      BottomText:
        'Analyze your social media insights and optimize posts to maximize engagement.',
      Button: 'Next',
      onPress: () => handleNext(),
    },
    {
      TopText: 'Boost Your Engagement',
      Image: IMAGES_PATH.THIRD_SLIDER,
      BottomText:
        'Work with your team effortlessly by sharing posts and schedules in real-time.',
      Button: 'Sign in With Google',
      onPress: handleGoogleSignIn,
    },
  ];

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  };

  const renderItem = ({item}: {item: (typeof data)[0]}) => (
    <View style={styles.slide}>
      <View>
        <Text style={styles.titleText}>{item.TopText}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.Image} resizeMode="contain" />
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.descriptionText}>{item.BottomText}</Text>
      </View>
      <TouchableOpacity
        onPress={item.onPress}
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}>
        {item.Button === 'Sign in With Google' && loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>{item.Button}</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const handleScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {backgroundColor: currentIndex === index ? '#000' : '#ddd'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: Layout.PADDING_MEDIUM,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_SMALL,
    // marginTop: Layout.MARGIN_VERTICAL_LARGE,
  },
  imageContainer: {
    height: SCREEN_HEIGHT * 0.56,
    width: SCREEN_WIDTH,
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  bottomTextContainer: {
    width: SCREEN_WIDTH - Layout.PADDING_HORIZONTAL_LARGE * 2,
    marginTop: Layout.MARGIN_VERTICAL_MEDIUM,
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  descriptionText: {
    marginTop: Layout.MARGIN_VERTICAL_MEDIUM,
    marginBottom: Layout.MARGIN_VERTICAL_SMALL,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: Layout.MARGIN_VERTICAL_LARGE * 2,
    width: '100%',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default IntroSlider;
