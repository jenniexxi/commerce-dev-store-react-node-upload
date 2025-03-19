import { toCamelCase } from '@utils/stringUtils';

// 이미지 및 SVG 모듈 가져오기
const imageModules = import.meta.glob('../assets/images/*.(png|jpg|jpeg)', { eager: true });
const svgModules = import.meta.glob('../assets/svg/*.svg', { eager: true, as: 'raw' }); // raw 텍스트로 가져오기
const lottieModules = import.meta.glob('../assets/lottie/*.json', { eager: true });

// SVG 텍스트를 base64 Data URL로 변환하는 함수
function svgToDataUrl(svgText: string) {
  // SVG를 base64로 인코딩
  const base64 = btoa(svgText);
  return `data:image/svg+xml;base64,${base64}`;
}

function processModules(modules: Record<string, any>, isSvg = false) {
  const resources: Record<string, any> = {};

  Object.keys(modules).forEach((key) => {
    const fileName = key
      .split('/')
      .pop()
      ?.replace(/\.(png|jpe?g|svg|json)$/, '');

    if (fileName) {
      const camelCaseName = toCamelCase(fileName);

      // SVG인 경우 base64 Data URL로 변환
      if (isSvg) {
        resources[camelCaseName] = svgToDataUrl(modules[key]);
      } else {
        resources[camelCaseName] = modules[key].default || modules[key];
      }
    }
  });

  return resources;
}

const R = {
  img: processModules(imageModules),
  svg: processModules(svgModules, true), // SVG는 특별 처리
  lotties: processModules(lottieModules),
};

export default R;
