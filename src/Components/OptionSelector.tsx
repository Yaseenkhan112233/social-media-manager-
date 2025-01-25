import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

interface OptionSelectorProps {
  title: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  title,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={options}
        keyExtractor={item => item}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedOption === item && styles.selectedCard,
            ]}
            onPress={() => onSelect(item)}>
            <Text
              style={[
                styles.optionText,
                selectedOption === item && styles.selectedText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionCard: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedCard: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OptionSelector;
