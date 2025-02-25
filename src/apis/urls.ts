export const DisplayUrl = {
  salesList: '/displays/best',
  searchInfo: '/displays/pages/search',
  searchResultList: '/displays/pages/search-result',
  saveRecentSearchKeyword: '/displays/searches/recent',
  deleteRecentSearchKeyword: '/displays/searches/recent',
  searchGoodsResult: '/displays/searches/result',
  searchAutoComplete: '/displays/searches/auto-complete',
  getMainDisplayInfo: '/displays/pages/main-list',
  getMainInfo: '/displays/mains',
  getMainCustomImageBanner: '/displays/mains/customs/banner',
  getMainCustomGoods: '/displays/mains/customs/goods',
  getMainCustomRecommend: '/displays/mains/customs/recommend',
};

export const GoodsDetailsUrl = {
  goods: (goodsId: number) => `/goods/${goodsId}`,
  goodsOptions: (goodsId: number) => `/goods/${goodsId}/options`,
  goodsRelationVideo: (goodsId: number) => `/goods/${goodsId}/relation-video`,
  goodsRecommended: (goodsId: number) => `/goods/${goodsId}/recommended`,
  goodsPrice: (goodsId: number) => `/goods/${goodsId}/price`,
  goodsFeedbackAboveFour: (goodsId: number) => `/goods/${goodsId}/feedback-above-four`,
  goodsStoreBest: (goodsId: number) => `/goods/${goodsId}/store-best`,
  goodsAnnouncement: (goodsId: number) => `/goods/${goodsId}/announcement`,
  goodsReturnExchanges: (goodsId: number) => `/goods/${goodsId}/return-exchanges`,
  goodsStoreInfo: (goodsId: number) => `/goods/${goodsId}/store-info`,

  goodsFeedbackList: (goodsId: number) => `/goods/${goodsId}/feedbacks`,
  goodsCheckRestock: (goodsId: number) => `/goods/${goodsId}/restock-alerts`,
  goodsQnAList: (goodsId: number) => `/goods/${goodsId}/qnas`,
};

export const ShoppingUrl = {
  getShoppingCart: '/shops/carts',
  getShoppingCartTotal: '/shops/carts/summary',
  updateShoppingCart: () => `/shops/carts`,
  createShoppingCart: '/shops/carts',
  deleteShoppingCart: '/shops/carts',
  getShoppingMiniCart: (goodsId: number) => `/shops/carts/goods/${goodsId}/mini-cart`,
  getCartBuyAvailableCheck: '/shops/carts/buy-available-check',
};

export const SystemUrl = {
  getBuyerInfo: '/systems/layouts/buyer',
  getPaymentRequireInfo: '/systems/pages/payment',
  postPaymentRequestInfo: (paymentGatewayIdEncrypt: string) =>
    `/systems/payments/${paymentGatewayIdEncrypt}/request-data`,
  postPaymentResult: '/systems/payments/approve-data',
};

export const BuyersUrl = {
  createBuyers: '/buyers/addresses',
  getBuyers: (buyerAddressIdEncrypt: string) => `buyers/addresses/${buyerAddressIdEncrypt}`,
  updateBuyers: (buyerAddressIdEncrypt: string) => `/buyers/addresses/${buyerAddressIdEncrypt}`,
  deleteBuyers: (buyerAddressIdEncrypt: string) => `/buyers/addresses/${buyerAddressIdEncrypt}`,
  getMyAddress: '/buyers/addresses/me',
  getMyAddressCount: '/buyers/addresses/me-address-count',
};

export const OrderUrl = {
  getOrderPage: '/shops/pages/order',
  getOrderSummary: '/shops/orders/summary',
  getOrderList: '/orders/manages',
  getOrderListPageInfo: '/orders/pages/order-list',
  getOrderListDetail: (ordersIdEncrypt: string) => `/orders/manages/${ordersIdEncrypt}`,
  orderRefundAccount: (ordersIdEncrypt: string) => `/orders/manages/${ordersIdEncrypt}/refund-account`,
  getDeliveryTracking: '/orders/ships/tracking',
  buyConfirmFinish: '/orders/ships/change-status/finish',
};

export const MyPageUrl = {
  getMyPage: '/mypages/pages/main',
};

export const ClaimUrl = {
  claimCancelInfoView: '/orders/pages/claim-cancel-request',
  cancelRefundInfoInquiry: 'orders/claims/cancel-request/refund',
  claimCancelRefundRequest: '/orders/claims/cancel-request',
  claimExchangeInfoView: '/orders/pages/claim-exchange-request',
  exchangeRefundInfoInquiry: '/orders/claims/exchange-request/refund',
  claimExchangeRequest: '/orders/claims/exchange-request',
  confirmIsExchangeOrder: '/orders/claims/exchange-request/available-check',
  claimReturnInfoView: '/orders/pages/claim-return-request',
  returnRefundInfoInquiry: '/orders/claims/return-request/refund',
  claimReturnRequest: '/orders/claims/return-request',
  getClaimList: '/orders/claims',
  getClaimOrderDetail: (orderClaimIdEncrypt: string) => `/orders/claims/${orderClaimIdEncrypt}`,
  cancelClaimCancel: (orderClaimIdEncrypt: string) => `/orders/claims/${orderClaimIdEncrypt}/cancel-cancel`,
  cancelClaimExchange: (orderClaimIdEncrypt: string) => `/orders/claims/${orderClaimIdEncrypt}/exchange-cancel`,
  cancelClaimReturn: (orderClaimIdEncrypt: string) => `/orders/claims/${orderClaimIdEncrypt}/return-cancel`,
  getAddPaymentList: '/orders/claims/add-payments',
};

export const PromotionUrl = {
  getGoodsCoupon: (goodsId: number) => `/promotions/coupons/goods/${goodsId}`,
  postDownloadCoupon: (code: string) => `/promotions/coupons/${code}`,
  getOrderCouponList: '/promotions/coupons/shopping-order',
  getCartCouponList: '/promotions/coupons/carts',
};

export const FavoritesUrl = {
  // 나의 관심 상품
  getFavoriteGoods: `/favorites/goods`,
  postFavoriteGoods: `/favorites/goods`,
  deleteFavoriteGoods: `/favorites/goods`,
  getFavoriteGoodsMe: `favorites/goods/me`,
  // 나의 관심 스토어
  getFavoriteStore: (companyStoreId: number) => `/favorites/stores/${companyStoreId}`,
  postFavoriteStore: `/favorites/stores`,
  deleteFavoriteStore: `/favorites/stores`,
  getFavoriteStoreMe: `/favorites/stores/mes`,
  postFavoriteStoreAlert: (companyStoreId: number) => `/favorites/stores/${companyStoreId}/alert`,
  deleteFavoriteStoreAlert: (favoriteStoreAlertIdEncrypt: string) =>
    `/favorites/stores/alerts/${favoriteStoreAlertIdEncrypt}`,
};
