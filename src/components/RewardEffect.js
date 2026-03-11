import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * Seed Garden - Firework & Reward Effect
 * 야베스 부장이 직접 쏘아 올리는 감동의 불꽃폭죽! 🎆👏
 */
const RewardEffect = ({ type, theme }) => {
  const particles = Array.from({ length: 15 });
  const anims = useRef(particles.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (type === 'SUCCESS') {
      const animations = anims.map((anim, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const dist = 150 + Math.random() * 50;
        
        return Animated.sequence([
          Animated.delay(Math.random() * 500),
          Animated.parallel([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.out(Easing.exp),
              useNativeDriver: true,
            }),
          ])
        ]);
      });
      Animated.loop(Animated.parallel(animations)).start();
    }
  }, [type]);

  if (type !== 'SUCCESS') return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {anims.map((anim, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const x = anim.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(angle) * 150] });
        const y = anim.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(angle) * 150] });
        const opacity = anim.interpolate({ inputRange: [0.7, 1], outputRange: [1, 0] });
        const scale = anim.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1.5, 0.5] });

        return (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                backgroundColor: i % 2 === 0 ? theme.secondary : theme.accent,
                transform: [{ translateX: x }, { translateY: y }, { scale: scale }],
                opacity: opacity,
                left: width / 2,
                top: height / 3,
              }
            ]}
          />
        );
      })}
      {/* 박수 이모지 연출 */}
      <View style={styles.clappingContainer}>
        <Animated.Text style={styles.clapIcon}>👏</Animated.Text>
        <Animated.Text style={[styles.clapIcon, { fontSize: 50, marginTop: 20 }]}>🎉</Animated.Text>
        <Animated.Text style={styles.clapIcon}>👏</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  clappingContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clapIcon: {
    fontSize: 40,
  }
});

export default RewardEffect;
