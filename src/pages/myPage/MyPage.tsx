import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Modal } from '@components';
import { useQuery } from '@tanstack/react-query';
import { PAYMENT_STATUS_CODES } from '@type';
import dayjs from 'dayjs';
import { FreeMode } from 'swiper/modules';

import IconButton from '@components/button/IconButton';

import { useHeader } from '@hooks/useHeader';

import { PAGE_ROUTES, PAGE_WITHOUT_FOOTER_ROUTES } from '@router/Routes';

import { showPriceText } from '@utils/display';
import R from '@utils/resourceMapper';

import GoodsAPI from '@apis/goodsApi';
import MyPageAPI from '@apis/mypageApi';
import orderApi, { OrderListGoods } from '@apis/orderApi';
import SystemAPI from '@apis/systemApi';

import GradeBadge from '@commons/GradeBadge';
import SvgIcon from '@commons/SvgIcon';

import { RECENT_CLICK_GOODSID_KEY } from '@constants/constants';

import * as S from './MyPage.style';

export type RecentOrderList = OrderListGoods & {
  isAddItem: boolean;
  orderDate: string;
  ordersIdEncrypt: string;
};

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredRecentOrderList, setFilteredRecentOrderList] = useState<RecentOrderList[]>([]);

  const navigate = useNavigate();

  useHeader('마이쇼핑', { showHeader: true });
  // eslint-disable-next-line no-undef
  const recentClickGoodsId = localStorage.getItem(RECENT_CLICK_GOODSID_KEY);

  const { data } = useQuery({ queryKey: ['mypageMain'], queryFn: () => MyPageAPI.getMyPageMainInfo() });

  const { data: buyerInfo } = useQuery({ queryKey: ['buyerInfo'], queryFn: () => SystemAPI.getBuyerInfo() });

  const { data: recentOrderList } = useQuery({
    queryKey: ['RecentOrderList'],
    queryFn: () =>
      orderApi.getOrderList({
        page: '0',
        size: '10',
        mypageItemStatusEnum: PAYMENT_STATUS_CODES.ALL_ORDER,
        startDate: dayjs().add(-3, 'months').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      }),
  });

  useEffect(() => {
    let allGoods: RecentOrderList[] = [];
    let count = 0;
    recentOrderList?.data.content?.some((order) => {
      return order.shippingList?.slice(0, 3).some((shipping) => {
        return shipping.goodsList?.slice(0, 3 - count).some((goods) => {
          if (count >= 3) return true;

          if (!goods.claimTypeEnum) {
            allGoods.push({
              ...goods,
              ordersIdEncrypt: order.ordersIdEncrypt,
              isAddItem: false,
              orderDate: order.orderDate,
            });
            count++;
          }

          return goods.addList?.slice(0, 3 - count).some((addGoods) => {
            if (count >= 3) return true;

            if (!addGoods.claimTypeEnum) {
              allGoods.push({
                ...addGoods,
                ordersIdEncrypt: order.ordersIdEncrypt,
                isAddItem: true,
                orderDate: order.orderDate,
              });
              count++;
            }

            return count >= 3;
          });
        });
      });
    });

    setFilteredRecentOrderList(allGoods);
  }, [recentOrderList]);

  const { data: goodsRecommendedList } = useQuery({
    queryKey: ['GoodsRecommendedList', Number(recentClickGoodsId)],
    queryFn: () => GoodsAPI.getGoodsRecommended(Number(recentClickGoodsId)),
    enabled: !!recentClickGoodsId,
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleItemClick = (orderId: string) => {
    navigate(PAGE_ROUTES.MYPAGE_ORDER_HISTORY_DETAIL.path, { state: { key: orderId } });
  };

  // console.log('filterdd: ' + JSON.stringify(filteredRecentOrderList));
  // console.log('aaaaa' + data?.data?.buyerGroup.name);

  return (
    <>
      <S.MyWrap>
        <S.BasicSection>
          <S.ProfileGroup>
            <figure>
              <S.ProfileImg
                src={R.img.test}
                alt=''
              />
              <S.IconBestReviewer
                src={R.img.icoBadgeBestreviewer}
                alt=''
              />
              <S.IconTpoReviewer
                src={R.img.icoBadgeTopreviewer}
                alt=''
              />
            </figure>
            <S.ProfileText>
              <S.ProfileName>{buyerInfo?.data?.buyer.buyerName}</S.ProfileName>
              <S.TopReviewer>TOP리뷰어 </S.TopReviewer>
              <S.BestReviewer>베스트리뷰어</S.BestReviewer>
            </S.ProfileText>
          </S.ProfileGroup>
          <S.IconGroup>
            <IconButton
              img={R.svg.icoBellNormalOff}
              onClick={() => console.log('aaa')}
              btnSize={24}
            />
            <IconButton
              img={R.svg.icoSetting}
              onClick={() => console.log('bbb')}
              btnSize={24}
            />
          </S.IconGroup>
        </S.BasicSection>
        {!buyerInfo?.data?.buyer.pay010UseYn && (
          <S.UseSection>
            <S.GoToUseGroup>
              010PAY 머니&포인트
              <p>010PAY 이용하면 010PAY 포인트를 적립받을 수 있어요!</p>
            </S.GoToUseGroup>
            <S.GoToUseBtn>이용하러 가기</S.GoToUseBtn>
          </S.UseSection>
        )}

        <S.MySection>
          <S.PointList>
            <S.PointItem>
              <S.Tit>010PAY 머니</S.Tit>
              <S.PointLink to='/MyPage'>
                {(data?.data?.pay010?.availablePay010Money?.number ?? 0) === 0
                  ? '충전하러가기'
                  : showPriceText(data?.data?.pay010?.availablePay010Money)}
              </S.PointLink>
            </S.PointItem>
            <S.PointItem>
              <S.Tit>
                010PAY 포인트
                <S.SaveText>
                  <GradeBadge gradeName={data?.data?.buyerGroup.name || 'S'} />
                  <span>1% 적립중</span>
                </S.SaveText>
              </S.Tit>
              <S.TxtLink to='/MyPage'>{showPriceText(data?.data?.pay010?.availablePay010Mileage)}</S.TxtLink>
            </S.PointItem>
          </S.PointList>
        </S.MySection>
        <S.CouponSection>
          <S.CouponReviewGroup to='/MyPage'>
            <SvgIcon
              name={R.svg.icoCoupon}
              width={24}
              height={24}
            />
            <S.UseBox>
              쿠폰 <span>{data?.data?.coupon?.couponCnt ?? 0}</span>
            </S.UseBox>
          </S.CouponReviewGroup>
          <S.CouponReviewGroup to='/MyPage'>
            <SvgIcon
              name={R.svg.icoEdit}
              width={24}
              height={24}
            />
            <S.UseBox onClick={handleModalOpen}>
              리뷰 <span>3</span>
            </S.UseBox>
          </S.CouponReviewGroup>
        </S.CouponSection>
        <S.MySection>
          <S.HeadType1>최근 주문내역</S.HeadType1>
          {filteredRecentOrderList.length > 0 ? (
            <>
              <S.ItemList>
                {filteredRecentOrderList?.map((item) => {
                  return (
                    <S.ItemGroup
                      key={item.orderItemIdEncrypt}
                      onClick={() => handleItemClick(item.ordersIdEncrypt)}
                    >
                      <S.StatusBox>
                        <S.Status $code={item.itemStatusEnum.code}>{item.itemStatusEnum.codeName}</S.Status>
                        <S.Date>{dayjs(item.orderDate).format('YYYY.MM.DD')}</S.Date>
                      </S.StatusBox>
                      <S.DetailBox>
                        <img
                          src={item.imageFilesUrl}
                          alt=''
                        />
                        <S.DetailDesc>
                          <S.Product>{item.brandName}</S.Product>
                          {item.isAddItem ? (
                            <S.OptionText>
                              <span>추가상품</span>
                              <S.AddOption>{item.goodsOption}</S.AddOption>
                            </S.OptionText>
                          ) : (
                            <p>{item.displayGoodsName}</p>
                          )}
                          <S.Price>{showPriceText(item.itemPaymentPrice)}</S.Price>
                        </S.DetailDesc>
                      </S.DetailBox>
                    </S.ItemGroup>
                  );
                })}
              </S.ItemList>
              <S.OrderLink to={PAGE_ROUTES.MYPAGE_ORDER_HISTORY.path}>주문 내역 더보기</S.OrderLink>
            </>
          ) : (
            <S.NoOrders>최근에 주문한 내역이 없어요</S.NoOrders>
          )}
        </S.MySection>
        <S.MySection>
          <S.MenuList>
            <S.MenuItem>
              <Link to={PAGE_WITHOUT_FOOTER_ROUTES.SHOPPINGCART.path}>
                <S.MenuTit>
                  장바구니<S.IconDot></S.IconDot>
                </S.MenuTit>
                <S.NotiCount>11</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>취소/교환/반품</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>배송지관리</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>1:1 문의</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to={PAGE_ROUTES.GOODS_QNAS_CHECK.path}>
                <S.MenuTit>상품문의</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>찜한 상품</S.MenuTit>
                <S.NotiCount>11</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>찜한 스토어</S.MenuTit>
                <S.NotiCount>+99</S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>최근 본 목록</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.MySection>
        <S.MySection>
          <S.HeadType2>함께 둘러보실래요?</S.HeadType2>
          {/* 추후 MySection 전체 감싸기 - 최근 본 상품 0개이면 전체 미노출(유미책임님한테 확인했음)  */}
          {goodsRecommendedList?.data && (
            <S.SlideList
              slideClick={() => console.log('a')}
              slidesPerView='auto'
              freeMode={true}
              modules={[FreeMode]}
            >
              {goodsRecommendedList?.data.map((item, index) => {
                return (
                  <S.SlideItem
                    to='/MyPage'
                    key={item.goodsId + index}
                  >
                    <figure>
                      <S.SlideImg src={item.imageFilesUrl} />
                      <S.HeartIcon
                        name={R.svg.icoHeartOff}
                        width={24}
                        height={24}
                      />
                    </figure>
                    <S.TextBox>
                      <S.Brand>{item.brandName}</S.Brand>
                      <p>{item.displayGoodsName}</p>
                      <S.PriceText>
                        <span>{item.saleRate}% </span>
                        {showPriceText(item.paymentPrice)}
                      </S.PriceText>
                    </S.TextBox>
                  </S.SlideItem>
                );
              })}
            </S.SlideList>
          )}
        </S.MySection>
        <S.MySection>
          <S.NoticeOnce to='/MyPage'>
            등록된 공지사항 정보의 제목이 최대 한 줄까지 등록된 공지사항 정보의 제목이 최대 한 줄까지
          </S.NoticeOnce>
        </S.MySection>
        <S.MySection>
          <S.MenuList>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>
                  공지사항<S.IconDot></S.IconDot>
                </S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link to='/MyPage'>
                <S.MenuTit>FAQ</S.MenuTit>
                <S.NotiCount></S.NotiCount>
              </Link>
            </S.MenuItem>
          </S.MenuList>
        </S.MySection>
      </S.MyWrap>
      {isModalOpen && (
        <Modal
          onHide={handleModalClose}
          type='bottomSheet'
          showCloseBtn={false}
        >
          <S.PopReview>
            {/* 조건에 따라 노출 */}
            <S.PopTitle>이 상품의 첫 번째 리뷰를 남겨주세요!</S.PopTitle>
            <S.PopTitle>깜빡하고 작성하지 않은 리뷰가 있네요!</S.PopTitle>
            {/* 조건에 따라 노출 */}
            <S.GoodsBox>
              <img
                src='/images/test.png'
                alt=''
              />
              <p>바이오니들 나노샷 오토 MTS 홈케어 뷰티디바이스 기계 피부 모공 관리기 amts</p>
            </S.GoodsBox>
            <S.BtnWrap>
              <Button
                title='리뷰 작성하러 가기'
                rightIcon={
                  <SvgIcon
                    name={R.svg.icoChevronRight}
                    width={20}
                    height={20}
                  />
                }
                size='lg'
                width='100%'
                align='center'
                onClick={() => console.log('a')}
              />
            </S.BtnWrap>
          </S.PopReview>
        </Modal>
      )}
    </>
  );
};

export default MyPage;
