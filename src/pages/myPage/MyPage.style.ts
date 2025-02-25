import { Link } from 'react-router-dom';

import { SwiperCarousel } from '@components';
import { AllOrderStates } from '@type';
import styled, { css } from 'styled-components';
import 'swiper/css';
import 'swiper/css/free-mode';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

export const Container = styled.main`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background2};
`;

export const MyWrap = styled.main`
  padding: 0 1.6rem;
  background-color: ${({ theme }) => theme.colors.background2};
  overflow: hidden;
`;

export const BasicSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 0;
`;

export const MySection = styled.section`
  background-color: ${({ theme }) => theme.colors.background1};
  border-radius: 1.6rem;
  margin-bottom: 1.6rem;
  &:last-child {
    margin-bottom: 4rem;
  }
`;

export const CouponSection = styled(MySection)`
  display: flex;
`;

export const PointList = styled.ul`
  padding: 0 1.6rem;
`;

export const PointItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
  height: 5.4rem;
  &:last-child {
    border-bottom: none;
  }
`;

export const Tit = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  display: flex;
  align-items: center;
`;

export const TxtLink = styled(Link)`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text3};
  &::after {
    display: inline-block;
    content: '';
    background-image: url(${R.svg.icoChevronLeft});
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin: -0.4rem 0 0 0.4rem;
    transform: rotate(180deg);
  }
`;

export const PointLink = styled(Link)`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.primary_text1};
  &::after {
    display: inline-block;
    content: '';
    background-image: url(${R.svg.icoChevronLeft});
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin: -0.4rem 0 0 0.4rem;
    transform: rotate(180deg);
  }
`;

export const SaveText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  span {
    ${({ theme }) => theme.fonts.caption1_normalb};
    color: #5a6044;
    margin-left: 0.4rem;
  }
`;

export const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  figure {
    position: relative;
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 3.2rem;
    margin-right: 0.8rem;
    position: relative;
  }
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 3.2rem;
`;

export const IconBestReviewer = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.6rem;
  height: 1.6rem;
`;

export const IconTpoReviewer = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.6rem;
  height: 1.6rem;
`;

export const BadgeTopReviewer = styled.i`
  display: inline-block;
`;

export const BadgeBestReviewer = styled.i`
  display: inline-block;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  button {
    &:first-child {
      margin-right: 0.4rem;
    }
  }
  button {
    &:last-child {
      margin-left: 0.4rem;
    }
  }
`;

export const ProfileText = styled.div``;

export const ProfileName = styled.div`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(1)};
`;

export const TopReviewer = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalb};
  background: linear-gradient(90deg, #a0d70b 0%, #00d0c6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  margin-top: 0.2rem;
`;

export const BestReviewer = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalb};
  background: linear-gradient(90deg, #7641ff 0%, #4b9cf3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  margin-top: 0.2rem;
`;

export const UseSection = styled.div`
  background: ${({ theme }) => theme.gradients.gradient_deco1('90deg', '14.5%', '100%')};
  padding: 1.6rem;
  border-radius: 1.6rem;
  position: relative;
  margin-bottom: 1.6rem;
  button {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    ${({ theme }) => theme.fonts.body2_normalb};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const GoToUseGroup = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  p {
    ${({ theme }) => theme.fonts.caption1_normalm};
    color: ${({ theme }) => theme.colors.text3};
    margin-top: 0.8rem;
  }
`;

export const GoToUseBtn = styled.button`
  &::after {
    display: inline-block;
    content: '';
    background-image: url(${R.svg.icoChevronLeft});
    background-repeat: no-repeat;
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin: -0.3rem 0 0 0.4rem;
    transform: rotate(180deg);
  }
`;

export const CouponReviewGroup = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0 0 50%;
  height: 8rem;
  position: relative;
  &:first-child {
    &::after {
      display: block;
      content: '';
      width: 0.1rem;
      height: 4.8rem;
      background-color: ${({ theme }) => theme.colors.line2};
      position: absolute;
      top: 1.6rem;
      right: 0;
    }
  }
`;

export const UseBox = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  margin-top: 0.4rem;
  span {
    ${({ theme }) => theme.fonts.body2_normalb};
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;

export const HeadType1 = styled.h2`
  ${({ theme }) => theme.fonts.headline2b};
  color: ${({ theme }) => theme.colors.text3};
  padding: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
  span {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;

export const ItemList = styled.ul`
  padding: 0.8rem 1.6rem;
`;

export const ItemGroup = styled.li``;

export const StatusBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem auto;
`;

export const Status = styled.span<{ $code: string }>`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  ${({ $code }) => {
    switch ($code) {
      case AllOrderStates.Order.DC:
      case AllOrderStates.Order.BF:
        return css`
          color: ${({ theme }) => theme.colors.text4};
        `;
      case AllOrderStates.Order.SS:
      case AllOrderStates.Order.SI:
      case AllOrderStates.Order.SC:
        return css`
          color: ${({ theme }) => theme.colors.primary_text1};
        `;
      case AllOrderStates.Order.SD:
        return css`
          color: ${({ theme }) => theme.colors.status_danger};
        `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.text5};
        `;
    }
  }}
`;

export const Date = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text5};
`;

export const DetailBox = styled(Link)`
  display: flex;
  margin-bottom: 0.8rem;
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 1.2rem;
    border: 0.71px solid ${({ theme }) => theme.colors.line2};
  }
`;

export const DetailDesc = styled.div`
  margin-left: 0.8rem;
  width: calc(100% - 88px);
  p {
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text3};
    margin: 0.4rem auto;
    ${({ theme }) => theme.mixins.ellipsis(2)};
  }
`;

export const OptionText = styled.div`
  display: flex;
  margin: 0.4rem auto;
  span {
    width: 4.6rem;
    height: 2rem;
    border-radius: 0.8rem;
    ${({ theme }) => theme.fonts.caption2_normal};
    color: ${({ theme }) => theme.colors.text5};
    border: 1px solid ${({ theme }) => theme.colors.line3};
    margin-right: 0.4rem;
    line-height: 1.9rem;
    text-align: center;
  }
`;

export const AddOption = styled.div`
  flex: 1;
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(1)};
`;

export const Product = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
  ${({ theme }) => theme.mixins.ellipsis(1)};
`;

export const Price = styled.div`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text3};
`;

export const OrderLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.2rem;
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text4};
  border-top: 1px solid ${({ theme }) => theme.colors.line2};
  &::after {
    display: inline-block;
    content: '';
    background-image: url(${R.svg.icoChevronLeft});
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: middle;
    margin: 0 0 0 0.4rem;
    transform: rotate(180deg);
  }
`;

export const NoOrders = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  padding: 1.6rem;
`;

export const MenuList = styled.ul`
  padding: 1.6rem 0;
`;

export const MenuItem = styled.li`
  height: 5.4rem;
  padding: 1.6rem;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const MenuTit = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  position: relative;
`;

export const IconDot = styled.i`
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary1};
  position: absolute;
  top: -0.1rem;
  right: -0.9rem;
`;

export const NotiCount = styled.span`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.secondary1};
  &::after {
    display: inline-block;
    content: '';
    background-image: url(${R.svg.icoChevronLeft});
    background-repeat: no-repeat;
    background-size: 1.6rem 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: middle;
    margin: -0.2rem 0 0 0.8rem;
    transform: rotate(180deg);
  }
`;

export const HeadType2 = styled(HeadType1)`
  border: none;
`;

export const SlideList = styled(SwiperCarousel)`
  padding-bottom: 1.6rem;
  display: flex;
  .swiper {
    padding: 0 1.6rem;
  }
  .swiper-slide {
    width: 11.2rem;
    & + .swiper-slide {
      margin-left: 0.4rem;
    }
  }
`;

export const SlideItem = styled(Link)`
  figure {
    position: relative;
    max-width: 11.2rem;
    max-height: 11.2rem;
    border: 1px solid ${({ theme }) => theme.colors.line2};
    border-radius: 1.6rem;
    img {
      border-radius: 1.6rem;
    }
  }
`;

export const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1.6rem;
`;

export const HeartIcon = styled(SvgIcon)`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
`;

export const TextBox = styled.div`
  margin: 0.8rem 0 0.2rem;
  p {
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text3};
    ${({ theme }) => theme.mixins.ellipsis(2)};
  }
`;

export const Brand = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
  ${({ theme }) => theme.mixins.ellipsis(1)};
`;

export const PriceText = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalb};
  color: ${({ theme }) => theme.colors.text3};
  span {
    ${({ theme }) => theme.fonts.caption1_normalb};
    color: ${({ theme }) => theme.colors.secondary1};
    margin-right: 0.2rem;
  }
`;

export const NoticeOnce = styled(Link)`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text4};
  ${({ theme }) => theme.mixins.ellipsis(1)};
  padding: 1.6rem;
`;

export const PopReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PopTitle = styled.div`
  ${({ theme }) => theme.fonts.headline2b};
  color: ${({ theme }) => theme.colors.text3};
  padding: 1.6rem 0;
`;

export const GoodsBox = styled.div`
  width: 24rem;
  padding: 1.6rem 0;
  text-align: center;
  img {
    width: 11.2rem;
    height: 11.2rem;
    border-radius: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.line2};
  }
  p {
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text3};
    margin-top: 1.6rem;
    ${({ theme }) => theme.mixins.ellipsis(2)};
  }
`;

export const BtnWrap = styled.div`
  width: 100%;
  padding: 1.6rem 2rem;
`;
