import { Checkbox } from '@components';
import styled from 'styled-components';

import { neutral } from '@styles/theme';

export const ItemBox = styled.div`
  position: relative;
  padding: 1.6rem 0;
  & + div {
    border-top: 1px solid ${({ theme }) => theme.colors.line2};
  }
`;

export const ItemDetail = styled.div`
  display: flex;
`;

export const ItemCheckbox = styled(Checkbox)`
  align-items: flex-start;
`;

export const DisplayImg = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const DetailBox = styled.div`
  flex: 1;
  padding-left: 0.8rem;
  width: calc(100% - 10rem);
`;

export const DetailBrand = styled.div`
  ${({ theme }) => theme.fonts.caption1_normalm};
  color: ${({ theme }) => theme.colors.text5};
  margin-bottom: 0.2rem;
`;

export const DetailGoodsName = styled.div`
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
  margin-bottom: 0.2rem;
`;

export const DetailOption = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text4};
  margin-bottom: 0.2rem;
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
  margin: 0.4rem auto;
`;

export const PayState = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const PdIsCustom = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.body3_normalb};
  color: ${({ theme }) => theme.colors.secondary1};
  margin-top: 0.2rem;
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

export const ExchangeAbleText = styled.div`
  ${({ theme }) => theme.fonts.body3_normal};
  color: ${({ theme }) => theme.colors.text3};
`;

export const ExchangeNonAbleText = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.status_danger};
  margin-top: 0.8rem;
`;

export const AddState = styled.div`
  font-size: 1.4rem;
  position: absolute;
  bottom: 0;
  right: 0.5rem;
`;

export const AmountGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem auto;
  span {
    ${({ theme }) => theme.fonts.body2_normalm};
    color: ${({ theme }) => theme.colors.text3};
    margin-right: 0.8rem;
  }
`;

export const AmountSelector = styled.div`
  flex: 1;
`;

export const MinimumCount = styled.div`
  font-size: 1.4rem;
`;

export const OhDetailTitleTy1 = styled.div`
  padding: 1.45rem 0;
  display: flex;
  justify-content: space-between;
  h2 {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.text3};
    position: relative;
    &::before {
      display: block;
      content: '*';
      color: ${({ theme }) => theme.colors.secondary1};
      position: absolute;
      top: 0;
      right: -13px;
    }
  }
`;

export const ReasonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 50%;
    padding: 1.2rem 0;
    label {
      ${({ theme }) => theme.fonts.body1_normal};
      color: ${({ theme }) => theme.colors.text3};
    }
  }
`;

export const OhDetailTitleTy2 = styled.div`
  padding: 1.2rem 0;
  h2 {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.text3};
    margin-bottom: 0.2rem;
  }
`;

export const DescText = styled.p`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
`;

export const TextAreaConts = styled.div<{ $isError: boolean }>`
  position: relative;
  border: 1px solid ${({ theme, $isError }) => ($isError ? theme.colors.status_danger : theme.colors.line3)};
  border-radius: 1.2rem;
  margin-top: 0.8rem;
  padding: 1.6rem 1.6rem 3rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 11.4rem;
  border: none;
  outline: none;
  ${({ theme }) => theme.fonts.body1_normal};
  color: ${({ theme }) => theme.colors.text3};
  padding: 0;
  &::placeholder {
    ${({ theme }) => theme.fonts.body1_normal};
    color: ${({ theme }) => theme.colors.text6};
  }
`;

export const UploadConts = styled.div``;

export const BtnUploadWarp = styled.div`
  margin-top: 12px;
`;

export const PictureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  button {
    flex: 1;
    & + button {
      margin-left: 0.8rem;
    }
  }
`;

export const PictureInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  &::-webkit-file-upload-button {
    display: none;
  }
  &::file-selector-button {
    display: none;
  }
`;

export const ImageLengthBox = styled.div`
  margin: 1.6rem auto;
`;

export const TextAllLength = styled.span`
  ${({ theme }) => theme.fonts.caption1_normalb};
  color: ${({ theme }) => theme.colors.text6};
`;

export const PreviewWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ImagePreview = styled.div`
  position: relative;
  min-width: 9rem;
  max-width: 11rem;
  width: 33.33%;
  aspect-ratio: 1;
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1.6rem;
`;

export const DeleteButton = styled.button`
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
`;

export const InfoList = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  padding: 1.2rem;
  li {
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};
    &::before {
      display: inline-block;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${neutral[20]};
      margin-right: 0.8rem;
    }
    & + li {
      margin-top: 0.8rem;
    }
  }
`;

export const NumberCountBox = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 1.6rem;
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.icon4};
`;

export const NumberCount = styled.span`
  margin-right: 0.9rem;
  position: relative;
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.icon4};
  &::after {
    display: block;
    content: '/';
    color: ${({ theme }) => theme.colors.line3};
    position: absolute;
    top: -0.1rem;
    right: -0.6rem;
  }
`;

export const RefundInfoContainer = styled.div``;

export const RefundInfoBox = styled.div`
  padding: 1.6rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line2};
  &:first-child {
    padding-top: 0.8rem;
    border: none;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colors.grey500};
      }
    }
  }
`;

export const RefundInfoSumm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoGroup = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2_normalm};
  color: ${({ theme }) => theme.colors.text3};
  align-items: center;
`;

export const InfoPriceGroup = styled.div`
  ${({ theme }) => theme.fonts.body1_normalm};
  color: ${({ theme }) => theme.colors.text3};
`;

export const InfoGroupPayExpected = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
  align-items: center;
`;

export const InfoPriceGroupPayExpected = styled.div`
  ${({ theme }) => theme.fonts.headline1b};
  color: ${({ theme }) => theme.colors.text3};
`;

export const ToolTipContents = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
`;

export const RefundList = styled.ul`
  li {
    position: relative;
    padding-left: 0.8rem;
    margin-top: 0.8rem;
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
    &::before {
      display: inline-block;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${({ theme }) => theme.colors.status_disabled};
      border-radius: 0.2rem;
      position: absolute;
      top: 0.8rem;
      left: 0;
    }
  }
`;

export const UserRefundInfo = styled.div`
  margin: 1rem 0;
  div {
    ${({ theme }) => theme.fonts.body3_normal};
    color: ${({ theme }) => theme.colors.text4};
  }
`;

export const DescInfo = styled.ul`
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  padding: 1.2rem;
  li {
    position: relative;
    padding-left: 1.2rem;
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};
    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      top: 0.8rem;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${({ theme }) => theme.colors.status_disabled};
    }
    & + li {
      margin-top: 0.8rem;
    }
  }
`;

export const OhDetailSecWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 0.4rem 1.6rem 2rem;
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
`;

export const OhDetailSecAddWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
  padding: 0.4rem 1.6rem 2rem;
`;

export const TopSumm = styled.div`
  padding: 1.2rem 0;
`;

export const DetailAddTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.2rem;
  height: 5.4rem;
  h2 {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const RefundInfoDetail = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.8rem;
    position: relative;
    margin-top: 0.8rem;
    &::before {
      display: block;
      content: '';
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 0.2rem;
      background-color: ${neutral[20]};
      position: absolute;
      top: 0.7rem;
      left: 0;
    }
    span {
      ${({ theme }) => theme.fonts.body3_normal};
      color: ${({ theme }) => theme.colors.text4};
      display: flex;
      align-items: center;
    }
  }
`;

export const AddPayInfoContainer = styled.div``;

export const PayInfoBox = styled.div`
  margin: 1rem auto;

  .__hectofinancial_payment_wrapper:not(:first-child) {
    height: 0 !important;
  }
`;

export const PayInfoDesc = styled.p`
  font-size: 1.4rem;
`;

export const DescSumm = styled.ul`
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  padding: 1.2rem;
  li {
    position: relative;
    ${({ theme }) => theme.fonts.caption1_normal};
    color: ${({ theme }) => theme.colors.text4};
    padding-left: 1.2rem;
    & + li {
      margin-top: 0.8rem;
    }
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0.5rem;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${neutral[20]};
      border-radius: 0.2rem;
    }
    span {
      ${({ theme }) => theme.fonts.caption1_normalb};
      color: ${({ theme }) => theme.colors.text4};
      text-decoration: underline;
    }
  }
`;
