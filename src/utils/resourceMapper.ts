import { toCamelCase } from '@utils/stringUtils';

// Vite의 glob import를 사용하여 assets를 가져옵니다
const imageModules = import.meta.glob('../assets/images/*.(png|jpg|jpeg)', { eager: true });
const svgModules = import.meta.glob('../assets/svg/*.svg', { eager: true });
const lottieModules = import.meta.glob('../assets/lottie/*.json', { eager: true });

function processModules(modules: Record<string, any>) {
  const resources: Record<string, any> = {};
  Object.keys(modules).forEach((key) => {
    const fileName = key
      .split('/')
      .pop()
      ?.replace(/\.(png|jpe?g|svg|json)$/, '');
    if (fileName) {
      const camelCaseName = toCamelCase(fileName);
      resources[camelCaseName] = modules[key].default;
    }
  });
  return resources;
}

const R = {
  img: processModules(imageModules),
  svg: processModules(svgModules),
  lotties: processModules(lottieModules),
};

export default R;
