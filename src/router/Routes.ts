interface RouteConfig {
  path: string;
  filePath: string;
}

type RouteConfigMap = {
  [key: string]: RouteConfig;
};

// src/constants/routes/mainRoutes.ts
export const PAGE_ROUTES: RouteConfigMap = {
  EXAMPLEROOT: {
    path: '/examples',
    filePath: 'exampleroot/exampleroot',
  },
  HOME: {
    path: '/',
    filePath: 'productlist/productlist',
  },
  PRODUCTDETAIL: {
    path: '/productdetail/:goodsId',
    filePath: 'productdetail/productdetail',
  },
  MYPAGE: {
    path: '/mypage',
    filePath: 'myPage/MyPage',
  },
  MYPAGE_ORDER_HISTORY: {
    path: '/mypage/orderHistory',
    filePath: 'orderHistory/OrderHistory',
  },
  MYPAGE_ORDER_HISTORY_DETAIL: {
    path: '/mypage/orderHistoryDetail',
    filePath: 'orderHistoryDetail/OrderHistoryDetail',
  },
  CLAIM_HISTORY: {
    path: '/mypage/claimHistory',
    filePath: 'claimHistory/ClaimHistory',
  },
  CLAIM_HISTORY_DETAIL: {
    path: '/mypage/claimHistoryDetail',
    filePath: 'claimHistoryDetail/ClaimHistoryDetail',
  },
  CLAIM_REQUEST: {
    path: '/claimRequest',
    filePath: 'ClaimRequest/ClaimRequest',
  },
  ADD_PAYMENT: {
    path: '/mypage/addPayment',
    filePath: 'addPayment/AddPayment',
  },
  SEARCH: {
    path: '/search',
    filePath: 'searchProduct/SearchProduct',
  },
  SHOPPING_POINT: {
    path: '/mypage/shoppingpoint',
    filePath: 'mypage/shoppingPoint/ShoppingPoint',
  },
  GOODS_QNAS_CHECK: {
    path: '/goodsQnasCheck',
    filePath: 'productInquiry/ProductInquiryCheck',
  },
} as const;

export const EXAMPLE_ROUTES: RouteConfigMap = {
  TESTARCCORIDAN: {
    path: '/examples/testaccordion',
    filePath: 'examples/testaccordion',
  },
  TESTBUTTON: {
    path: '/examples/testbutton',
    filePath: 'examples/testbutton',
  },
  TESTCHECKBOX: {
    path: '/examples/TestCheckbox',
    filePath: 'examples/TestCheckbox',
  },
  TESTCOUNTER: {
    path: '/examples/TestCounter',
    filePath: 'examples/TestCounter',
  },
  TESTHORIZONTALSCROLL: {
    path: '/examples/testhorizontalscroll',
    filePath: 'examples/testhorizontalscroll',
  },
  TESTINPUT: {
    path: '/examples/testinput',
    filePath: 'examples/testinput',
  },
  TESTMODAL: {
    path: '/examples/testmodal',
    filePath: 'examples/testmodal',
  },
  TESTRADIO: {
    path: '/examples/testradio',
    filePath: 'examples/testradio',
  },
  TESTSELECTOR: {
    path: '/examples/testselector',
    filePath: 'examples/testselector',
  },
  TESTSWIPER: {
    path: '/examples/testswiper',
    filePath: 'examples/testswiper',
  },
  TESTTAB: {
    path: '/examples/testtab',
    filePath: 'examples/testtab',
  },
  TESTTOOLTIP: {
    path: '/examples/testtooltip',
    filePath: 'examples/testtooltip',
  },
  VIRTUALSCROLLEX: {
    path: '/examples/virtualscrollex',
    filePath: 'examples/virtualscrollex',
  },
} as const;

export const PAGE_WITHOUT_FOOTER_ROUTES: RouteConfigMap = {
  SHOPPINGCART: {
    path: '/shoppingcart',
    filePath: 'shoppingcart/shoppingcart',
  },
  ORDER: {
    path: '/order',
    filePath: 'order/order',
  },
  MANAGE_ADDRESS: {
    path: '/manageAddress',
    filePath: 'manageAddress/ManageAddress',
  },
  OAUTH_GOOGLE: {
    path: '/auth/:snsId',
    filePath: 'auth/OAuthRedirect',
  },
  ORDER_COMPLETE: {
    path: '/order/complete',
    filePath: 'orderComplete/OrderComplete',
  },
} as const;
