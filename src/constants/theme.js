/**
 * 꾹또리 - Theme Constants
 * AI 1인 기업 대표님을 위한 야베스 부장의 마법의 컬러칩! 🎨
 */

export const COLORS = {
  // 기본 모드 (Vibrant Healing Nature)
  nature: {
    primary: '#00C853', // 아주 선명하고 활기찬 에메랄드 그린
    primaryDark: '#008122',
    secondary: '#FFD600', // 쨍한 황금빛 햇살 옐로우
    background: '#FFFFFF', // 깨끗한 화이트 배경으로 색감 강조
    surface: '#F1F8E9',
    text: '#1B5E20',
    accent: '#FF3D00', // 시선을 끄는 선명한 레드 오렌지
    buttonShadow: 'rgba(0,100,0,0.2)',
  },
  // 고대비 모드 (Ultra High Contrast)
  highContrast: {
    primary: '#000000',
    primaryDark: '#000000',
    secondary: '#FFFF00', // 아주 쨍한 노랑
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    accent: '#FF0000',
    buttonShadow: 'rgba(0,0,0,0.5)',
  }
};

export const GROWTH_STAGES = [
  { id: 'seed', label: '장미 씨앗', image: require('../../assets/seed.png') },
  { id: 'bud', label: '작은 고개', image: require('../../assets/sprout.png') },
  { id: 'opening', label: '피어나는 장미', image: require('../../assets/leaves.png') },
  { id: 'bloom', label: '붉은 장미', image: require('../../assets/flower.png') },
  { id: 'garden', label: '장미 정원', image: require('../../assets/fruit.png') },
];
