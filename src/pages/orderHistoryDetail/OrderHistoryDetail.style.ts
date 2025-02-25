import { Button } from '@components';
import { AllOrderStates } from '@type';
import styled, { css } from 'styled-components';

import { neutral } from '@styles/theme';

import SvgIcon from '@commons/SvgIcon';

export const OrderHiDetailWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  overflow: hidden;
`;

export const OhDetailSecSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background1};
  border-radius: 1.6rem;
  margin: 1.6rem 1.6rem 0;
  padding: 2rem 1.6rem;
`;

export const OhDetailSecOrder = styled.div`
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.background2};
`;

export const OhDetailSecPay = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
`;

export const OhDetailSecShip = styled.div`
  margin-top: 0.8rem;
  background-color: ${({ theme }) => theme.colors.background1};
`;

export const OhDetailSecBtn = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 2rem 1.6rem 4rem;
  margin-top: 0.8rem;
  button {
    & + button {
      margin-top: 0.8rem;
    }
  }
`;

export const OrderDate = styled.div`
  div {
    ${({ theme }) => theme.fonts.body1_normalb};
    color: ${({ theme }) => theme.colors.text3};
  }
  p {
    ${({ theme }) => theme.fonts.body1_normal};
    color: ${({ theme }) => theme.colors.text5};
    margin-top: 0.2rem;
  }
`;

export const OrderItemPart = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  border-radius: 1.6rem;
  margin: 1.6rem 1.6rem 0;
  padding: 2rem 1.6rem;
`;

export const ItemBoxAllWrap = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.line2};
  padding: 1.6rem 0;
  &:first-child {
    border: none;
    padding-top: 0;
  }
  &:nth-last-child(2) {
    padding-bottom: 0;
  }
`;

export const ItemBox = styled.div`
  position: relative;
`;

export const ItemDetail = styled.div`
  display: flex;
`;

export const BtnWrap = styled.div`
  margin-top: 1.6rem;
  button {
    & + button {
      margin-top: 0.8rem;
    }
  }
`;

export const DisplayImg = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 1.08rem;
  border: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const DetailBox = styled.div`
  padding-left: 0.8rem;
  width: calc(100% - 7.2rem);
`;

export const DetailBrand = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalm};
  color: ${({ theme }) => theme.colors.text5};
  margin-bottom: 0.2rem;
`;

export const DetailGoodsName = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 0.2rem;
`;

export const DetailOption = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
  span {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    width: auto;
    max-width: calc(100% - 2.8rem);
    ${({ theme }) => theme.mixins.ellipsis(1)};
  }
  em {
    position: relative;
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    font-style: normal;
    padding-left: 1rem;
    &::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 1.2rem;
      background-color: ${({ theme }) => theme.colors.line3};
      position: absolute;
      top: 0.3rem;
      left: 0.5rem;
    }
  }
`;

export const PriceItem = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  align-items: center;
  margin-top: 0.4rem;
`;

export const DiscountToolTipBox = styled.div``;

export const DiscountList = styled.ul`
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding-left: 1.2rem;
    position: relative;
    &:before {
      display: inline-block;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${neutral[20]};
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
`;

export const DiscountTxt = styled.span`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text4};
`;

export const DiscountPrice = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
`;

export const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.8rem;
`;

export const DiscountTotalPrice = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
`;

export const PayState = styled.div<{ $code: string }>`
  ${({ theme }) => theme.fonts.body2_normalb};
  margin-bottom: 0.8rem;
  ${({ $code }) => {
    switch ($code) {
      case AllOrderStates.Order.SI:
      case AllOrderStates.Order.SS:
      case AllOrderStates.Order.SC:
      case AllOrderStates.Claim.EI:
      case AllOrderStates.Claim.RI:
        return css`
          color: ${({ theme }) => theme.colors.primary_text1};
        `;
      case AllOrderStates.Order.BF:
      case AllOrderStates.Claim.CC:
      case AllOrderStates.Claim.EC:
      case AllOrderStates.Claim.RC:
        return css`
          color: ${({ theme }) => theme.colors.text4};
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

export const PdIsCustom = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${({ theme }) => theme.colors.secondary1};
  margin-top: 0.2rem;
`;

export const SvgIconQuestion = styled(SvgIcon)`
  margin-left: 0.2rem;
  flex-shrink: 0;
`;

export const AddtionalBox = styled.div`
  margin-top: 1.6rem;
`;

export const AddBedge = styled.div`
  width: 4.6rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.caption2_normal};
  color: ${({ theme }) => theme.colors.text5};
  text-align: center;
  margin-bottom: 0.4rem;
  line-height: 1.9rem;
`;

export const AddItem = styled.div`
  position: relative;
`;

export const AddDetail = styled.div`
  div {
    font-size: 1.4rem;
  }
`;

export const AddState = styled.div`
  font-size: 1.4rem;
  position: absolute;
  bottom: 0;
  right: 0.5rem;
`;

export const ShipDetail = styled.div`
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 1.2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.2rem;
`;

export const ShipDetailTit = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text5};
`;

export const ShipDetailTxt = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  margin-left: 0.4rem;
`;

export const TooltipBox = styled.div`
  height: 1.6rem;
  width: 1.6rem;
  margin-left: 0.5rem;
  p {
    font-size: 1.2rem;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 0.1rem solid #eee;
`;

export const TooltipIconBox = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0;
`;

export const OhDetailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.4rem;
  padding: 0 1.6rem;
  h2 {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const PayMethodPart = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0 1.6rem;
  margin: 0 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const PayHead = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
`;

export const PayConts = styled.div`
  text-align: right;
`;

export const PayMethod = styled.div`
  ${({ theme }) => theme.fonts.body1_normalm};
  color: ${({ theme }) => theme.colors.text3};
`;

export const PayMethodMInfo = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text4};
  margin: 0.4rem auto;
`;

export const DeposiDeadline = styled.div`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.status_danger};
`;

export const TotalPricePart = styled.div`
  padding: 1.6rem 0;
  margin: 0 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const PayTotalPart = styled.div`
  padding: 1.6rem 0;
  margin: 0 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const DlType1 = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  &:last-child {
    margin-bottom: 0;
  }
  dt {
    ${({ theme }) => theme.fonts.body2_normalm};
    color: ${({ theme }) => theme.colors.text3};
  }
  dd {
    ${({ theme }) => theme.fonts.body1_normalm};
    color: ${({ theme }) => theme.colors.text3};
  }
  dd.discount-text {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;

export const DlType2 = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  dt {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    padding-left: 0.8rem;
    position: relative;
    &::before {
      content: '';
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${({ theme }) => theme.colors.status_disabled};
      position: absolute;
      top: 0.6rem;
      left: 0;
    }
  }
  dd {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
  }
`;

export const DlType3 = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  dt {
    ${({ theme }) => theme.fonts.body2_normalm};
    color: ${({ theme }) => theme.colors.text3};
  }
  dd {
    ${({ theme }) => theme.fonts.body1_normalm};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const AmountPaidPart = styled.div`
  padding: 1.6rem;
`;

export const AmountPaid = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

export const AmountTit = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
`;

export const AmountPrice = styled.span`
  ${({ theme }) => theme.fonts.headline1b};
  color: ${({ theme }) => theme.colors.text3};
`;

export const ExpectedPoints = styled.ul`
  margin-top: 1.6rem;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  li {
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};
    position: relative;
    padding-left: 1.2rem;
    &::before {
      content: '';
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${({ theme }) => theme.colors.status_disabled};
      position: absolute;
      top: 0.6rem;
      left: 0;
    }
    & + li {
      margin-top: 0.8rem;
    }
  }
`;

export const PointBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PointTitle = styled.span`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
`;

export const Point = styled.span`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
`;

export const DeliveryInfoPart = styled.div`
  padding: 0.8rem 1.6rem 2rem;
`;

export const DeliveryInfoDl = styled.dl`
  display: flex;
  & + dl {
    margin-top: 1.6rem;
  }
  dt {
    ${({ theme }) => theme.fonts.body2_normalb};
    color: ${({ theme }) => theme.colors.text5};
    width: 8rem;
    margin-right: 0.8rem;
  }
  dd {
    flex: 1;
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const CancelOneBtn = styled(Button)`
  width: 100%;
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
`;

export const HistoryPopWrapper = styled.div`
  position: relative;
  h2 {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
  }
`;

export const HistoryPopContainer = styled.div`
  padding: 6rem 1rem 0;
  h3 {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

export const DescDate = styled.div`
  font-size: 1.4rem;
  margin-left: 1rem;
`;

export const ContsPart = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey600};
  background-color: ${(props) => props.theme.colors.bg_orange};
`;

export const ContsBox = styled.ul`
  padding: 1rem;
  & + ul {
    border-top: 1px solid ${(props) => props.theme.colors.grey600};
  }
  li {
    display: flex;
    padding: 1rem 0;
    span {
      font-size: 1.4rem;
      font-weight: bold;
      width: 10rem;
    }
    div {
      font-size: 1.4rem;
    }
  }
`;

export const DetailText = styled.div``;

export const RefundPannel = styled.div`
  margin-bottom: 1.5rem;
`;

export const RefundPart = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey600};
  background-color: ${(props) => props.theme.colors.bg_orange};
  padding: 1rem;
`;

export const ProductInfo = styled.div`
  padding-bottom: 1rem;
  div {
    font-size: 1.4rem;
  }
`;

export const RefundPayInfo = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
  padding-top: 1rem;
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & + dl {
      margin-top: 1rem;
    }
    dt {
      font-size: 1.2rem;
      color: ${(props) => props.theme.colors.grey500};
    }
    dd {
      font-size: 1.2rem;
      color: ${(props) => props.theme.colors.grey500};
    }
  }
`;

export const PaymentList = styled.div`
  padding: 1rem;
  div {
    font-size: 1.4rem;
  }
`;

export const PayInfoBox = styled.div`
  padding: 1rem;
  border-top: 1px solid #ccc;
  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    dt {
      font-size: 1.4rem;
    }
    dd {
      font-size: 1.4rem;
    }
  }
`;

export const BtnBox = styled.div`
  margin-top: 2rem;
  button {
    width: 100%;
  }
`;

export const AddPayPannel = styled.div``;

export const childContentsGroup = styled.div``;
