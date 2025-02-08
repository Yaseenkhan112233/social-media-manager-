import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import usePushNotification from '../hooks/usePushNotification';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  initializing: boolean;
  currentUser: User | null;
  signInWithGoogle: () => Promise<any>; // Updated method name
  logout: () => void;
  loading: boolean;
  setResults: any;
  results: any;
}

const AuthContext = createContext<AuthContextType>({
  initializing: true,
  currentUser: null,
  signInWithGoogle: async () => {}, // Update this line
  logout: () => {},
  loading: false,
  setResults: () => {},
  results: '',
});

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {getFCMToken, updateFCMTokenInFirestore} = usePushNotification();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [results, setResults] = useState<string>('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '192777531312-8g3pa16egl58r2qh8u0eicni6n7l02qk.apps.googleusercontent.com', // Replace with your actual web client ID
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  const onAuthStateChanged = async (authUser: any) => {
    setLoading(true);
    if (authUser) {
      const {uid, email, displayName, phoneNumber, photoURL} = authUser;

      // Fetch the FCM token
      const fcmToken = (await getFCMToken()) as string;

      const fireStoreUser = await getUserFromFireStore(uid);

      if (!fireStoreUser) {
        // New user: Add them to Firestore
        await addUserToFireStore({
          uid,
          email,
          displayName,
          phoneNumber,
          photoURL,
          fcmToken,
        });
        setCurrentUser({uid, email, displayName});
      } else {
        // Existing user: Update their FCM token
        setCurrentUser(fireStoreUser as User);
        await updateFCMTokenInFirestore(uid, fcmToken);
      }
    } else {
      // If no user is authenticated
      setCurrentUser(null);
    }

    setLoading(false);
    if (initializing) setInitializing(false);
  };

  const getUserFromFireStore = async (userId: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user from Firestore:', error);
      return null;
    }
  };

  const addUserToFireStore = async (authUser: any) => {
    try {
      const {uid, email, displayName, phoneNumber, photoURL, fcmToken} =
        authUser;

      // Store the FCM token
      const fcmTokens = [fcmToken];

      await firestore().collection('users').doc(uid).set({
        uid,
        email,
        displayName,
        phoneNumber,
        photoURL,
        fcmTokens,
        createdAt: new Date(),
        artworksCreatedCount: 0, // Default value on user creation
        followersCount: 0, // Default value on user creation
        followingCount: 0, // Default value on user creation
        likedArtworksCount: 0, // Default value on user creation
        savedArtworksCount: 0, // Default value on user creation
      });
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const response = await GoogleSignin.signIn();
      const {idToken}: any = response.data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Error logging out:', error.message);
    }
  };

  const value: any = {
    initializing,
    currentUser,
    signInWithGoogle, // Use the updated method name
    logout,
    loading,
    results,
    setResults,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
