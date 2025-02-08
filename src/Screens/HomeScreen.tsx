import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import React, {useMemo} from 'react';
import {IMAGES_PATH} from '../constant/imagesPath';
import {Layout} from '../constant/layout';
import {useNavigation} from '@react-navigation/native';
import {useSavedPosts} from '../context/SavedPostsContext';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {savedPosts} = useSavedPosts();

  const influencerData = [
    {id: '1', name: 'Alina', image: IMAGES_PATH.FIRST_SLIDER},
    {id: '2', name: 'Ali', image: IMAGES_PATH.SECOND_SLIDER},
    {id: '3', name: 'Reback', image: IMAGES_PATH.FIRST_SLIDER},
    {id: '4', name: 'Anisa', image: IMAGES_PATH.SECOND_SLIDER},
    {id: '5', name: 'Laila', image: IMAGES_PATH.FIRST_SLIDER},
  ];

  const hashtagData = [
    {id: '1', tag: '#ai image'},
    {id: '2', tag: '#ai image'},
    {id: '3', tag: '#ai image'},
    {id: '4', tag: '#ai image'},
    {id: '5', tag: '#ai image'},
  ];

  // Get the latest 4 saved posts
  const latestPosts = useMemo(() => {
    return savedPosts.slice(-4).reverse();
  }, [savedPosts]);

  const handleCardPress = item => {
    navigate('RecentPost', {
      id: item.timestamp,
      title: item.title,
      image: item.images[0],
    });
  };

  const renderCard = ({item}) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Image
        style={styles.cardImage}
        source={
          typeof item.images[0] === 'number'
            ? item.images[0]
            : {uri: item.images[0]}
        }
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleCreateButton = () => {
    navigate('GenerationScreen');
  };

  const HandleOnProfile = () => {
    navigate('SettingsScreen');
  };

  const HandleOnHashtag = () => {
    navigate('HashtagsScreen');
  };

  const HandleOnInfluencer = () => {
    navigate('Influencer', {fromHomeStack: true});
  };

  const handleOnSeeAllRecentPost = () => {
    navigate('NotificationsMain', {
      fromHomeStack: true,
    });
  };

  const handleHashtagPress = hashtag => {
    Clipboard.setString(hashtag);
    ToastAndroid.show('Hashtag copied!', ToastAndroid.SHORT);
  };

  const renderRecentPostsSection = () => {
    if (latestPosts.length === 0) {
      return (
        <View style={styles.noPostsContainer}>
          <Text style={styles.noPostsText}>No Recent Posts</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={latestPosts}
        renderItem={renderCard}
        keyExtractor={item => item.timestamp.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardsContainer}
        columnWrapperStyle={styles.cardRow}
        scrollEnabled={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={IMAGES_PATH.FIRST_SLIDER} />
        <Text style={styles.title}>Social Smart AI</Text>
        <TouchableOpacity onPress={HandleOnProfile}>
          <Image style={styles.image} source={IMAGES_PATH.SECOND_SLIDER} />
        </TouchableOpacity>
      </View>

      {/* Button to Create Post */}
      <View>
        <TouchableOpacity style={styles.button} onPress={handleCreateButton}>
          <Icon name="add" size={30} color="#fff" />
          <Text style={styles.buttonText}>Create a Post</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Posts Section */}
      {/* <View style={{height: Layout.SCREEN_HEIGHT * 0.3}}> */}
      <View style={styles.recentPostContainer}>
        <Text style={styles.recentPostText}>Recent Posts</Text>
        <TouchableOpacity onPress={handleOnSeeAllRecentPost}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Render Recent Posts or No Posts message */}
      <View style={{height: Layout.SCREEN_HEIGHT * 0.401}}>
        {renderRecentPostsSection()}
      </View>
      {/* </View> */}

      {/* Influencers Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Influencers</Text>
        <TouchableOpacity onPress={HandleOnInfluencer}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={influencerData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={HandleOnInfluencer}
            key={item.id}
            style={styles.influencerCard}>
            <Image source={item.image} style={styles.influencerImage} />
            <Text style={styles.influencerName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.influencerList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Hashtags Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hashtags</Text>
        <TouchableOpacity onPress={HandleOnHashtag}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={hashtagData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            style={styles.hashtagCard}
            onPress={() => handleHashtagPress(item.tag)}>
            <Text
              style={styles.hashtagText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.tag}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.hashtagList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.PADDING_MEDIUM,
    marginTop: Layout.MARGIN_LARGE,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: Layout.SCREEN_HEIGHT * 0.05,
    width: Layout.SCREEN_WIDTH * 0.11,
    borderRadius: 50,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
  },
  button: {
    marginTop: Layout.MARGIN_SMALL,
    height: Layout.SCREEN_HEIGHT * 0.07,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: Layout.SCREEN_WIDTH * 0.03,
  },
  recentPostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.MARGIN_SMALL,
    // height: 80,
  },
  recentPostText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginTop: Layout.MARGIN_SMALL,
    paddingBottom: Layout.MARGIN_LARGE,
  },
  cardRow: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: '48%',
    padding: Layout.PADDING_SMALL,
    marginBottom: Layout.MARGIN_SMALL,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: Layout.MARGIN_SMALL * 0.09,
  },
  cardImage: {
    width: '100%',
    height: Layout.SCREEN_HEIGHT * 0.1,
    borderRadius: 10,
    marginBottom: Layout.MARGIN_SMALL,
  },
  cardTitle: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.MARGIN_MEDIUM,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  influencerList: {
    marginVertical: Layout.MARGIN_SMALL * 0.2,
  },
  influencerCard: {
    alignItems: 'center',
    marginHorizontal: Layout.MARGIN_SMALL * 0.3,
    padding: Layout.PADDING_SMALL,
    width: Layout.SCREEN_WIDTH * 0.25,
  },
  influencerImage: {
    width: Layout.SCREEN_WIDTH * 0.2,
    height: Layout.SCREEN_WIDTH * 0.2,
    borderRadius: 50,
  },
  influencerName: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Layout.MARGIN_SMALL * 0.5,
  },
  hashtagList: {
    marginVertical: Layout.MARGIN_SMALL,
  },
  hashtagCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 15,
    // paddingHorizontal: Layout.PADDING_SMALL * 0.5,
    paddingVertical: Layout.PADDING_MEDIUM * 0.5,
    marginHorizontal: Layout.MARGIN_SMALL * 0.4,
    minWidth: 80,
    justifyContent: 'center',
  },
  hashtagText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  noPostsContainer: {
    width: '100%',
    height: Layout.SCREEN_HEIGHT * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginTop: Layout.MARGIN_SMALL,
  },
  noPostsText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
