import { T } from '@commons';
import { Button, Checkbox } from '@components';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@components/header/Header.style';

import { fonts } from '@styles/theme';

import { pxToRem } from '@utils/display';

import SvgIcon from '@commons/SvgIcon';

export const ContsWrapper = styled.main`
  background-color: ${(props) => props.theme.colors.background2};
`;

export const NonContsWrapper = styled.main``;

export const TopContsSec = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30.8rem;
  background-color: ${(props) => props.theme.colors.background1};
  padding: 4.75rem 1.6rem 0.8rem;
  position: relative;
  &::after {
    content: '';
    width: 100%;
    height: 0.8rem;
    background-color: ${(props) => props.theme.colors.line2};
    position: absolute;
    bottom: 0;
    left: 0;
  }
  p {
    ${({ theme }) => theme.fonts.body1_normalm};
    margin: 1.55rem 0 2rem;
  }
`;

export const ContsSec = styled.div``;

export const PickSummary = styled.div`
  position: sticky;
  top: ${pxToRem(HEADER_HEIGHT)};
  display: flex;
  justify-content: space-between;
  height: 5rem;
  padding: 0 1.6rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background1};
  z-index: 1;
`;

export const TopRightButtonWrap = styled.div`
  display: flex;
  button:last-child {
    margin-left: 0.4rem;
  }
`;
export const BoxPie = styled.div`
  display: flex;
`;

export const CustomSvgIcon = styled(SvgIcon)`
  transform: rotate(180deg);
`;

export const ItemShipCost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background2};
  border-radius: 0.8rem;
  padding: 1.2rem 0;
  margin: 0 1.6rem;
`;

export const BindText = styled.span`
  ${({ theme }) => theme.fonts.caption2_normal};
  background-color: ${(props) => props.theme.colors.primary1};
  color: ${(props) => props.theme.colors.text3};
  width: 4.6rem;
  height: 2rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;

export const ShipItem = styled.div`
  display: flex;
  align-items: center;
`;

export const ShipTag = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${(props) => props.theme.colors.text5};
  margin-right: 0.4rem;
`;

export const ShipFee = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${(props) => props.theme.colors.text3};
`;

export const TooltipBox = styled.div``;

export const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const TooltipIconBox = styled.span`
  margin-top: 0.1rem;
`;

export const ProductItem = styled.div`
  position: relative;
  padding: 2rem 1.6rem;
`;

export const CloseBtn = styled.button`
  width: 1.6rem;
  height: 1.6rem;
`;

export const ProductBox = styled.div`
  display: flex;
`;
export const GoodsSection = styled.div`
  width: 100%;
`;
export const ProductInfo = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;

export const OptionItem = styled.div`
  position: relative;
  width: 100%;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 1.2rem 1.6rem;
  margin-bottom: 0.4rem;
`;

export const OptionDeleteButton = styled.button`
  height: 1.6rem;
`;

export const ProductSub = styled.div`
  ${({ theme }) => theme.fonts.body3_normalm};
  color: ${(props) => props.theme.colors.text4};
  background-color: ${(props) => props.theme.colors.background2};
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  margin: 1.6rem 0 0.4rem 2.6rem;
`;

export const ProductImgBox = styled.div`
  display: flex;
`;

export const ImgWidthCheckBox = styled(Checkbox)`
  align-items: baseline;
`;

export const ProductImgWrapper = styled.div<{ $isInactive: boolean }>`
  position: relative;
  width: 8rem;
  height: 8rem;
  border: 1px solid ${(props) => props.theme.colors.line2};
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 8rem;
    height: 8rem;
    background-color: ${(props) => props.theme.colors.white};

    opacity: ${({ $isInactive }) => ($isInactive ? '0.5' : '1')};
  }
`;

export const ProductText = styled.div`
  overflow: hidden;
  margin-left: 1.2rem;
  margin-right: 0.8rem;
  flex: 1;
`;

export const ProductBrand = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalm};
  color: ${({ theme }) => theme.colors.text5};
  ${({ theme }) => theme.mixins.ellipsis(1)};
`;

export const ProductName = styled.div<{ $isInactive?: boolean }>`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
  opacity: ${({ $isInactive }) => ($isInactive ? '0.5' : '1')};
  margin-top: 0.2rem;
`;

export const ProductPrice = styled.div`
  display: flex;
  align-items: center;
`;
export const RecommendPrice = styled(T.Body3_Normal)`
  color: ${({ theme }) => theme.colors.text5};
  margin-right: 0.4rem;
  text-decoration: line-through;
`;

export const ProductType = styled.div`
  display: flex;
  align-items: center;
`;
export const ProductDesc = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProductOption = styled.span<{ $isInactive?: boolean }>`
  ${({ theme }) => theme.fonts.body3_normalm};
  color: ${({ theme }) => theme.colors.text4};
`;

export const ProductQuantity = styled.span<{ $isInactive?: boolean }>`
  ${({ theme }) => theme.fonts.body3_normalm};
  color: ${({ theme }) => theme.colors.text4};
`;

export const ProductInfoStatus = styled.span`
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${({ theme }) => theme.colors.text4};
`;

export const StatusText = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text4};
  margin-top: 0.2rem;
`;

export const OriginPrice = styled.span<{ $isInactive?: boolean }>`
  ${({ $isInactive }) => !$isInactive && fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text5};
  text-decoration: line-through;
`;

export const DiscountPrice = styled.span<{ $isInactive?: boolean }>`
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${({ theme }) => theme.colors.text3};
  margin-left: 0.4rem;
`;

export const ShipBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ShipPrice = styled.div<{ $isInactive?: boolean }>`
  color: ${({ $isInactive }) => ($isInactive ? '#eee' : '#000')};
`;

export const ProductStatus = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text4};
  margin-top: 0.2rem;
`;

export const AddProductContainer = styled.div`
  display: flex;
  width: 100%;

  padding: 0.8rem 1.2rem 0.8rem 0.4rem;
  position: relative;
  & + div {
    margin-top: 0.4rem;
  }
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.line2};
    padding: 1.1rem 0 1.6rem 0.4rem;
  }
`;

export const AddOptionBedge = styled.span`
  flex-shrink: 0;
  width: 4.6rem;
  height: 2rem;
  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.theme.colors.line3};

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 0.8rem;
`;

export const DetailGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 1.2rem;
  ${({ theme }) => theme.mixins.ellipsis(2)}
  span {
    height: 2rem;
    line-height: 2rem;
  }
`;

export const ItName = styled.span`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${(props) => props.theme.colors.text4};
`;

export const ItCount = styled.span`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${(props) => props.theme.colors.text4};
`;

export const ItPrice = styled.span`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${(props) => props.theme.colors.text4};
`;

export const ItPriceStatus = styled.span`
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${(props) => props.theme.colors.text4};
`;

export const OptionCloseBtn = styled.button`
  width: 20px;
  height: 20px;
`;

export const GoodsPerGroup = styled.div`
  padding: 1.6rem 0 1.2rem 0;
`;

export const GoodsPer = styled.div`
  display: flex;
  justify-content: space-between;
  &:last-child {
    margin-top: 0.8rem;
  }
`;

export const LeftTextItem = styled.div`
  display: flex;
  align-items: center;
`;

export const GoodsTit = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${(props) => props.theme.colors.text4};

  margin-right: 0.2rem;
`;

export const GoodsTxt = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${(props) => props.theme.colors.text4};
`;

export const GoodsTxtB = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${(props) => props.theme.colors.text3};
`;

export const OrderBtn = styled.div`
  text-align: right;
  display: flex;
  margin: 0 0 0 2.6rem;
  button {
    &:first-child {
      margin-right: 0.4rem;
    }
  }
`;

export const OrderButton = styled(Button)`
  width: 50%;
`;

export const ProductTotal = styled.div`
  background-color: ${(props) => props.theme.colors.background1};
  padding: 2.4rem 1.6rem;
`;

export const ItemDl = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  &:nth-child(3) {
    margin-bottom: 1.6rem;
  }
`;

export const ItemTitle = styled.dt`
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${(props) => props.theme.colors.text4};
`;

export const ItemPrice = styled.dd`
  font-size: 1.4rem;
  ${({ theme }) => theme.fonts.body1_normalm};
  color: ${(props) => props.theme.colors.text3};
`;

export const ItemDiscount = styled(ItemPrice)`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${(props) => props.theme.colors.secondary1};
`;

export const ItemTotal = styled.dl`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.colors.line2};
  padding-top: 1.6rem;
  dt {
    ${({ theme }) => theme.fonts.body1_normalb};
    color: ${(props) => props.theme.colors.text3};
  }
  dd {
    ${({ theme }) => theme.fonts.headline1b};
    color: ${(props) => props.theme.colors.text3};
  }
`;

export const InfoList = styled.ul`
  margin: 0 1.6rem 2.4rem;
  li {
    position: relative;
    padding-left: 0.8rem;
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${(props) => props.theme.colors.text4};
    & + li {
      margin-top: 0.8rem;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${(props) => props.theme.colors.status_disabled};
    }
  }
`;

export const TotalBottom = styled.div<{ $isExpend: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background1};
  padding: 1.6rem 1.6rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  z-index: 99;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease-in-out;
  height: ${({ $isExpend }) => ($isExpend ? '23.2rem' : '8.4rem')};
`;
export const TotalPriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TotalBox = styled.div`
  display: flex;
  width: 8.7rem;
  margin-right: 1.2rem;
`;

export const TotalText = styled.div`
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};
  span {
    ${({ theme }) => theme.fonts.body1_normalb};
  }
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  button {
    width: 100%;
    ${({ theme }) => theme.fonts.body2_normalb};
  }
`;

export const Arrow = styled.span`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin: 0 0.1rem 0 0.4rem;
`;

export const TotalBtWrap = styled.div`
  padding: 0;
`;
export const Handle = styled.div`
  height: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PayBox = styled.div`
  margin-top: 1.2rem;
  padding-bottom: 1.6rem;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
`;

// export const TotalBePayDl = styled.dl`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

export const PayDt = styled.dt`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PayDd = styled.dd`
  font-size: 1.6rem;
`;

export const AmountDl = styled.dl`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const AmountDt = styled.dt`
  p {
    color: ${({ theme }) => theme.colors.text4};
  }
`;

export const AmountDd = styled.dd<{ $isMinus?: boolean }>`
  p {
    color: ${({ $isMinus, theme }) => ($isMinus ? theme.colors.secondary1 : theme.colors.text3)};
  }
`;

// ProductMOdify 장바구니 주문수정

export const OrderModifyContainer = styled.div`
  padding: 0 2rem 2rem 2rem;
`;

export const ProductPart = styled.div`
  display: flex;
  img {
    width: 7.2rem;
    height: 7.2rem;
    border: 1px solid ${(props) => props.theme.colors.grey400};
  }
`;

export const TextBox = styled.div`
  div {
    font-size: 1.4rem;
    & + div {
      margin-top: 0.6rem;
    }
  }
`;

export const BrandName = styled.div`
  font-weight: bold;
`;

export const TextPrice = styled.div``;

export const OrigPrice = styled.span`
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.grey500};
  text-decoration: line-through;
`;

export const DiscPrice = styled.span`
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const OtherOpPart = styled.div`
  p {
    margin-bottom: 0.8rem;
  }
`;

export const AddOpPart = styled.div`
  margin-top: 1.6rem;
  p {
    margin-bottom: 0.8rem;
  }
`;

export const OptionBoxWrap = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.background2};
  padding: 2rem;
  margin-top: 1.5rem;
  border-radius: 1.2rem;
`;

export const OptionBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const Info = styled.div`
  margin-bottom: 1rem;
  display: flex;
`;

export const Bedge = styled.span`
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  padding: 0.4rem 1rem;
  display: inline-flex;
  align-items: center;
`;

export const Name = styled.span`
  ${({ theme }) => theme.fonts.body2_normalm};
  ${({ theme }) => theme.mixins.ellipsis(2)};
  flex: 1;
  margin-right: 1.2rem;
`;

export const CloseButton = styled.button`
  width: 1.6rem;
  height: 1.6rem;
`;

export const QuantityInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OptionPrice = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const BasicOptionBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
`;

export const AmountPart = styled.div`
  background-color: ${(props) => props.theme.colors.grey50};
  padding: 2rem 1rem;
  margin-top: 2rem;
`;

export const PrdDl = styled.dl`
  display: flex;
  justify-content: space-between;
`;

export const PrdDt = styled.dt`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PrdDd = styled.dd`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ShipDl = styled.dl`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ShipDt = styled.dt`
  font-size: 1.4rem;
`;

export const ShipDd = styled.dd`
  font-size: 1.4rem;
`;

export const TextItem = styled.div`
  display: flex;
  align-items: center;
`;
export const SummaryView = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const BtnBox = styled.div`
  padding: 1.2rem 1.6rem 2rem;
`;

export const BtnRestock = styled.button`
  width: 100%;
  height: 3.4rem;
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    margin-left: 0.4rem;
    color: ${(props) => props.theme.colors.text3};
  }
`;

export const BottomPadding = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  height: 8.4rem;
  width: 100%;
`;
