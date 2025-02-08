// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import {IMAGES_PATH} from '../constant/imagesPath';
// import {Layout} from '../constant/layout';

// const SubscriptionScreen = () => {
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* Top Image */}
//         <Image source={IMAGES_PATH.SUBSCRIPTION} style={styles.topImage} />

//         {/* Header Text */}
//         <Text style={styles.headerText}>Explore, Share, Inspire</Text>
//         <Text style={styles.subHeaderText}>
//           Unlock pro features for a limitless experience
//         </Text>

//         {/* Subscription Options */}
//         <View style={styles.optionsContainer}>
//           <TouchableOpacity style={[styles.option, styles.optionSelected]}>
//             <View style={styles.popularTag}>
//               <Text style={styles.popularText}>Most Popular</Text>
//             </View>
//             <Text style={styles.optionLabel}>7-Day Full Access</Text>
//             <Text style={styles.optionSubLabel}>
//               Perfect for quick exploration
//             </Text>
//             <Text style={styles.optionPrice}>$0.49</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.option}>
//             <Text style={styles.optionLabel}>Monthly Access</Text>
//             <Text style={styles.optionSubLabel}>Enjoy unlimited access</Text>
//             <Text style={styles.optionPrice}>$2.99</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Buy Now Button */}
//         <TouchableOpacity style={styles.buyNowButton}>
//           <Text style={styles.buyNowText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: Layout.MARGIN_HORIZONTAL_MEDIUM,
//     justifyContent: 'space-between',
//   },
//   topImage: {
//     width: Layout.SCREEN_WIDTH * 1.1,
//     height: Layout.SCREEN_HEIGHT * 0.5,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     // marginVertical: Layout.MARGIN_VERTICAL_MEDIUM,
//   },
//   headerText: {
//     fontSize: Layout.SCREEN_WIDTH * 0.06,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: Layout.MARGIN_VERTICAL_SMALL,
//   },
//   subHeaderText: {
//     fontSize: Layout.SCREEN_WIDTH * 0.04,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: Layout.MARGIN_VERTICAL_LARGE,
//   },
//   optionsContainer: {
//     marginBottom: Layout.MARGIN_VERTICAL_LARGE,
//   },
//   option: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: Layout.SCREEN_WIDTH * 0.03,
//     padding: Layout.PADDING_MEDIUM,
//     marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   optionSelected: {
//     borderColor: '#007BFF',
//     borderWidth: 2,
//   },
//   optionLabel: {
//     fontSize: Layout.SCREEN_WIDTH * 0.045,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: Layout.MARGIN_VERTICAL_SMALL,
//   },
//   optionSubLabel: {
//     fontSize: Layout.SCREEN_WIDTH * 0.035,
//     color: '#777',
//     marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
//   },
//   optionPrice: {
//     fontSize: Layout.SCREEN_WIDTH * 0.05,
//     fontWeight: 'bold',
//     color: '#007BFF',
//   },
//   popularTag: {
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     backgroundColor: '#007BFF',
//     paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL,
//     paddingVertical: Layout.PADDING_VERTICAL_SMALL,
//     borderRadius: Layout.SCREEN_WIDTH * 0.02,
//   },
//   popularText: {
//     color: '#fff',
//     fontSize: Layout.SCREEN_WIDTH * 0.03,
//     fontWeight: '600',
//   },
//   buyNowButton: {
//     backgroundColor: '#007BFF',
//     padding: Layout.PADDING_MEDIUM,
//     borderRadius: Layout.SCREEN_WIDTH * 0.03,
//     alignItems: 'center',
//     marginBottom: Layout.MARGIN_VERTICAL_SMALL,
//   },
//   buyNowText: {
//     color: '#fff',
//     fontSize: Layout.SCREEN_WIDTH * 0.05,
//     fontWeight: 'bold',
//   },
// });

// export default SubscriptionScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import {IMAGES_PATH} from '../constant/imagesPath';

// const {width, height} = Dimensions.get('window');

// const SubscriptionScreen = () => {
//   const [selectedOption, setSelectedOption] = useState(0);

//   const handleOptionSelect = index => {
//     setSelectedOption(index);
//   };

//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.container}>
//         {/* Top Image Container */}
//         <View style={styles.imageContainer}>
//           <Image source={IMAGES_PATH.SUBSCRIPTION} style={styles.topImage} />
//         </View>

//         <View style={styles.contentContainer}>
//           {/* Header Text */}
//           <Text style={styles.headerText}>Explore, Share, Inspire</Text>
//           <Text style={styles.subHeaderText}>
//             Unlock pro features for a limitless experience
//           </Text>

//           {/* Subscription Options */}
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.option,
//                 selectedOption === 0 && styles.optionSelected,
//               ]}
//               onPress={() => handleOptionSelect(0)}>
//               <View style={styles.popularTag}>
//                 <Text style={styles.popularText}>Popular</Text>
//               </View>
//               <Text style={styles.optionLabel}>7-Day</Text>
//               <Text style={styles.optionSubLabel}>Quick explore</Text>
//               <Text style={styles.optionPrice}>$0.49</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.option,
//                 selectedOption === 1 && styles.optionSelected,
//               ]}
//               onPress={() => handleOptionSelect(1)}>
//               <Text style={styles.optionLabel}>Monthly</Text>
//               <Text style={styles.optionSubLabel}>Full access</Text>
//               <Text style={styles.optionPrice}>$2.99</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Buy Now Button */}
//           <TouchableOpacity style={styles.buyNowButton}>
//             <Text style={styles.buyNowText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: width,
//     height: height * 0.4,
//     overflow: 'hidden',
//   },
//   topImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   contentContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   headerText: {
//     fontSize: width * 0.06,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subHeaderText: {
//     fontSize: width * 0.04,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 24,
//   },
//   optionsContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 24,
//     paddingHorizontal: 10,
//   },
//   option: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     padding: 12,
//     width: width * 0.59,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   optionSelected: {
//     borderColor: '#007BFF',
//     borderWidth: 2,
//   },
//   optionLabel: {
//     fontSize: width * 0.04,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   optionSubLabel: {
//     fontSize: width * 0.03,
//     color: '#777',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   optionPrice: {
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//     color: '#007BFF',
//     textAlign: 'center',
//   },
//   popularTag: {
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     backgroundColor: '#007BFF',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   popularText: {
//     color: '#fff',
//     fontSize: width * 0.025,
//     fontWeight: '600',
//   },
//   buyNowButton: {
//     backgroundColor: '#007BFF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   buyNowText: {
//     color: '#fff',
//     fontSize: width * 0.05,
//     fontWeight: 'bold',
//   },
// });

// export default SubscriptionScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import {IMAGES_PATH} from '../constant/imagesPath';

// const {width, height} = Dimensions.get('window');

// const SubscriptionScreen = () => {
//   const [selectedOption, setSelectedOption] = useState(0);

//   const handleOptionSelect = index => {
//     setSelectedOption(index);
//   };

//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.container}>
//         {/* Top Image Container */}
//         <View style={styles.imageContainer}>
//           <Image source={IMAGES_PATH.SUBSCRIPTION} style={styles.topImage} />
//         </View>

//         <View style={styles.contentContainer}>
//           {/* Header Text */}
//           <Text style={styles.headerText}>Explore, Share, Inspire</Text>
//           <Text style={styles.subHeaderText}>
//             Unlock pro features for a limitless experience
//           </Text>

//           {/* Subscription Options */}
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.option,
//                 selectedOption === 0 && styles.optionSelected,
//               ]}
//               onPress={() => handleOptionSelect(0)}>
//               <View style={styles.popularTag}>
//                 <Text style={styles.popularText}>Popular</Text>
//               </View>
//               <View style={styles.radioContainer}>
//                 <View
//                   style={[
//                     styles.radioOuter,
//                     selectedOption === 0 && styles.radioOuterSelected,
//                   ]}>
//                   {selectedOption === 0 && <View style={styles.radioInner} />}
//                 </View>
//               </View>
//               <Text style={styles.optionLabel}>7-Day</Text>
//               <Text style={styles.optionSubLabel}>Quick explore</Text>
//               <Text style={styles.optionPrice}>$0.49</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.option,
//                 selectedOption === 1 && styles.optionSelected,
//               ]}
//               onPress={() => handleOptionSelect(1)}>
//               <View style={styles.radioContainer}>
//                 <View
//                   style={[
//                     styles.radioOuter,
//                     selectedOption === 1 && styles.radioOuterSelected,
//                   ]}>
//                   {selectedOption === 1 && <View style={styles.radioInner} />}
//                 </View>
//               </View>
//               <Text style={styles.optionLabel}>Monthly</Text>
//               <Text style={styles.optionSubLabel}>Full access</Text>
//               <Text style={styles.optionPrice}>$2.99</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Buy Now Button */}
//           <TouchableOpacity style={styles.buyNowButton}>
//             <Text style={styles.buyNowText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   container: {
//     flex: 1,
//   },
//   imageContainer: {
//     width: width,
//     height: height * 0.5,
//     overflow: 'hidden',
//   },
//   topImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   contentContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   headerText: {
//     fontSize: width * 0.06,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subHeaderText: {
//     fontSize: width * 0.04,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 24,
//   },
//   optionsContainer: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 24,
//     paddingHorizontal: 10,
//   },
//   option: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     padding: 2,
//     width: width * 0.59,
//     position: 'relative',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   optionSelected: {
//     borderColor: '#000',
//     borderWidth: 2,
//   },
//   radioContainer: {
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   radioOuter: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioOuterSelected: {
//     borderColor: '#000',
//   },
//   radioInner: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#000',
//   },
//   optionLabel: {
//     fontSize: width * 0.04,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   optionSubLabel: {
//     fontSize: width * 0.03,
//     color: '#777',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   optionPrice: {
//     fontSize: width * 0.045,
//     fontWeight: 'bold',
//     color: '#007BFF',
//     textAlign: 'center',
//   },
//   popularTag: {
//     position: 'absolute',
//     top: -10,
//     right: -10,
//     backgroundColor: '#007BFF',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   popularText: {
//     color: '#fff',
//     fontSize: width * 0.025,
//     fontWeight: '600',
//   },
//   buyNowButton: {
//     backgroundColor: '#007BFF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   buyNowText: {
//     color: '#fff',
//     fontSize: width * 0.05,
//     fontWeight: 'bold',
//   },
// });

// export default SubscriptionScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {IMAGES_PATH} from '../constant/imagesPath';
import {Layout} from '../constant/layout';
import CustomHeader from '../Components/CustomHeader';

const SubscriptionScreen = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionSelect = index => {
    setSelectedOption(index);
  };
  const handleBuyNow = () => {
    const subscriptionType =
      selectedOption === 0 ? '7-Days FULL ACCESS' : 'Monthly ACCESS';
    const price = '$0.49';

    Alert.alert(
      'Confirm Purchase',
      `You selected ${subscriptionType} for ${price}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => Alert.alert('Success', 'Thank you for your purchase!'),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Top Social Media Image */}
        <View
          style={{
            marginHorizontal: Layout.MARGIN_SMALL,
            marginTop: Layout.MARGIN_SMALL,
          }}>
          <CustomHeader title="" />
        </View>
        <Image
          source={IMAGES_PATH.SUBSCRIPTION}
          style={styles.topImage}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          {/* Header Text */}
          <Text style={styles.headerText}>Explore,share,{'\n'}inspire</Text>
          <Text style={styles.subHeaderText}>
            Get pro for more features and unlimited use
          </Text>

          {/* Subscription Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === 0 && styles.optionSelected,
              ]}
              onPress={() => handleOptionSelect(0)}>
              <View style={styles.optionContent}>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedOption === 0 && styles.radioOuterSelected,
                    ]}>
                    {selectedOption === 0 && <View style={styles.radioInner} />}
                  </View>
                </View>
                <View style={styles.optionTextContainer}>
                  <View>
                    <Text style={styles.optionLabel}>7-Days FULL ACCESS</Text>
                    <Text style={styles.optionSubLabel}>
                      For the occasional artists
                    </Text>
                  </View>
                  <Text style={styles.optionPrice}>$0.49</Text>
                </View>
              </View>
              {selectedOption === 0 && (
                <View style={styles.popularTag}>
                  <Text style={styles.popularText}>Most popular</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === 1 && styles.optionSelected,
              ]}
              onPress={() => handleOptionSelect(1)}>
              <View style={styles.optionContent}>
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedOption === 1 && styles.radioOuterSelected,
                    ]}>
                    {selectedOption === 1 && <View style={styles.radioInner} />}
                  </View>
                </View>
                <View style={styles.optionTextContainer}>
                  <View>
                    <Text style={styles.optionLabel}>Monthly ACCESS</Text>
                    <Text style={styles.optionSubLabel}>Unlimited time</Text>
                  </View>
                  <Text style={styles.optionPrice}>$0.49</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Buy Now Button */}
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    // marginRight: Layout.MARGIN_HORIZONTAL_MEDIUM,
  },
  topImage: {
    width: Layout.SCREEN_WIDTH,
    height: Layout.SCREEN_HEIGHT * 0.42,
    marginBottom: Layout.MARGIN_VERTICAL_LARGE,
  },
  contentContainer: {
    paddingHorizontal: Layout.PADDING_HORIZONTAL_MEDIUM,
  },
  headerText: {
    fontSize: Layout.SCREEN_WIDTH * 0.08,
    fontWeight: '700',
    color: '#000',
    marginBottom: Layout.MARGIN_VERTICAL_SMALL,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: Layout.SCREEN_WIDTH * 0.04,
    color: '#666',
    marginBottom: Layout.MARGIN_VERTICAL_LARGE,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: Layout.MARGIN_VERTICAL_MEDIUM,
    marginBottom: Layout.MARGIN_VERTICAL_LARGE,
  },
  option: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: Layout.SCREEN_WIDTH * 0.04,
    padding: Layout.PADDING_MEDIUM,
    position: 'relative',
    elevation: 2,
  },
  optionSelected: {
    borderColor: '#000',
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    marginRight: Layout.MARGIN_HORIZONTAL_SMALL,
  },

  radioOuter: {
    width: Layout.SCREEN_WIDTH * 0.05,
    height: Layout.SCREEN_WIDTH * 0.05,
    borderRadius: Layout.SCREEN_WIDTH * 0.025,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: Layout.SCREEN_WIDTH * 0.025,
    height: Layout.SCREEN_WIDTH * 0.025,
    borderRadius: Layout.SCREEN_WIDTH * 0.0125,
    backgroundColor: '#007AFF',
  },
  optionTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: Layout.SCREEN_WIDTH * 0.04,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
  },
  optionSubLabel: {
    fontSize: Layout.SCREEN_WIDTH * 0.035,
    color: '#666',
  },
  optionPrice: {
    fontSize: Layout.SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    color: '#000',
  },
  popularTag: {
    position: 'absolute',
    top: -Layout.SCREEN_HEIGHT * 0.015,
    right: Layout.SCREEN_WIDTH * 0.04,
    backgroundColor: '#000',
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL,
    paddingVertical: Layout.PADDING_VERTICAL_SMALL,
    borderRadius: Layout.SCREEN_WIDTH * 0.04,
  },
  popularText: {
    color: '#fff',
    fontSize: Layout.SCREEN_WIDTH * 0.03,
    fontWeight: '600',
  },
  buyNowButton: {
    backgroundColor: '#000',
    padding: Layout.PADDING_MEDIUM,
    borderRadius: Layout.SCREEN_WIDTH * 0.03,
    alignItems: 'center',
    marginBottom: Layout.MARGIN_VERTICAL_MEDIUM,
  },
  buyNowText: {
    color: '#fff',
    fontSize: Layout.SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
