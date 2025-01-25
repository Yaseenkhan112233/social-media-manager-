import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform, InteractionManager} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const usePushNotification = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      return messaging()
        .requestPermission()
        .then(
          authStatus =>
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL,
        )
        .catch(error => console.error('Error requesting permission:', error));
    } else if (Platform.OS === 'android' && Platform.Version >= 33) {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(res => res === PermissionsAndroid.RESULTS.GRANTED);
    }
    return Promise.resolve(true);
  };
  const getFCMToken = async () => {
    return messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log('Your Firebase Token is:', fcmToken);
          return fcmToken;
        } else {
          console.log('Failed to receive Firebase token');
        }
      })
      .catch(error =>
        console.error('Failed to receive Firebase token:', error.message),
      );
  };

  const updateFCMTokenInFirestore = (
    userId: any,
    fcmToken: any,
    removeToken = false,
  ) => {
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        fcmTokens: !removeToken
          ? firestore.FieldValue.arrayUnion(fcmToken)
          : firestore.FieldValue.arrayRemove(fcmToken),
      })
      .catch(error =>
        console.error('Error updating FCM token in Firestore:', error),
      );
  };

  return {
    getFCMToken,
    updateFCMTokenInFirestore,
    requestUserPermission,
  };
};

export default usePushNotification;
