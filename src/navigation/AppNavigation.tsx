import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAuth} from '../context/AuthContext';
import LoadingScreen from '../Screens/LoadingScreen';
import IntroSlider from '../Components/IntroSlider';
import BottomTabNavigator from './BottomTabNavigator';

const AppNavigation = () => {
  const {currentUser, loading, initializing} = useAuth();
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introStatus = await AsyncStorage.getItem('hasSeenIntro');
        setHasSeenIntro(introStatus === 'true');
      } catch (error) {
        console.error('Error checking intro status:', error);
        setHasSeenIntro(false);
      }
    };

    checkIntroStatus();
  }, []);

  const handleFinishIntro = async () => {
    try {
      await AsyncStorage.setItem('hasSeenIntro', 'true');
      setHasSeenIntro(true);
    } catch (error) {
      console.error('Error setting intro status:', error);
    }
  };

  // Show loading screen while checking auth state or AsyncStorage
  if (initializing || loading) {
    return <LoadingScreen />;
  }

  // Show intro slider if user hasn't seen it
  if (!hasSeenIntro) {
    return <IntroSlider onFinish={handleFinishIntro} />;
  }

  // Main navigation logic
  return <>{!currentUser ? <AuthNavigator /> : <BottomTabNavigator />}</>;
};

export default AppNavigation;
