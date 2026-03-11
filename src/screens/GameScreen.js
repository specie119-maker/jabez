import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { GROWTH_STAGES } from '../constants/theme';

const { width } = Dimensions.get('window');

/**
 * Seed Garden - Game Screen
 * 대표님의 '한 손 조작' 철학이 듬뿍 담긴 핵심 플레이 화면! 👆🌕
 * 탭 = 물주기 / 꾹 누르기 = 햇빛 모으기
 */
const GameScreen = ({ settings, onFinish, theme }) => {
  // --- 🛰️ 야베스 부장의 플레이 상태 센터 ---
  const [progress, setProgress] = useState(0); // 0 ~ 100
  const [waterLevel, setWaterLevel] = useState(0);
  const [sunLevel, setSunLevel] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // 애니메이션용 값
  const plantScale = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const holdTimer = useRef(null);
  const pressStartTime = useRef(0);

  // --- 🔊 사운드 재생 엔진 ---
  const playSound = async (type) => {
    if (!settings.sound) return;

    try {
      let soundAsset;
      if (type === 'success') {
        // soundAsset = require('../../assets/sounds/success.mp3');
      } else if (type === 'fail') {
        // soundAsset = require('../../assets/sounds/fail.mp3');
      }

      if (!soundAsset) return; // 파일이 없으면 재생 안함
      const { sound } = await Audio.Sound.createAsync(soundAsset);
      await sound.playAsync();

      // 재생 완료 후 메모리 해제
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.warn('사운드 파일을 찾을 수 없습니다. assets/sounds 폴더를 확인해주세요.', error);
    }
  };

  // --- 💧 탭(물주기) 로직 ---
  const handleTap = () => {
    if (isHolding) return; // 꾹 누르는 중에는 탭 무시

    // 찰진 진동 한 번! 🫡
    if (settings.vibration) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setWaterLevel(prev => Math.min(prev + 10, 100));
    checkGrowth(10, 0);

    // 식물이 물을 먹어 살짝 들썩이는 효과!
    Animated.sequence([
      Animated.timing(plantScale, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(plantScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // --- ☀️ 롱프레스(햇빛) 로직 ---
  const handlePressIn = () => {
    setIsHolding(true);
    pressStartTime.current = Date.now();

    // 롱프레스 시작 시 미세 진동
    if (settings.vibration) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // 설정된 초(Setting) 마다 햇빛 충전!
    const intervalTime = (settings.longPressDuration * 1000) / 10;
    holdTimer.current = setInterval(() => {
      setSunLevel(prev => {
        if (prev >= 100) return 100;
        checkGrowth(0, 5);
        return prev + 5;
      });
    }, intervalTime);
  };

  const handlePressOut = () => {
    const pressDuration = Date.now() - pressStartTime.current;
    setIsHolding(false);
    if (holdTimer.current) clearInterval(holdTimer.current);

    // 꾹 누르지 못했을 때 (설정한 시간의 80% 미만으로 뗐을 때) "악!" 소리 서비스
    // 단, 아주 짧은 탭(200ms 미만)은 물주기로 간주하여 제외
    const failThreshold = Math.max(settings.longPressDuration * 1000 * 0.8, 500);
    if (pressDuration > 200 && pressDuration < failThreshold && sunLevel < 100) {
      playSound('fail');
      if (settings.vibration) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // 성공적으로 모았을 때의 칭찬 진동!
    if (sunLevel >= 100 && settings.vibration) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playSound('success');
    }
  };

  // --- 🌱 성장 체크 엔진 ---
  const checkGrowth = (addWater, addSun) => {
    setProgress(prev => {
      const next = Math.min(prev + (addWater * 0.5) + (addSun * 0.5), 100);

      // 애니메이션 바 업데이트
      Animated.timing(progressAnim, {
        toValue: next / 100,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // 단계별 성장 체크 (5단계: 0~19, 20~39, 40~59, 60~79, 80~100)
      const newStage = Math.min(Math.floor(next / 20.1), GROWTH_STAGES.length - 1);
      if (newStage > currentStageIndex) {
        setCurrentStageIndex(newStage);
        if (settings.vibration) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        playSound('success'); // 잘하고 있을 때 박수 소리! 👏
      }

      // 게임 완료 (100% 도달 시)
      if (next >= 100) {
        playSound('success');
        // 마지막 인덱스(4번, 장미 정원/꽃다발)를 확실히 전달
        setTimeout(() => onFinish(GROWTH_STAGES[GROWTH_STAGES.length - 1]), 500);
      }

      return next;
    });
  };

return (
  <View style={styles.container}>
    {/* --- 📊 상단 성장 프로그레스 바 --- */}
    <View style={styles.topBar}>
      <View style={[styles.progressBarContainer, { backgroundColor: '#E0E0E0' }]}>
        <Animated.View style={[
          styles.progressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            }),
            backgroundColor: theme.primary
          }
        ]} />
      </View>
      <Text style={[styles.stageLabel, { color: theme.text }]}>
        오늘의 성장: {GROWTH_STAGES[currentStageIndex].label} ({Math.floor(progress)}%)
      </Text>
    </View>

    {/* --- 🪴 중앙 식물 영역 --- */}
    <View style={styles.centerSection}>
      <View style={styles.statusIcons}>
        {/* 💧 물 아이콘 */}
        <View style={styles.statusBox}>
          <Image source={require('../../assets/water.png')} style={[styles.icon, { opacity: waterLevel / 100 + 0.2 }]} />
          <View style={[styles.levelBar, { height: waterLevel * 0.8, backgroundColor: '#2196F3' }]} />
        </View>
        {/* ☀️ 햇빛 아이콘 */}
        <View style={styles.statusBox}>
          <Image source={require('../../assets/sun.png')} style={[styles.icon, { opacity: sunLevel / 100 + 0.2 }]} />
          <View style={[styles.levelBar, { height: sunLevel * 0.8, backgroundColor: '#FFC107' }]} />
        </View>
      </View>

      <Animated.Image
        source={GROWTH_STAGES[currentStageIndex].image}
        style={[styles.plantImage, { transform: [{ scale: plantScale }] }]}
        resizeMode="contain"
      />
    </View>

    {/* --- 👆 하단 초대형 터치 버튼 (화면의 핵심!) --- */}
    <View style={styles.bottomSection}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleTap}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.megaButton,
          {
            backgroundColor: isHolding ? theme.secondary : theme.surface,
            borderColor: theme.primary,
            shadowColor: theme.buttonShadow
          }
        ]}
      >
        <Text style={[styles.buttonText, { color: isHolding ? '#FFFFFF' : theme.text }]}>
          {isHolding ? '햇살 모으는 중...' : '톡 눌러 물주기\n꾹 눌러 햇살주기'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  topBar: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  progressBarContainer: {
    height: 15,
    borderRadius: 7.5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
  },
  stageLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusIcons: {
    position: 'absolute',
    left: 20,
    top: '10%',
    flexDirection: 'column',
  },
  statusBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  levelBar: {
    width: 8,
    borderRadius: 4,
    position: 'absolute',
    bottom: -5,
    right: -10,
  },
  plantImage: {
    width: width * 0.7,
    height: width * 0.7,
  },
  bottomSection: {
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  megaButton: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.4,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 35,
  }
});

export default GameScreen;
