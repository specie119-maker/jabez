import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import SettingScreen from './src/screens/SettingScreen';
import ResultScreen from './src/screens/ResultScreen';
import { COLORS } from './src/constants/theme';

export default function App() {
  // --- 🛰️ 야베스 부장의 상태 관리 센터 ---
  const [currentScreen, setCurrentScreen] = useState('HOME');
  const [settings, setSettings] = useState({
    longPressDuration: 1.0, // 기본 1초
    highContrast: false,
    vibration: true,
    sound: true,
  });
  const [lastResult, setLastResult] = useState(null);

  // --- 🎨 테마 설정 ---
  const theme = settings.highContrast ? COLORS.highContrast : COLORS.nature;

  // --- 🔄 화면 전환 로직 ---
  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen 
          onStart={() => setCurrentScreen('GAME')} 
          onSettings={() => setCurrentScreen('SETTINGS')}
          onGarden={() => {/* 정원 컬랙션 로직(추후) */}}
          theme={theme}
        />;
      case 'GAME':
        return <GameScreen 
          settings={settings}
          onFinish={(result) => {
            setLastResult(result);
            setCurrentScreen('RESULT');
          }}
          onBack={() => setCurrentScreen('HOME')}
          theme={theme}
        />;
      case 'SETTINGS':
        return <SettingScreen 
          settings={settings}
          setSettings={setSettings}
          onBack={() => setCurrentScreen('HOME')}
          theme={theme}
        />;
      case 'RESULT':
        return <ResultScreen 
          result={lastResult}
          onRetry={() => setCurrentScreen('GAME')}
          onHome={() => setCurrentScreen('HOME')}
          theme={theme}
        />;
      default:
        return <HomeScreen onStart={() => setCurrentScreen('GAME')} theme={theme} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={settings.highContrast ? "dark-content" : "dark-content"} />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
