// src/components/TabBarIcon.tsx
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type TabBarIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
  label?: string;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  color,
  size,
  focused,
  label,
}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={name} size={size} color={color} />
      {label && (
        <Text
          style={{
            color: color,
            fontSize: 10,
            marginTop: 2,
            fontWeight: focused ? 'bold' : 'normal',
          }}>
          {label}
        </Text>
      )}
    </View>
  );
};
