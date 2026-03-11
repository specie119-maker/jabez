import React from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import LargeButton from '../components/LargeButton';
import RewardEffect from '../components/RewardEffect';

/**
 * Seed Garden - Result Screen
 * 대표님의 정성으로 피어난 식물을 축하하는 감동의 화면! 🎉🌸
 */
const ResultScreen = ({ result, onRetry, onHome, theme }) => {
  
  const isSuccess = result.id === 'fruit';

  const praises = isSuccess ? [
    "대성공! 완벽한 정원사예요! 🏆",
    "꽃이 대표님을 보고 웃고 있네요! 🌸",
    "오늘의 운동도 완벽하게 해내셨습니다! ✨",
    "열매가 탐스럽게 열렸어요! 장하십니다! 🍎",
  ] : [
    "조금만 더 정성을 들여볼까요? 🪴",
    "새싹이가 물을 더 기다리고 있어요! 💧",
    "괜찮아요, 내일은 꼭 꽃을 피울 거예요! 💝",
    "충분히 잘하셨습니다! 다시 한 번 고?",
  ];

  const randomPraise = praises[Math.floor(Math.random() * praises.length)];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <RewardEffect type={isSuccess ? 'SUCCESS' : 'FAILURE'} theme={theme} />
      
      <View style={styles.content}>
        <Text style={[styles.congrats, { color: isSuccess ? theme.primaryDark : theme.accent }]}>
          {isSuccess ? '축하합니다!' : '아쉬워요!'}
        </Text>
        
        <View style={styles.imageContainer}>
          <Image 
            source={result.image} 
            style={styles.grownPlant}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.praise, { color: theme.text }]}>{randomPraise}</Text>
        <Text style={[styles.subText, { color: theme.primaryDark }]}>
          {result.label} 단계까지 쑥쑥 자랐어요!
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <LargeButton 
          title="한 번 더 키우기" 
          onPress={onRetry} 
          theme={theme}
          style={{ backgroundColor: theme.primary }}
          textStyle={{ color: '#FFFFFF' }}
        />
        <LargeButton 
          title="홈으로 가기" 
          onPress={onHome} 
          theme={theme} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  congrats: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 30,
  },
  grownPlant: {
    width: 280,
    height: 280,
  },
  praise: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 18,
    opacity: 0.8,
  },
  buttonGroup: {
    marginBottom: 30,
  }
});

export default ResultScreen;
