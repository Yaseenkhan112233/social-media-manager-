import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './src/context/AuthContext';
import IntroSlider from './src/Components/IntroSlider';
import AppNavigation from './src/navigation/AppNavigation';
import {SavedPostsProvider} from './src/context/SavedPostsContext';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIntroStatus();
  }, []);

  const checkIntroStatus = async () => {
    try {
      const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');

      if (hasSeenIntro === 'true') {
        // User has seen intro before
        setShowIntro(false);
      } else {
        // First time user
        setShowIntro(true);
      }
    } catch (error) {
      console.error('Error checking intro status:', error);
      setShowIntro(true); // Default to showing intro if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishIntro = async () => {
    try {
      // Mark that user has seen intro
      await AsyncStorage.setItem('hasSeenIntro', 'true');
      setShowIntro(false);
    } catch (error) {
      console.error('Error saving intro status:', error);
    }
  };

  // Show a loading screen or null while checking intro status
  if (isLoading) {
    return null;
  }

  return (
    <SavedPostsProvider>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            {showIntro ? (
              <IntroSlider onFinish={handleFinishIntro} />
            ) : (
              <AppNavigation />
            )}
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
    </SavedPostsProvider>
  );
};

export default App;
