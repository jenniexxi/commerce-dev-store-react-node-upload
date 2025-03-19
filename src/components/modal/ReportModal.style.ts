import styled from 'styled-components';

import TwoButton from '@components/button/TwoButton';

import { neutral, redOrange } from '@styles/theme';

export const TwoButtonWrap = styled(TwoButton)`
  padding: 2rem 1.6rem;
`;

export const ReportContsWrap = styled.div`
  padding: 1.6rem;
  p {
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text4};
  }
`;

export const ReportTitle = styled.h2`
  ${({ theme }) => theme.fonts.heading2b};
  color: ${({ theme }) => theme.colors.text3};
  display: flex;
  align-items: center;
  span {
    ${({ theme }) => theme.fonts.caption1_normalm};
    color: ${({ theme }) => theme.colors.secondary1};
    margin-left: 0.8rem;
  }
`;

export const NickBoxArea = styled.div`
  margin: 1rem auto 2.4rem;
`;

export const NickBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1.6rem auto 2rem;
  img {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
  }
  span {
    ${({ theme }) => theme.fonts.body3_normalm};
    color: ${({ theme }) => theme.colors.text4};
    margin-left: 0.8rem;
  }
`;

export const ReportReasonWrap = styled.div`
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
  padding: 1.6rem;
`;

export const ReasonList = styled.ul`
  margin-top: 1.6rem;
  li {
    ${({ theme }) => theme.fonts.body1_normal};
    color: ${({ theme }) => theme.colors.text4};
    padding: 1.1rem 0;
    input + label {
      margin-left: 1.2rem;
    }
  }
`;

export const NoticeList = styled.ul`
  padding: 3.2rem 1.6rem;
  li {
    position: relative;
    ${({ theme }) => theme.fonts.body2_normal};
    color: ${({ theme }) => theme.colors.text4};
    padding-left: 1.2rem;
    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      top: 0.7rem;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      background-color: ${neutral[20]};
      border-radius: 50%;
    }
    & + li {
      margin-top: 0.8rem;
    }
  }
`;

export const TextAreaConts = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.line3};
  border-radius: 1.2rem;
  margin-top: 0.8rem;
  padding: 11.5px 16px 30px;
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

export const GoodsReportReasonWrap = styled.div`
  padding: 1.6rem;
`;

export const GoodsPart = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.6rem;
  padding: 1.2rem;
  margin-top: 1.6rem;
`;

export const GoodsImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1.2rem;
  margin-right: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.line2};
  aspect-ratio: 1;
`;

export const GoodsInfo = styled.div`
  flex: 1;
  width: calc(100% - 9.2rem);
`;

export const GoodsStore = styled.div`
  ${({ theme }) => theme.fonts.caption1_normal};
  color: ${({ theme }) => theme.colors.text5};
`;

export const GoodsDisplay = styled.div`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  ${({ theme }) => theme.mixins.ellipsis(2)};
  margin: 0.2rem auto;
`;

export const GoodsPrice = styled.div``;

export const Rate = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${redOrange[60]};
  margin-right: 0.2rem;
`;

export const Price = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text3};
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
