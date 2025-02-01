// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert, // Importing Alert
// } from 'react-native';
// import {useAuth} from '../context/AuthContext';
// import {IMAGES_PATH} from '../constant/imagesPath';
// import auth from '@react-native-firebase/auth';
// import {Layout} from '../constant/layout';
// import {useNavigation} from '@react-navigation/native';

// const SettingsScreen = () => {
//   const {logout, currentUser} = useAuth();
//   const {navigate}: any = useNavigation();

//   const profileImage = auth().currentUser?.photoURL
//     ? {uri: auth().currentUser?.photoURL}
//     : IMAGES_PATH.FIRST_SLIDER;

//   const handleNavigateToSubscription = () => {
//     navigate('SubscriptionScreen');
//   };

//   // Logout handler with alert confirmation
//   const handleLogout = () => {
//     Alert.alert(
//       'Logout Confirmation',
//       'Are you sure you want to log out?',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             logout();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Top Profile Section */}
//       <View style={styles.profileContainer}>
//         <Image style={styles.profileImage} source={profileImage} />
//         <Text style={styles.profileName}>
//           {currentUser?.displayName || 'User9379'}
//         </Text>
//       </View>

//       {/* User Profile Card */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>User profile</Text>
//         {[
//           {
//             name: 'subscriptions',
//             icon: '🔄',
//             onPress: () => navigate('SubscriptionScreen'),
//           },
//           {name: 'Review', icon: '📝'},
//           {name: 'Share with friends', icon: '🔗'},
//           {name: 'Privacy&Policy', icon: '🛡️'},
//           {name: 'Terms&Conditions', icon: '📄'},
//         ].map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.option}
//             onPress={item.onPress}>
//             <Text style={styles.optionText}>
//               <Text style={styles.icon}>{item.icon}</Text> {item.name}
//             </Text>
//             <Text style={styles.arrow}>{'>'}</Text>
//           </TouchableOpacity>
//         ))}

//         {/* Logout Button */}
//         <TouchableOpacity onPress={handleLogout} style={styles.button}>
//           <Text style={styles.buttonText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#000',
//     alignItems: 'center',
//     padding: Layout.PADDING_HORIZONTAL_LARGE,
//     height: Layout.SCREEN_HEIGHT - 500,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginTop: Layout.MARGIN_VERTICAL_LARGE,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   profileName: {
//     marginTop: 10,
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#fff',
//     width: '100%',
//     height: Layout.SCREEN_HEIGHT - 300,
//     borderTopLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     paddingTop: Layout.PADDING_VERTICAL_LARGE * 2.3,
//     padding: Layout.PADDING_HORIZONTAL_LARGE,
//     marginTop: Layout.MARGIN_VERTICAL_LARGE,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//     color: '#000',
//   },
//   option: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   optionText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   arrow: {
//     fontSize: 18,
//     color: '#888',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: '#000',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SettingsScreen;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert, // Importing Alert
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import {IMAGES_PATH} from '../constant/imagesPath';
import auth from '@react-native-firebase/auth';
import {Layout} from '../constant/layout';
import {useNavigation} from '@react-navigation/native';

const SettingsScreen = () => {
  const {logout, currentUser} = useAuth();
  const {navigate}: any = useNavigation();

  const profileImage = auth().currentUser?.photoURL
    ? {uri: auth().currentUser?.photoURL}
    : IMAGES_PATH.FIRST_SLIDER;

  // const handleNavigateToSubscription = () => {
  //   navigate('SubscriptionScreen');
  // };

  // Logout handler with alert confirmation
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Profile Section */}
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={profileImage} />
        <Text style={styles.profileName}>
          {currentUser?.displayName || 'User9379'}
        </Text>
      </View>

      {/* User Profile Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User profile</Text>
        {[
          {
            name: 'subscriptions',
            icon: '🔄',
            onPress: () => navigate('SubscriptionScreen'),
          },
          {name: 'Review', icon: '📝'},
          {name: 'Share with friends', icon: '🔗'},
          {name: 'Privacy&Policy', icon: '🛡️'},
          {name: 'Terms&Conditions', icon: '📄'},
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={item.onPress}>
            <Text style={styles.optionText}>
              <Text style={styles.icon}>{item.icon}</Text> {item.name}
            </Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    padding: Layout.PADDING_HORIZONTAL_LARGE,
    height: Layout.SCREEN_HEIGHT - 500,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: Layout.MARGIN_VERTICAL_LARGE,
  },
  profileImage: {
    width: Layout.SCREEN_WIDTH * 0.25, // 25% of screen width
    height: Layout.SCREEN_WIDTH * 0.25, // 25% of screen width
    borderRadius: (Layout.SCREEN_WIDTH * 0.25) / 2, // Half of width for circular shape
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    marginTop: Layout.PADDING_VERTICAL_SMALL,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    height: Layout.SCREEN_HEIGHT - 300,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: Layout.PADDING_VERTICAL_LARGE * 2.3,
    padding: Layout.PADDING_HORIZONTAL_LARGE,
    marginTop: Layout.MARGIN_VERTICAL_LARGE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: Layout.PADDING_VERTICAL_SMALL,
    marginTop: Layout.MARGIN_VERTICAL_LARGE,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

// deepseek
