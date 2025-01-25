import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Layout} from '../constant/layout'; // Ensure the Layout constants are imported
import Icon from 'react-native-vector-icons/AntDesign'; // Importing heart icon from AntDesign

interface InfluencerCardProps {
  profileImage: any;
  name: string;
  role: string;
  coverImage1: any;
  coverImage2: any;
  coverImage3: any;
  title: string;
  description: string;
  onAddFavourite: () => void;
  onProfile: () => void;
  buttonText: string; // Add a new prop for the button text
  isFavourite: boolean;
}

const {width} = Dimensions.get('window');

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  profileImage,
  name,
  role,
  coverImage1,
  coverImage2,
  coverImage3,
  title,
  description,
  onAddFavourite,
  onProfile,
  buttonText,
  isFavourite, // Add this to props
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          gap: '2%',
        }}
        onPress={onAddFavourite}>
        <Text style={styles.addFavourite}>{buttonText}</Text>
        <Icon name="hearto" size={15} color="red" />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          gap: '2%',
        }}
        onPress={onAddFavourite}>
        <Text style={styles.addFavourite}>{buttonText}</Text>
        <Icon name={isFavourite ? 'heart' : 'hearto'} size={15} color="red" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={onProfile}>
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onProfile} style={styles.profileButton}>
            <Text style={styles.profileButtonText}>PROFILE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mediaSection}>
        <Image source={coverImage1} style={styles.coverImageLeft} />

        <View style={styles.coverImagesColumn}>
          <Image source={coverImage2} style={styles.coverImageRight} />
          <Image source={coverImage3} style={styles.coverImageRight} />
        </View>
      </View>

      <View style={styles.textContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default InfluencerCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: Layout.MARGIN_MEDIUM, // 4% of screen width
    padding: Layout.PADDING_LARGE, // 4% of screen width
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: width - Layout.MARGIN_LARGE * 2, // Adjusted for padding
    alignSelf: 'center', // Center the card on the screen
  },
  header: {
    flexDirection: 'row', // Make the header content align horizontally
    justifyContent: 'space-between', // Distribute space between the profile and action buttons
    alignItems: 'center',
    marginBottom: Layout.MARGIN_SMALL, // 2% of screen width
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow it to take available space
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Layout.MARGIN_SMALL, // 2% of screen width
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  role: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row', // Align the action buttons (Add to Favourite & Profile) horizontally
    alignItems: 'center',
  },
  addFavourite: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    // alignSelf: 'flex-end',
  },
  profileButton: {
    backgroundColor: '#fff',
    paddingVertical: Layout.PADDING_VERTICAL_SMALL, // 1% of screen height
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL, // 3% of screen width
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
  },
  profileButtonText: {
    color: '#000',
    fontSize: 10,
  },
  mediaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.MARGIN_SMALL, // 2% of screen width
  },
  coverImageLeft: {
    width: '45%', // Image takes 45% of the available space
    height: 230, // Fixed height
    borderRadius: 8,
    marginRight: Layout.MARGIN_SMALL, // 2% of screen width
    resizeMode: 'cover', // Ensures the image covers the space without distortion
  },
  coverImagesColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 230, // Ensure the two right images fill the same height
    width: '53%', // Set the width for the two images on the right
  },
  coverImageRight: {
    width: '100%', // Ensure each image takes the full width of its container
    height: 110, // Fixed height for each image
    borderRadius: 8,
    marginBottom: Layout.MARGIN_SMALL, // 2% of screen width
    resizeMode: 'cover', // Ensures the image is responsive and scales properly
  },
  textContent: {
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL, // 3% of screen width
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: Layout.MARGIN_SMALL, // 2% of screen width
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});
