import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import LargeButton from '../components/LargeButton';

/**
 * 꾹또리 - Home Screen
 * 대표님의 설계도대로 척척! 🌱 꾹또리 홈 화면입니다!
 */
const HomeScreen = ({ onStart, onGarden, onSettings, theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#F5F5F5' }]}>
      {/* --- 🏷️ 상단 타이틀 (활동적인 레드/블루) --- */}
      <View style={styles.header}>
        <Text style={styles.titlePrefix}>한손 씨앗 키우기</Text>
        <Text style={styles.titleMain}>Wel<Text style={{color: '#D32F2F'}}>Pa</Text>Go</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- 🪴 메인 비주얼 (로고 스타일 프레임) --- */}
        <View style={styles.logoFrame}>
           <Image 
            source={require('../../assets/main_visual.png')} 
            style={styles.mainLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.welcomeSection}>
           <Text style={styles.welcomeText}>부장님, 오늘도 활기차게!</Text>
           <Text style={styles.subWelcome}>장미가 기다리고 있어요 🌹</Text>
        </View>

        {/* --- 🕹️ 메인 버튼군 (Logo matching colors) --- */}
        <View style={styles.buttonGroup}>
          <LargeButton 
            title="훈련 시작하기" 
            subTitle="신나는 장미 키우기"
            onPress={onStart} 
            theme={theme}
            style={{ backgroundColor: '#D32F2F', borderColor: '#B71C1C', height: 100 }} 
            textStyle={{ color: '#FFFFFF', fontSize: 26 }}
            subTitleStyle={{ color: '#FFCDD2', fontSize: 14 }}
          />
          <LargeButton 
            title="나의 정원 보기" 
            onPress={onGarden} 
            theme={theme} 
            style={{ backgroundColor: '#1976D2', borderColor: '#0D47A1' }} 
            textStyle={{ color: '#FFFFFF' }}
          />
          <LargeButton 
            title="앱 설정" 
            onPress={onSettings} 
            theme={theme} 
            style={{ backgroundColor: '#455A64', borderColor: '#263238' }} 
            textStyle={{ color: '#FFFFFF' }}
          />
        </View>

        {/* --- 📊 하단 푸터 느낌 --- */}
        <View style={styles.footerBranding}>
           <Text style={styles.footerText}>© 2026 WelPaGo Service Center</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  titlePrefix: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: -5,
  },
  titleMain: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1976D2',
    letterSpacing: -1,
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoFrame: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 15,
    elevation: 15,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  mainLogo: {
    width: 220,
    height: 220,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subWelcome: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  buttonGroup: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  footerBranding: {
    marginTop: 20,
    opacity: 0.5,
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
