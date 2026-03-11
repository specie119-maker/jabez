import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import LargeButton from '../components/LargeButton';

/**
 * Seed Garden - Setting Screen
 * 사용자의 컨디션에 맞춰 앱을 조율하는 소중한 공간! 🛠️
 */
const SettingScreen = ({ settings, setSettings, onBack, theme }) => {
  
  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const setDuration = (val) => {
    setSettings(prev => ({ ...prev, longPressDuration: val }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>설정</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- ⏱️ 롱프레스 시간 조절 (매우 중요!) --- */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>누르기 시간 조절</Text>
          <View style={styles.row}>
            {[0.5, 1.0, 1.5].map(val => (
              <TouchableOpacity
                key={val}
                onPress={() => setDuration(val)}
                style={[
                  styles.optionButton,
                  { 
                    backgroundColor: settings.longPressDuration === val ? theme.primary : theme.surface,
                    borderColor: theme.primary 
                  }
                ]}
              >
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  color: settings.longPressDuration === val ? '#FFFFFF' : theme.text 
                }}>
                  {val}초
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- 🎨 고대비 모드 (접근성) --- */}
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>고대비 모드</Text>
              <Text style={styles.subText}>글씨를 더 또렷하게 봅니다.</Text>
            </View>
            <Switch 
              value={settings.highContrast} 
              onValueChange={() => toggleSetting('highContrast')}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          </View>
        </View>

        {/* --- 📳 진동 설정 --- */}
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>진동 피드백</Text>
              <Text style={styles.subText}>누를 때마다 진동을 느낍니다.</Text>
            </View>
            <Switch 
              value={settings.vibration} 
              onValueChange={() => toggleSetting('vibration')}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          </View>
        </View>

        {/* --- 🔊 소리 가이드 --- */}
        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: theme.primaryDark }]}>소리 안내</Text>
              <Text style={styles.subText}>효과음으로 진행을 돕습니다.</Text>
            </View>
            <Switch 
              value={settings.sound} 
              onValueChange={() => toggleSetting('sound')}
              trackColor={{ false: '#767577', true: theme.primary }}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <LargeButton title="완료" onPress={onBack} theme={theme} style={{ backgroundColor: theme.primary }} textStyle={{ color: '#FFFFFF' }} />
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
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
  }
});

export default SettingScreen;
