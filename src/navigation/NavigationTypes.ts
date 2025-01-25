import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
// const navigation = useNavigation();

// Bottom Tab Navigator Params
export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Notifications: undefined;
  Settings: undefined;
  RecentPost: undefined; // Changed from 'RecentPosts' to match other usages
  // RecentPostMain: {Id: string}; // If you are passing postId to RecentPostScreen
};

// Nested Stack Navigator Params for each Tab
export type HomeStackParamList = {
  HomeMain: undefined;
  HomeDetail: {id: string};
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  ProfileDetail: {id: string};
};

export type NotificationsStackParamList = {
  NotificationsMain: undefined;
  NotificationDetail: {id: string};
};

export type SettingsStackParamList = {
  SettingsMain: undefined;
  SettingsDetail: {id: string};
};

// Recent Post Stack Params
export type RecentPostStackParamList = {
  RecentPostMain: {id?: string; title?: string}; // Allow optional params
  PostDetail: {id: string};
};

// Screen Props Types
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<HomeStackParamList>
>;

export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<ProfileStackParamList>
>;

export type NotificationsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Notifications'>,
  NativeStackScreenProps<NotificationsStackParamList>
>;

export type SettingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Settings'>,
  NativeStackScreenProps<SettingsStackParamList>
>;

export type RecentPostScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'RecentPost'>, // Updated to match BottomTabParamList
  NativeStackScreenProps<RecentPostStackParamList>
>;
