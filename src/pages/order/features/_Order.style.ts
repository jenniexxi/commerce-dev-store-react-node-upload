import { T } from '@commons';
import styled, { css } from 'styled-components';

import { colors, neutral } from '@styles/theme';

export const OrderSummaryContainer = styled.div`
  padding: 0 1.6rem 2rem;
`;

export const OrderSummaryItem = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 1.4rem;
  & ~ dl {
    margin-top: 0.8rem;
  }
  dt {
    display: flex;
    flex: 1 1;
    ${({ theme }) => theme.fonts.body2_normalm};
  }
  dd {
    ${({ theme }) => theme.fonts.body1_normalm};

    dl {
    }
  }

  dd.discount {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;
export const OrderSummaryItemDep = styled.dd`
  flex-basis: 100%;
  min-width: 0;
  margin-top: 0.8rem;

  dt {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
  }
  dd {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    dd dl {
    }
  }
`;
export const OrderSummaryTotal = styled.dl`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: 1.4rem;

  dt {
    font-size: 2rem;
    display: flex;
    flex: 1 1;
    min-width: 0;
    font-weight: bold;
  }
  dd {
    ${({ theme }) => theme.fonts.headline1b}
    dd,
    dt {
      ${({ theme }) => theme.fonts.body3_normal};
      color: ${({ theme }) => theme.colors.text4};
    }
  }
`;
export const AddressContainer = styled.div`
  height: 13.4rem;
  border: 1px solid ${colors.line3};
  border-radius: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 15px;
`;

export const Required = styled.span`
  color: red;
`;

export const AddressInputGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

export const PhoneInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const PhoneSelect = styled.select`
  position: relative;
  z-index: 1;
  width: 80px;
  height: 48px;
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 14px;
  color: #191919;
  appearance: none;

  // 드롭다운 메뉴의 위치 조정
  option {
    position: absolute;
    left: 0;
    top: 100%;
    min-width: 100%;
  }
`;

export const Separator = styled.span`
  color: #666;
  font-size: 14px; // 폰트 사이즈 추가
`;
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export const CheckboxText = styled.span`
  font-size: 12px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const ExistingAddressCard = styled.div`
  margin-bottom: 16px;
`;

export const AddressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const AddressInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AddressHeaderInfo = styled.div``;
export const DefaultBadge = styled.span`
  background: ${neutral[5]};

  padding: 0.25rem 0.4rem;
  border-radius: 0.8rem;
`;

export const DirectInputWrapper = styled.div`
  margin-top: 8px;
`;

export const OrderItemContainer = styled.div`
  padding: 0.4rem 0 2.4rem;
`;

export const OrderItemWrap = styled.div`
  background: #fff;
  border-radius: 1.2rem;

  border: 1px solid ${({ theme }) => theme.colors.line3};
  & ~ div {
    margin-top: 1.6rem;
  }
`;
export const ShippingPolicy = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.4rem;
  padding: 0 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
  font-size: 2rem;
  color: #495057;
  line-height: 1.5;

  .store-name {
    ${({ theme }) => theme.fonts.body1_normalb}
  }

  .shipping-text {
    ${({ theme }) => theme.fonts.body3_normal}
    .shipping-title {
      ${({ theme }) => theme.fonts.body3_normalm};
      color: ${({ theme }) => theme.colors.text5};
      margin-right: 0.4rem;
    }
  }
`;
export const OrderItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const OrderItem = styled.li`
  padding: 2rem 0;
  margin: 0 1.6rem;
  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.line3};
  }
`;

export const OrderInfoBox = styled.div`
  display: flex;
  margin-bottom: 1.6rem;
`;
export const OrderItemImgBox = styled.div`
  flex-shrink: 0;
  width: 8rem;
  height: 8rem;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 0.1rem solid #e9ecef;
`;

export const OrderItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const OrderInfo = styled.div`
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.background2};
  & + div {
    margin-top: 0.4rem;
  }
`;
export const OrderInfoRightItem = styled.div`
  margin-left: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OrderInfoName = styled(T.Body2_NormalM)`
  width: 100%;
  ${({ theme }) => theme.mixins.ellipsis(2)};
`;

export const OrderWithoutOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`;
export const OrderOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  p:first-child {
    align-self: flex-start;
  }
`;

export const PriceList = styled.dl`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const OrderAddList = styled.div`
  margin-top: 0.4rem;
  padding: 1.6rem 0;
  display: flex;
  align-items: center;

  gap: 0.8rem;
  font-size: 1.4rem;

  &:not(:last-child) {
    border-bottom: 0.1rem solid #e9ecef;
  }

  .add-badge {
    padding: 0.25rem 0.4rem;
    border: 1px solid ${({ theme }) => theme.colors.line3};
    border-radius: 0.8rem;
    margin-right: 0.8rem;
  }

  .name {
    flex: 1;
    min-width: 0;
    display: block;
    ${({ theme }) => theme.mixins.ellipsis(1)};
  }

  .price {
    font-weight: 500;
  }

  .count {
    color: #868e96;
  }
`;

export const DiscountSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  .discount-row {
    display: flex;
    align-items: center;

    .label {
      min-width: 70px; // 라벨 너비 고정
      font-size: 14px;
      color: #666;
    }

    .discount-amount {
      margin-left: 8px;
      color: #ff424d;
      font-weight: 500;
    }
  }
`;

export const StoreCouponSection = styled.div`
  padding: 20px;
  margin-top: 16px;
  background-color: #f8f8f8;

  .store-discount-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .label {
      min-width: 70px; // 라벨 너비 고정
      font-size: 14px;
      color: #666;
    }

    .discount-amount {
      margin-left: 8px;
      color: #ff424d;
      font-weight: 500;
    }
  }
`;

//#region  Coupon
export const CouponContainer = styled.section``;
export const Title = styled.div`
  height: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
`;

export const ApplyCouponInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem 2rem;
`;

export const CouponInfoRightItem = styled.div`
  display: flex;
  align-items: center;
`;

export const Badge = styled.span`
  height: 2rem;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary1};
  border-radius: 0.8rem;
`;

//#endregion

//#region Mileage
export const MileageContainer = styled.section`
  position: relative;
  padding: 0.4rem 0 2.4rem;
`;

export const RowView = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const InputWrap = styled.div`
  height: 4.8rem;
  flex: 1;
  margin-right: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  padding: 1.3rem 1.6rem;
  border-radius: 1.2rem;
  display: flex;
`;

export const MonyInput = styled.input`
  text-align: right;
  flex: 1;
  ${({ theme }) => theme.fonts.body1_normal};
  &::placeholder {
    color: ${({ theme }) => theme.colors.text6};
    text-align: right;
  }
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
`;
export const RowViewRight = styled(RowView)`
  justify-content: flex-end;
`;
//#endregion

//#region CashReceipt
export const CashReceiptContainer = styled.section`
  padding: 0 1.6rem 2rem;
`;
export const TypeSelector = styled.div`
  width: 100%;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.background2};
  display: flex;
  align-items: center;
  padding: 0.2rem;
  margin-top: 0.8rem;
`;

export const ReceiptType = styled.div<{ $isSelected: boolean }>`
  border-radius: 1.2rem;
  width: 50%;
  height: 4.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme, $isSelected }) =>
    $isSelected
      ? css`
          background-color: ${theme.colors.white};
          span {
            ${theme.fonts.body2_normalb};
            color: ${theme.colors.text3};
          }
        `
      : css`
          background-color: ${theme.colors.background2};
          span {
            ${theme.fonts.body2_normal};
            color: ${theme.colors.text5};
          }
        `}
`;

export const ReceiptInfoContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
  > div {
    & + div {
      margin-top: 0.8rem;
    }
  }
`;
//#endregion

//#region RefundInfo
export const RefundInfoContainer = styled.section`
  padding: 0 1.6rem 2rem;
`;
export const AccountInfoView = styled.section`
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 1.6rem;
  display: flex;
  align-items: center;
  border-radius: 1.6rem;
`;
export const BankInfoView = styled.div`
  flex: 1;
`;
export const RefundInfoView = styled.div`
  > input {
    margin-top: 0.8rem;
  }
`;

export const AccountView = styled.div`
  display: flex;
  margin-top: 0.8rem;
  button {
    margin-left: 0.8rem;
  }
`;

//#endregion

//#region BottomButton
export const PaymentButtonContainer = styled.section`
  padding: 2rem 1.6rem;
`;
//#endregion
export const SectionTitleWrap = styled.div`
  padding: 1.45rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitleRight = styled.div`
  display: flex;
  align-items: center;
  > div {
    & + div {
      margin-left: 1.6rem;
    }
  }
`;

export const FixedButtonView = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.6rem;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.background1} 50%, rgba(255, 255, 255, 0) 100%);
`;

//#region Coupon Modal

export const HeaderInfo = styled.div`
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderItemView = styled.section`
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background2};
  padding: 2rem 1.6rem 9.6rem;
`;

export const CouponModalView = styled.div`
  padding: 1.6rem;

  max-height: calc(80vh - 64px - 96px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const BottomButtonView = styled.div`
  padding: 2rem 1.6rem;
  height: 9.6rem;
  width: 100%;
`;

export const FixBottomButton = styled(BottomButtonView)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, ${({ theme }) => theme.colors.background1} 50%, rgba(255, 255, 255, 0) 100%);
`;
//#endregion
