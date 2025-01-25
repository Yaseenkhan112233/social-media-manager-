import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Layout} from '../constant/layout';

const GenerationScreen = () => {
  const {navigate} = useNavigation();
  const scrollViewRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCreativeType, setSelectedCreativeType] = useState(null);
  const [selectedCanvasSize, setSelectedCanvasSize] = useState(null);

  const contentTypes = [
    {
      id: 'adCreatives',
      title: 'Ad Creatives',
      description: 'Design impactful ads to drive results',
      icon: '📑',
    },
    {
      id: 'socialMedia',
      title: 'Social Media',
      description: "Boost your brand's online presence",
      icon: '✏️',
    },
    {
      id: 'ecommerceAds',
      title: 'E-commerce Ads',
      description: 'Paid promotions to drive sales and conversions',
      icon: '⭐',
    },
    {
      id: 'ecommercePosts',
      title: 'E-commerce Posts',
      description: 'Showcase your products to build brand awareness',
      icon: '🛍️',
    },
  ];

  const creativeTypes = {
    adCreatives: [
      {
        id: 'singleImage',
        title: 'Single Image',
        description: 'A single template post',
        icon: '🖼️',
      },
      {
        id: 'multipleImages',
        title: 'Multiple Images',
        description: 'Carousel posts with multiple images',
        icon: '📸',
      },
    ],
    socialMedia: [
      {
        id: 'singleImage',
        title: 'Single Image',
        description: 'A single template post',
        icon: '🖼️',
      },
      {
        id: 'multipleImages',
        title: 'Multiple Images',
        description: 'Carousel posts with multiple images',
        icon: '📸',
      },
      {
        id: 'specialDayPost',
        title: 'Special Day Post',
        description: 'Create posts for special days (e.g., holidays)',
        icon: '🎉',
      },
    ],
    ecommerceAds: [
      {
        id: 'singleImage',
        title: 'Single Image',
        description: 'A single template post',
        icon: '🖼️',
      },
      {
        id: 'multipleImages',
        title: 'Multiple Images',
        description: 'Carousel posts with multiple images',
        icon: '📸',
      },
    ],
    ecommercePosts: [
      {
        id: 'singleImage',
        title: 'Single Image',
        description: 'A single template post',
        icon: '🖼️',
      },
      {
        id: 'multipleImages',
        title: 'Multiple Images',
        description: 'Carousel posts with multiple images',
        icon: '📸',
      },
    ],
  };

  const canvasSizes = [
    {
      id: 'square',
      title: 'Square',
      dimensions: '1080 x 1080',
      icon: '⬜',
    },
    {
      id: 'portrait',
      title: 'Portrait',
      dimensions: '1080 x 1920',
      icon: '📱',
    },
    {
      id: 'landscape',
      title: 'Landscape',
      dimensions: '1280 x 720',
      icon: '🖥️',
    },
  ];

  const scrollToSection = useCallback(sectionName => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          y:
            sectionName === 'creative'
              ? 300
              : sectionName === 'canvas'
              ? 600
              : 0,
          animated: true,
        });
      }, 100);
    }
  }, []);

  const handleContentTypeSelect = useCallback(
    id => {
      setSelectedType(id);
      setSelectedCreativeType(null);
      setSelectedCanvasSize(null);
      scrollToSection('creative');
    },
    [scrollToSection],
  );

  const handleCreativeTypeSelect = useCallback(
    id => {
      setSelectedCreativeType(id);
      setSelectedCanvasSize(null);
      scrollToSection('canvas');
    },
    [scrollToSection],
  );

  const handleCanvasSizeSelect = useCallback(canvasSize => {
    setSelectedCanvasSize(canvasSize);
  }, []);

  const handleContinue = useCallback(() => {
    try {
      if (selectedType && selectedCreativeType && selectedCanvasSize) {
        navigate('NewGeneration', {
          contentType: selectedType,
          creativeType: selectedCreativeType,
          canvasSize: selectedCanvasSize,
        });
      }
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, [selectedType, selectedCreativeType, selectedCanvasSize, navigate]);

  const renderContentTypeCard = useCallback(
    ({id, title, description, icon}) => (
      <TouchableOpacity
        key={id}
        style={[styles.card, selectedType === id && styles.selectedCard]}
        onPress={() => handleContentTypeSelect(id)}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
    ),
    [selectedType, handleContentTypeSelect],
  );

  const renderCreativeTypeCard = useCallback(
    ({id, title, description, icon}) => (
      <TouchableOpacity
        key={id}
        style={[
          styles.creativeCard,
          selectedCreativeType === id && styles.selectedCard,
        ]}
        onPress={() => handleCreativeTypeSelect(id)}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
    ),
    [selectedCreativeType, handleCreativeTypeSelect],
  );

  const renderCanvasSizeCard = useCallback(
    ({id, title, dimensions, icon}) => (
      <TouchableOpacity
        key={id}
        style={[
          styles.canvasCard,
          selectedCanvasSize === id && styles.selectedCard,
        ]}
        onPress={() => handleCanvasSizeSelect(id)}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{dimensions}</Text>
      </TouchableOpacity>
    ),
    [selectedCanvasSize, handleCanvasSizeSelect],
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>Select Content Type</Text>
              <View style={styles.gridContainer}>
                <View style={styles.row}>
                  {contentTypes.slice(0, 2).map(renderContentTypeCard)}
                </View>
                <View style={styles.row}>
                  {contentTypes.slice(2, 4).map(renderContentTypeCard)}
                </View>
              </View>

              {selectedType && creativeTypes[selectedType] && (
                <>
                  <Text style={styles.sectionTitle}>Select Creative Type</Text>
                  <View style={styles.creativeTypesContainer}>
                    {creativeTypes[selectedType].map(renderCreativeTypeCard)}
                  </View>
                </>
              )}

              {selectedCreativeType && (
                <>
                  <Text style={styles.sectionTitle}>
                    Select a canvas size to proceed
                  </Text>
                  <View style={styles.canvasSizesContainer}>
                    <View style={styles.row}>
                      {canvasSizes.slice(0, 2).map(renderCanvasSizeCard)}
                    </View>
                    <View style={[styles.row, styles.lastRow]}>
                      <View style={styles.canvasCard}>
                        {renderCanvasSizeCard(canvasSizes[2])}
                      </View>
                      <View style={styles.emptyCard} />
                    </View>
                  </View>
                </>
              )}

              {/* Add extra padding at bottom for the fixed button */}
              <View style={styles.bottomPadding} />
            </View>
          </ScrollView>

          {selectedCreativeType && (
            <View style={styles.fixedButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  !selectedCanvasSize && styles.continueButtonDisabled,
                ]}
                onPress={handleContinue}
                disabled={!selectedCanvasSize}>
                <Text
                  style={[
                    styles.continueButtonText,
                    !selectedCanvasSize && styles.continueButtonTextDisabled,
                  ]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: Layout.PADDING_MEDIUM,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Layout.MARGIN_MEDIUM,
    color: '#000000',
  },
  gridContainer: {
    marginBottom: Layout.MARGIN_LARGE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.MARGIN_MEDIUM,
  },
  lastRow: {
    justifyContent: 'flex-start',
  },
  card: {
    width: (Dimensions.get('window').width - Layout.PADDING_MEDIUM * 3) / 2,
    padding: Layout.PADDING_MEDIUM,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'flex-start',
  },
  selectedCard: {
    borderColor: '#0066FF',
    backgroundColor: '#F5F9FF',
  },
  creativeCard: {
    width: '100%',
    padding: Layout.PADDING_MEDIUM,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: Layout.MARGIN_MEDIUM,
  },
  canvasCard: {
    width: (Dimensions.get('window').width - Layout.PADDING_MEDIUM * 3) / 2,
    padding: Layout.PADDING_MEDIUM,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emptyCard: {
    width: (Dimensions.get('window').width - Layout.PADDING_MEDIUM * 3) / 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666666',
  },
  creativeTypesContainer: {
    width: '100%',
    marginBottom: Layout.MARGIN_LARGE,
  },
  canvasSizesContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: Layout.PADDING_MEDIUM,
  },
  bottomPadding: {
    height: 80, // Height for the fixed button
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Layout.PADDING_MEDIUM,
    paddingVertical: Layout.PADDING_SMALL,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  continueButton: {
    backgroundColor: '#1C1C1E',
    padding: Layout.PADDING_MEDIUM,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonTextDisabled: {
    color: '#666666',
  },
});

export default GenerationScreen;
