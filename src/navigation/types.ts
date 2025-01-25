export type AuthStackParamList = {
  Login: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  RecentPostMain: {Id: string}; // If you are passing postId to RecentPostScreen
};
