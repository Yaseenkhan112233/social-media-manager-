import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfluencerCard from '../Components/InfluencerCard';
import {IMAGES_PATH} from '../constant/imagesPath';
import {Layout} from '../constant/layout';

import CustomHeader from '../Components/CustomHeader';

// Define interfaces
interface Influencer {
  id: number;
  name: string;
  role: string;
  image: string;
  isFavourite: boolean;
}

const Influencer = ({route}) => {
  const [activeTab, setActiveTab] = useState<string>('Latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favourites, setFavourites] = useState<Influencer[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([
    {
      id: 1,
      name: 'Jerome Bell',
      role: 'Photographer',
      image: IMAGES_PATH.FIRST_SLIDER,
      isFavourite: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Lifestyle Blogger',
      image: IMAGES_PATH.SECOND_SLIDER,
      isFavourite: false,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Travel Vlogger',
      image: IMAGES_PATH.FIRST_SLIDER,
      isFavourite: false,
    },
  ]);

  const isFromHomeStack = route.params?.fromHomeStack;

  const [topInfluencers, setTopInfluencers] = useState<Influencer[]>([
    {
      id: 4,
      name: 'Alice Brown',
      role: 'Fitness Coach',
      image: IMAGES_PATH.SECOND_SLIDER,
      isFavourite: false,
    },
    {
      id: 5,
      name: 'Emily Davis',
      role: 'Food Blogger',
      image: IMAGES_PATH.THIRD_SLIDER,
      isFavourite: false,
    },
  ]);

  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFavourites = await AsyncStorage.getItem('favourites');
        const parsedFavourites = storedFavourites
          ? JSON.parse(storedFavourites)
          : [];

        setFavourites(parsedFavourites);

        // Update isFavourite in influencers and topInfluencers
        const updatedInfluencers = influencers.map(influencer => ({
          ...influencer,
          isFavourite: parsedFavourites.some(fav => fav.id === influencer.id),
        }));
        setInfluencers(updatedInfluencers);

        const updatedTopInfluencers = topInfluencers.map(influencer => ({
          ...influencer,
          isFavourite: parsedFavourites.some(fav => fav.id === influencer.id),
        }));
        setTopInfluencers(updatedTopInfluencers);
      } catch (error) {
        console.error('Error loading favourites from AsyncStorage:', error);
      }
    };

    loadFavourites();
  }, []);

  const saveFavourites = async (updatedFavourites: Influencer[]) => {
    try {
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(updatedFavourites),
      );
    } catch (error) {
      console.error('Error saving favourites to AsyncStorage:', error);
    }
  };

  const toggleFavourite = (influencer: Influencer) => {
    const updatedInfluencer = {
      ...influencer,
      isFavourite: !influencer.isFavourite,
    };

    // Update Latest tab
    setInfluencers(prev =>
      prev.map(item => (item.id === influencer.id ? updatedInfluencer : item)),
    );

    // Update Top tab
    setTopInfluencers(prev =>
      prev.map(item => (item.id === influencer.id ? updatedInfluencer : item)),
    );

    // Update Favourites
    let updatedFavourites;
    if (!influencer.isFavourite) {
      // Adding to favourites
      updatedFavourites = [...favourites, updatedInfluencer];
      setFavourites(updatedFavourites);
      Alert.alert(`${influencer.name} added to favourites`);
    } else {
      // Removing from favourites
      updatedFavourites = favourites.filter(fav => fav.id !== influencer.id);
      setFavourites(updatedFavourites);
      Alert.alert(`${influencer.name} removed from favourites`);
    }

    saveFavourites(updatedFavourites);
  };

  const filterData = (data: Influencer[]) => {
    return data.filter(
      influencer =>
        influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        influencer.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const data =
    activeTab === 'Latest'
      ? filterData(influencers)
      : activeTab === 'Top'
      ? filterData(topInfluencers)
      : filterData(favourites);

  return (
    <View style={styles.container}>
      {/* Conditionally render the CustomHeader only if the screen is from Home Stack */}
      {isFromHomeStack && (
        <View>
          <CustomHeader title="" />
        </View>
      )}

      <Text style={styles.heading}>Influencer Identification</Text>
      <View style={styles.tabContainer}>
        {['Latest', 'Top', 'Favourite'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for influencers..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {data.map(influencer => (
          <InfluencerCard
            key={influencer.id}
            profileImage={influencer.image}
            name={influencer.name}
            role={influencer.role}
            coverImage1={influencer.image}
            coverImage2={influencer.image}
            coverImage3={influencer.image}
            title="Lorem ipsum"
            description="Minim dolor in amet nulla laboris enim dolore consequat..."
            onAddFavourite={() => toggleFavourite(influencer)}
            onProfile={() =>
              Alert.alert(`Viewing profile of ${influencer.name}`)
            }
            buttonText={
              influencer.isFavourite
                ? 'Remove From Favourite'
                : 'Add To Favourite'
            }
            isFavourite={influencer.isFavourite}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Influencer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.PADDING_HORIZONTAL_MEDIUM,
    backgroundColor: '#F4F4F4',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    borderRadius: Layout.PADDING_SMALL,
    padding: Layout.PADDING_SMALL,
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Layout.PADDING_VERTICAL_SMALL,
    borderRadius: Layout.PADDING_SMALL,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: Layout.PADDING_SMALL,
    padding: Layout.PADDING_HORIZONTAL_SMALL,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL,
  },
});
