import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

/**
 * Seed Garden - Large Button Component
 * 대표님이 강조하신 '큼직한 터치 영역'의 정수! 👆🌕
 */
const LargeButton = ({ title, onPress, theme, style, textStyle, subTitle }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.button, 
        { 
          backgroundColor: theme.surface, 
          borderColor: theme.primary,
        },
        style
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: theme.text }, textStyle]}>
          {title}
        </Text>
        {subTitle && (
          <Text style={[styles.subText, { color: theme.primaryDark }]}>
            {subTitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    paddingVertical: 25,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    // 그림자로 입체감을 줘서 누르기 쉽게!
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  }
});

export default LargeButton;
