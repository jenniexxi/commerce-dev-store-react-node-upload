import { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@layouts/Layout';
import LayoutwithoutFooter from '@layouts/LayoutwithoutFooter';

import SvgPalette from '@pages/exampleRoot/SvgPalette';

import { EXAMPLE_ROUTES, PAGE_ROUTES, PAGE_WITHOUT_FOOTER_ROUTES } from './Routes';

const pages = import.meta.glob([
  '../pages/**/*.tsx',
  '../examples/*.tsx',
  '!../pages/**/components/*.tsx',
  '!../pages/**/features/*.tsx',
]);

const createRoutePath = (path: string) => {
  // ../pages/ProductList/ProductList.tsx -> productlist/productlist
  const normalizedPath = path
    .replace('../pages/', '')
    .replace('../examples/', 'examples/')
    .replace(/\.tsx$/, '')
    .toLowerCase();

  // Routes에 정의된 모든 설정에서 매칭되는 filePath 찾기
  const allRoutes = { ...PAGE_ROUTES, ...EXAMPLE_ROUTES };
  const matchedRoute = Object.values(allRoutes).find((route) => route.filePath.toLowerCase() === normalizedPath);

  // 매칭되는 route가 있으면 해당 path 반환
  if (matchedRoute) {
    return matchedRoute.path;
  }

  // 매칭되는 route가 없으면 기본 경로 생성
  return `/${normalizedPath}`;
};
const createWithFooterRoutePath = (path: string) => {
  // ../pages/ProductList/ProductList.tsx -> productlist/productlist
  const normalizedPath = path
    .replace('../pages/', '')
    .replace('../examples/', 'examples/')
    .replace(/\.tsx$/, '')
    .toLowerCase();

  // Routes에 정의된 모든 설정에서 매칭되는 filePath 찾기
  const allRoutes = { ...PAGE_WITHOUT_FOOTER_ROUTES };
  const matchedRoute = Object.values(allRoutes).find((route) => route.filePath.toLowerCase() === normalizedPath);

  // 매칭되는 route가 있으면 해당 path 반환
  if (matchedRoute) {
    return matchedRoute.path;
  }

  // 매칭되는 route가 없으면 기본 경로 생성
  return `/${normalizedPath}`;
};

const RootRouter = () => {
  const routes = Object.entries(pages).map(([path, component]) => {
    const routePath = createRoutePath(path);
    return {
      path: routePath,
      element: lazy(component as any),
    };
  });
  const withoutFooterRoutes = Object.entries(pages).map(([path, component]) => {
    const routePath = createWithFooterRoutePath(path);
    return {
      path: routePath,
      element: lazy(component as any),
    };
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            {routes.map(({ path, element: Element }) => (
              <Route
                key={path}
                path={path}
                element={<Element />}
              />
            ))}
          </Route>
          <Route element={<LayoutwithoutFooter />}>
            {withoutFooterRoutes.map(({ path, element: Element }) => (
              <Route
                key={path}
                path={path}
                element={<Element />}
              />
            ))}
          </Route>
          <Route
            path='/svglist'
            element={<SvgPalette />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RootRouter;
