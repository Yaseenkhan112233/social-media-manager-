import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Clipboard,
  ToastAndroid,
  Dimensions, // Import Dimensions for responsive design
} from 'react-native';
import {Layout} from '../constant/layout';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';

// Get screen dimensions for responsiveness
const {width, height} = Dimensions.get('window');

const HashtagsScreen = () => {
  const {goBack} = useNavigation();

  const [input, setInput] = useState('');
  const [allHashtags] = useState([
    {id: '1', tag: '#Love'},
    {id: '2', tag: '#Instagood'},
    {id: '3', tag: '#Happy'},
    {id: '4', tag: '#PhotoOfTheDay'},
    {id: '5', tag: '#Beautiful'},
    {id: '6', tag: '#Trending'},
    {id: '7', tag: '#Life'},
    {id: '8', tag: '#Photography'},
    {id: '9', tag: '#Nature'},
    {id: '10', tag: '#Inspiration'},
    {id: '11', tag: '#Wanderlust'},
    {id: '12', tag: '#TravelGoals'},
    {id: '13', tag: '#AdventureAwaits'},
    {id: '14', tag: '#Travelgram'},
    {id: '15', tag: '#ExploreMore'},
    {id: '16', tag: '#BeachVibes'},
    {id: '17', tag: '#MountainLife'},
    {id: '18', tag: '#RoadTrip'},
    {id: '19', tag: '#TravelPhotography'},
    {id: '20', tag: '#VacationMode'},
    {id: '21', tag: '#FitnessGoals'},
    {id: '22', tag: '#GymLife'},
    {id: '23', tag: '#NoPainNoGain'},
    {id: '24', tag: '#WorkoutMotivation'},
    {id: '25', tag: '#FitFam'},
    {id: '26', tag: '#HealthyLiving'},
    {id: '27', tag: '#YogaLife'},
    {id: '28', tag: '#RunningCommunity'},
    {id: '29', tag: '#EatClean'},
    {id: '30', tag: '#StayFit'},
    {id: '31', tag: '#Foodie'},
    {id: '32', tag: '#InstaFood'},
    {id: '33', tag: '#FoodLovers'},
    {id: '34', tag: '#Yummy'},
    {id: '35', tag: '#HealthyEats'},
    {id: '36', tag: '#DessertLover'},
    {id: '37', tag: '#CoffeeTime'},
    {id: '38', tag: '#TastyTreats'},
    {id: '39', tag: '#HomeCooking'},
    {id: '40', tag: '#FoodPorn'},
    {id: '41', tag: '#FootballFan'},
    {id: '42', tag: '#BasketballLife'},
    {id: '43', tag: '#ChampionMindset'},
    {id: '44', tag: '#SoccerTime'},
    {id: '45', tag: '#CricketLovers'},
    {id: '46', tag: '#GamingCommunity'},
    {id: '47', tag: '#eSports'},
    {id: '48', tag: '#PlayHard'},
    {id: '49', tag: '#TeamSpirit'},
    {id: '50', tag: '#WinningMentality'},
    {id: '51', tag: '#OOTD'},
    {id: '52', tag: '#StyleInspiration'},
    {id: '53', tag: '#Fashionista'},
    {id: '54', tag: '#TrendyLooks'},
    {id: '55', tag: '#StreetStyle'},
    {id: '56', tag: '#FashionAddict'},
    {id: '57', tag: '#FashionBlogger'},
    {id: '58', tag: '#FashionistaStyle'},
    {id: '59', tag: '#StyleGoals'},
    {id: '60', tag: '#FashionGoals'},
    {id: '61', tag: '#HairGoals'},
    {id: '62', tag: '#BeautyInspiration'},
    {id: '63', tag: '#MakeupLover'},
    {id: '64', tag: '#BeautyRoutine'},
    {id: '65', tag: '#GlowUp'},
    {id: '66', tag: '#SkincareRoutine'},
    {id: '67', tag: '#NailArt'},
    {id: '68', tag: '#SelfCare'},
    {id: '69', tag: '#MakeupAddict'},
    {id: '70', tag: '#GlowingSkin'},
    {id: '71', tag: '#TechLovers'},
    {id: '72', tag: '#GadgetGeek'},
    {id: '73', tag: '#SmartphoneAddict'},
    {id: '74', tag: '#Techie'},
    {id: '75', tag: '#InnovativeTech'},
    {id: '76', tag: '#TechSavvy'},
    {id: '77', tag: '#DigitalWorld'},
    {id: '78', tag: '#FutureTech'},
    {id: '79', tag: '#AIRevolution'},
    {id: '80', tag: '#TechInnovation'},
    {id: '81', tag: '#NatureLovers'},
    {id: '82', tag: '#OutdoorAdventure'},
    {id: '83', tag: '#EcoFriendly'},
    {id: '84', tag: '#GoGreen'},
    {id: '85', tag: '#SustainableLiving'},
    {id: '86', tag: '#WildlifePhotography'},
    {id: '87', tag: '#SaveThePlanet'},
    {id: '88', tag: '#EcoWarrior'},
    {id: '89', tag: '#GreenEarth'},
    {id: '90', tag: '#PlanetEarth'},
    {id: '91', tag: '#Motivation'},
    {id: '92', tag: '#SuccessMindset'},
    {id: '93', tag: '#MindsetMatters'},
    {id: '94', tag: '#DreamBig'},
    {id: '95', tag: '#PositiveVibes'},
    {id: '96', tag: '#BelieveInYourself'},
    {id: '97', tag: '#YouCanDoIt'},
    {id: '98', tag: '#HustleHard'},
    {id: '99', tag: '#NeverGiveUp'},
    {id: '100', tag: '#GoalGetter'},
  ]);
  const [filteredHashtags, setFilteredHashtags] = useState(allHashtags);

  const filterHashtags = searchText => {
    const filtered = allHashtags.filter(item =>
      item.tag.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredHashtags(filtered);
  };

  const handleInputChange = text => {
    setInput(text);
    filterHashtags(text);
  };

  const handleSearchButton = () => {
    filterHashtags(input);
  };

  const handleCopyHashtag = hashtag => {
    Clipboard.setString(hashtag);
    ToastAndroid.show('Hashtag copied !', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="" />
      <Text style={styles.title}>Discover New Hashtags</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search hashtags"
          value={input}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.smalltextsixe}>
          Enter your hashtags and we will tell you the best one
        </Text>
      </View>

      <View style={styles.hashtagsBox}>
        <Text style={styles.subheading}>Trending Hashtags</Text>
        <View style={styles.countBox}>
          <Text style={styles.countText}>600 people use</Text>
        </View>

        <FlatList
          data={filteredHashtags}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.hashtag}
              onPress={() => handleCopyHashtag(item.tag)}>
              <Text style={styles.hashtagText}>{item.tag}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HashtagsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Layout.PADDING_VERTICAL_MEDIUM,
    backgroundColor: '#fff',
    padding: Layout.SCREEN_WIDTH * 0.02,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_SMALL,
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B09E8',
    borderRadius: 8,
    padding: Layout.PADDING_SMALL,
    flex: 1,
    marginRight: Layout.MARGIN_SMALL,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: Layout.PADDING_HORIZONTAL_MEDIUM,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },

  hashtagsBox: {
    backgroundColor: '#E2EAF6',
    margin: Layout.MARGIN_MEDIUM * 0.7,
    padding: Layout.PADDING_LARGE,
    borderRadius: 10,
    height: height * 0.8, // Dynamic height based on screen size
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Layout.MARGIN_SMALL,
  },
  countBox: {
    backgroundColor: '#000',
    padding: Layout.PADDING_SMALL,
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginBottom: Layout.MARGIN_SMALL,
  },
  countText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  hashtag: {
    backgroundColor: '#fff',
    padding: Layout.PADDING_SMALL,
    margin: Layout.MARGIN_SMALL,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation: 2,
    flex: 1,
    alignItems: 'center',
  },
  hashtagText: {
    fontWeight: 'bold',
  },
  smalltextsixe: {
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
  },
});
