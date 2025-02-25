import { T } from '@commons';
import styled, { css } from 'styled-components';

import { pxToRem } from '@utils/display';
import R from '@utils/resourceMapper';

export const BottomButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: hidden;
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  .bottmBtnLike {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.line3};
    margin-right: 0.8rem;
  }
`;

export const ModalContainer = styled.div`
  padding: 3rem 1rem 1rem 1rem;
`;

export const ModalAddGoodsContainer = styled.div`
  padding: 1rem 1rem 1rem 1rem;
  h3 {
    margin-top: 0.3rem;
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }
`;

export const ModalProductItem = styled.div`
  padding: 0 1rem;
  width: 100%;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.colors.grey80};
  span {
    display: inline-block;
    padding: 1rem 0;
  }
  div {
    padding: 0.3rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0;
      font-size: 1.8rem;
    }
  }
`;
export const ModalTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  span {
    font-size: 1.4rem;
  }
`;

export const ModalBottomButton = styled.div``;

export const ProdListThumb = styled.img``;

export const ProdListInfoView = styled.div`
  display: block;
  padding: 2.1rem 1.6rem 2.4rem;
  .toolTipView02 {
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
  }
  .item {
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
    border-top: 1px solid #f6f6f9;
    align-items: flex-start;
    .th {
      flex-shrink: 0;
      width: 6.6rem;
      color: ${({ theme }) => theme.colors.text5};
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.28px;
    }
    .td {
      color: ${({ theme }) => theme.colors.text4};
      .type01 {
        display: block;
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 1.4;
        letter-spacing: -0.28px;
      }
      .type02 {
        margin-top: 0.4rem;
        color: ${({ theme }) => theme.colors.text4};
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        letter-spacing: -0.24px;
      }
    }
    &.deliverBar {
      & ~ .deliverBar {
        padding-top: 0.8rem;
        .td {
          .barWrap {
            .bar {
              span {
                background-color: #b0b0b3;
              }
            }
          }
        }
      }
      .th {
        color: ${({ theme }) => theme.colors.text4};
        font-size: 12px;
        font-weight: 400;
      }
      .td {
        flex: 1;
        .barWrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .bar {
            position: relative;
            flex: 1;
            height: 0.6rem;
            border-radius: 0.3rem;
            background-color: #e5e5e8;
          }
          .percent {
            flex-shrink: 0;
            width: 5.4rem;
            color: ${({ theme }) => theme.colors.text4};
            font-size: 12px;
            font-weight: 700;
            line-height: 1.4;
            letter-spacing: -0.24px;
            text-align: right;
          }
        }
      }
    }
  }
`;

interface BarProps {
  width: string;
}
export const DeliverBarPercent = styled.span<BarProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  height: 100%;
  border-radius: 0.3rem;
  width: ${(props: BarProps) => props.width || '0%'};
  background-color: #4f4f4f;
`;

export const DeliverInfo = styled.div`
  margin-bottom: 1.6rem;
  margin-top: 1.6rem;
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.background2};
  padding: 0.8rem 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text5};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.24px;
  strong {
    color: ${({ theme }) => theme.colors.text4};
    font-weight: 400;
  }
`;

export const ReturnCare = styled.div`
  margin-top: 3.2rem;
  padding: 16px;
  border-radius: 12px;
  background: #f7ffc7;
  .toolTipView02 {
    padding-top: 0;
    padding-bottom: 0;
    .tipTitle {
      padding: 0 !important;
      font-size: 13px;
      font-weight: 700;
      span {
        font-size: 13px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.text4};
      }
      .higtlighter {
        position: relative;
        display: inline-block;
        u {
          position: relative;
          text-decoration: none;
        }
        &:before {
          content: '';
          width: 100%;
          height: 2rem;
          position: absolute;
          top: -0.1rem;
          left: 0;
          background-color: #e0ff63;
        }
      }
    }
    .linkTxt {
      color: ${({ theme }) => theme.colors.primary_text2};
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.4;
    }
  }
  .desc {
    margin-top: 0.4rem;
    color: ${({ theme }) => theme.colors.text4};
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.26px;
  }
`;

export const SecTitle = styled.p`
  color: ${({ theme }) => theme.colors.text3};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.32px;
  strong {
    color: ${({ theme }) => theme.colors.secondary1};
  }
`;

// 4점 이상
export const ProductFeedbackAboveFour = styled.section`
  padding-top: 4rem;
  .secTitle {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
  .itemList {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    white-space: nowrap;
    overflow-x: auto;
    font-size: 0;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      position: relative;
      display: flex;
      align-items: center;
      width: 28rem;
      height: 8rem;
      flex-shrink: 0;
      border-radius: 1.6rem;
      padding: 1.2rem;
      background-color: ${({ theme }) => theme.colors.background2};
      .link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      & ~ .item {
        margin-left: 0.8rem;
      }
      .left {
        flex: 1;
        .reviewRating {
          display: flex;
          align-items: center;
          .count {
            margin-left: 0.2rem;
            color: ${({ theme }) => theme.colors.text3};
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
            letter-spacing: -0.24px;
          }
        }
        .txt {
          margin-top: 0.4rem;
          word-break: break-all;
          ${({ theme }) => theme.mixins.ellipsis(2)};
          color: ${({ theme }) => theme.colors.text3};
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.24px;
          strong {
            font-weight: 700;
            margin-right: 0.3rem;
          }
        }
      }
      .right {
        flex-shrink: 0;
        width: 5.6rem;
        margin-left: 1rem;
        .imgBox {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 5.6rem;
          height: 5.6rem;
          min-width: 5.6rem;
          min-height: 5.6rem;
          border-radius: 0.8rem;
          overflow: hidden;
          img,
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          &.video {
            &:after {
              content: '';
              position: absolute;
              left: 0.2rem;
              bottom: 0.2rem;
              width: 2.4rem;
              height: 2.4rem;
              background: url(${R.svg.icoVideoPlay}) center / cover no-repeat;
            }
          }
        }
      }
    }
  }
`;

export const ProdListInfoViewItem = styled.div`
  .item {
    padding-bottom: 0;
    & ~ .item {
      border-top: 0;
      padding-top: 1.9rem;
      padding-bottom: 0;
    }
    .toolTipView02 {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
`;
export const ProdListInfoViewNoMargin = styled(ProdListInfoView)`
  padding: 1.6rem 0;
  & ~ .prodListInfoViewNoMargin {
    padding-top: 0;
  }
`;

export const ProdListInfoViewNoSpace = styled(ProdListInfoView)`
  padding: 4rem 1.6rem;
  > p {
    margin-left: 2rem;
  }
`;

export const ProductDetailSectionTitle = styled.div`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  color: ${({ theme }) => theme.colors.text3};
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.6px;
  .toolTipView01 {
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 0 !important;
    .tipTitle {
      color: ${({ theme }) => theme.colors.text3};
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.6px;
    }
  }
`;
export const ProdListDisplayName = styled.p`
  display: block;
  ${({ theme }) => theme.mixins.ellipsis(2)};
  ${({ theme }) => theme.fonts.body1_normalm}
`;

export const RowView = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 0.4rem;
  }
`;

export const RowViewBetween = styled(RowView)`
  justify-content: space-between;
  margin-bottom: 0.8rem;
  &.flex-item {
    .bTitle {
      color: #151515;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.32px;
    }
    .sTitle {
      position: relative;
      padding-left: 0.8rem;
      margin-left: 0 !important;
      color: ${({ theme }) => theme.colors.text4};
      font-size: 12px;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.24px;
      &:before {
        content: '';
        position: absolute;
        top: 0.5rem;
        left: 0;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: #d1d1d5;
      }
      .tipTile {
        color: #454545;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        letter-spacing: -0.24px;
      }
    }
    .desc {
      color: #454545;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: -0.24px;
    }
    &[class*='sub-item'] {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 0.5rem;
        left: 0;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: #d1d1d5;
      }
      & > div {
        margin-left: 0.8rem;
      }
      &[class*='badge'] {
        .tipTitle {
          padding-left: 2rem;
        }
      }
      .tipTitle {
        position: relative;
        color: ${({ theme }) => theme.colors.text4};
        font-size: 12px;
        letter-spacing: -0.24px;
        font-weight: 400;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
    &.badgeR2 {
      .tipTitle {
        &:before {
          background: url(${R.svg.icoBadgeR2}) center / cover no-repeat;
        }
      }
      .desc {
        color: #845634;
      }
    }
    &.badgeS {
      .tipTitle {
        &:before {
          background: url(${R.svg.icoBadgeS}) center / cover no-repeat;
        }
      }
      .desc {
        color: #6f28c8;
      }
    }
  }
`;

export const BrandName = styled.p`
  padding: 0.3rem 0;
  color: ${({ theme }) => theme.colors.text5};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.28px;
`;

export const ShareBtnBox = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 1.2rem;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const OriginPrice = styled.p`
  ${({ theme }) => theme.fonts.body2_normal};
  margin-top: 0.8rem;
  color: #b0b0b3;
  text-decoration: line-through;
`;

export const SalePriceView = styled(RowView)`
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
`;

export const PolicyInfo = styled.div`
  display: inline-flex;
  align-items: center;
  margin-top: 0.8rem;
  min-width: 33.6px;
  padding: 4.8px 4px;
  color: #454545;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.22px;
  border-radius: 0.8rem;
  background: #f6f6f9;
`;

export const SalePriceViewPercent = styled(T.Headline1B)`
  color: ${({ theme }) => theme.colors.secondary1};
`;

export const SalePriceViewPrice = styled(T.Headline1B)`
  color: ${({ theme }) => theme.colors.icon2};
  margin-right: 0 !important;
`;

export const ToolTipView = styled.div`
  display: inline-flex;
  align-items: center;
  .tipTitle {
    margin-right: 0 !important;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: -0.28px;
    color: ${({ theme }) => theme.colors.text3};
    &.point {
      color: ${({ theme }) => theme.colors.secondary1};
      font-weight: 700;
    }
  }
  .itemListPoint {
    color: ${({ theme }) => theme.colors.secondary1};
    font-weight: 400;
  }
  &.toolTipView01 {
    margin-left: 0.8rem;
  }
  &.toolTipView02 {
    .tipTitle {
      color: ${({ theme }) => theme.colors.text4};
      font-weight: 700;
    }
  }
`;

export const SalePrice = styled.p`
  ${({ theme }) => theme.fonts.body1_normalb};
  margin-top: 0.2rem;
`;

export const ToolTipTitle = styled.p`
  display: inline-block;
  margin-right: 0.4rem;
`;

export const TooltipIconBox = styled.span`
  display: inline-block;
`;

export const ToolTipCont = styled.div``;

export const ToolTipContTitle = styled.strong`
  color: #151515;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.32px;
`;

export const FeedbackTotalScore = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.2rem;
`;

export const FeedbackScore = styled.span`
  display: inline-flex;
  align-items: center;
  color: #151515;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.28px;
  i {
    display: inline-flex;
    align-items: center;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export const FeedbackReview = styled.button`
  margin-left: 0.8rem;
  text-decoration: underline;
  color: #888;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.28px;
`;

export const PointSummaryView = styled.section``;

export const PointSummaryViewTotal = styled.div`
  .desc {
    position: relative;
    color: #151515 !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 1.4;
    letter-spacing: -0.32px !important;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
      width: 100%;
      height: 1rem;
      background-color: #e0ff63;
    }
  }
`;

export const PointSummaryViewItem = styled.div`
  margin-top: 1.6rem;
  .flex-item {
    margin-top: 0.8rem;
    margin-bottom: 0;
  }
`;
export const BenefitsTip = styled.div`
  margin-top: 0.5rem;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2.1rem;
    height: 0.6rem;
    background: url('../src/assets/images/bg_tip_left.png') center / cover no-repeat;
  }
  span {
    margin-top: 0.6rem;
    display: inline-flex;
    height: 28px;
    padding: 0 8px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: #151515;
    color: #e0ff63;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.22px;
  }
`;
export const BtnMaxBenefits = styled.div`
  margin-top: 0.8rem;
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
    span {
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
      background: url(${R.svg.icoChevronRight}) center / cover no-repeat;
    }
  }
`;
// 적립 혜택 안내
export const MyBenefitView = styled.section`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;
export const MyBenefitCont = styled.div`
  padding: 1.6rem;
  border-radius: 16px;
  border: 1px solid #e5e5e8;
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #e5e5e8;
  margin-bottom: 1.2rem;
`;
export const UserName = styled.strong`
  color: #151515;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.32px;
`;

interface AccoDetaiViewProps {
  isOpen: boolean;
}

export const AccoDetaiView = styled.div<AccoDetaiViewProps>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;
export const AccoDetailBtn = styled.div`
  margin-top: 1.3rem;
  border-top: 1px solid #e5e5e8;
  text-align: center;
  button {
    padding-top: 1.2rem;
    width: 100%;
    color: #888;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.24px;
  }
`;

// #region CouponModal
export const CouponModalContainer = styled.div`
  padding: 2rem 2rem 0 2rem;
  height: 100%;
`;
export const CouponContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line3};
  padding: 1rem;
  margin-bottom: 1rem;
`;
export const BottomButton = styled.div`
  padding: 1rem 0;
`;
export const Row = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.line3};
  margin: 1rem 0;
`;
export const CouponList = styled.div<{ $maxHeight: number }>`
  overflow-y: auto;

  max-height: ${({ $maxHeight }) => pxToRem($maxHeight * 0.8 - 120)};
`;

// #endregion

// #region review

export const ReviewListContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
export const ReviewItemContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-right: 0.5rem;

  width: 20rem;
  flex-shrink: 0;
`;
export const ReviewTextContainer = styled.div`
  flex: 1;
  margin-right: 0.5rem;
`;

export const ReviewText = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.caption1_normal}
    ${theme.mixins.ellipsis(2)}
  `}
`;

export const ReviewImage = styled.img``;
export const ReviewVideo = styled.video``;
// #endregion

// #region banner
export const ControlsWrapper = styled.div`
  position: absolute;
  right: 1.2rem;
  bottom: 1.2rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  .btnAutoPlay {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    width: 2rem;
    height: 2rem;
    background: rgba(21, 21, 21, 0.5);
    i {
      width: 1rem;
      height: 1rem;
      background-size: 1rem 1rem;
    }
    &.play {
      i {
        width: 1.2rem;
        height: 1.2rem;
        background-size: 1.2rem 1.2rem;
      }
    }
  }
  .pagination {
    display: inline-flex;
    align-items: center;
    height: 2rem;
    padding: 0 0.6rem 0 0.4rem;
    margin-left: 0.1rem;
    background: rgba(21, 21, 21, 0.5);
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    span {
      position: relative;
      color: ${({ theme }) => theme.colors.text1};
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1;
      letter-spacing: -0.22px;
      opacity: 0.6;
      &.current {
        font-weight: 700;
        opacity: 1;
      }
      &.total {
        &:before {
          content: '|';
          display: inline-block;
          margin: 0 0.4rem;
        }
      }
    }
  }
`;
export const PaginationWrapper = styled.div``;

export const CustomPagination = css`
  .swiper-pagination-fraction {
    position: absolute;
    left: inherit;
    right: 1.2rem;
    bottom: 1.2rem;
    background: rgba(21, 21, 21, 0.5);
    color: white;
    width: 5rem;
    height: 2rem;
    padding: 0 0.6rem 0 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .swiper-pagination-current {
      ${({ theme }) => css`
        ${theme.fonts.body2_normal}
        color:${theme.colors.text1};
      `}

      padding: 0 0.3rem;
      padding-top: 0.2rem;
    }

    // 전체 페이지 숫자
    .swiper-pagination-total {
      ${({ theme }) => css`
        ${theme.fonts.body2_normalm}
        color:${theme.colors.text1};
      `}

      padding: 0 0.3rem;
      padding-top: 0.2rem;
    }
  }
`;

export const BannerSwiperContainer = styled.div<{ $withInfluencer?: boolean }>`
  position: relative;
  border-radius: 1.6rem;
  overflow: hidden;
  height: ${({ $withInfluencer }) => ($withInfluencer ? '10rem' : '16rem')};

  ${CustomPagination}
`;

// #endregion

export const ListScrollxContainer = styled.div`
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  display: flex;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  .prodItem {
    margin-right: 1rem;
    &:first-child {
      margin-left: 1.6rem;
    }
    &:last-child {
      margin-right: 1.6rem;
    }
  }
`;

export const VideoContainer = styled.div`
  width: 13.2rem;
  margin-right: 1rem;
  .video-box {
    position: relative;
    width: 13.2rem;
    height: 19.2rem;
    border-radius: 1.6rem;
    overflow: hidden;
    margin-bottom: 0.8rem;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 13.2rem;
      height: 19.2rem;
      background: linear-gradient(0deg, rgba(21, 21, 21, 0.2) 12.92%, rgba(21, 21, 21, 0) 47.26%, #151515 82.29%);
      opacity: 0.4;
    }
    video {
      width: 13.2rem;
      height: 19.2rem;
    }
    .count {
      position: absolute;
      top: 1.2rem;
      left: 1.2rem;
      z-index: 1;
      border-radius: 0.8rem;
      background: rgba(21, 21, 21, 0.4);
      padding: 0.4rem;
      color: #fff;
      font-family: Pretendard;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: -0.22px;
      display: inline-flex;
      align-items: center;
      i {
        display: flex;
        align-items: center;
        width: 1.2rem;
        height: 1.2rem;
        background-color: #fff;
        -webkit-mask-image: url(${R.svg.icoPlay});
        mask-image: url(${R.svg.icoPlay});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        mask-size: 1.2rem 1.2rem;
      }
    }
  }

  &:first-child {
    margin-left: 1.6rem;
  }
  &:last-child {
    margin-right: 1.6rem;
  }
`;

export const VideoTitle = styled.div`
  ${({ theme }) => theme.mixins.ellipsis(2)};
  color: ${({ theme }) => theme.colors.text4};
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.28px;
  font-size: 1.4rem !important;
`;

export const DetailInfo = styled.div`
  margin-top: 4rem;
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
  padding-top: 1.6rem;
  padding-bottom: 4rem;
  .detailTab {
    & > ul {
      position: sticky;
      top: 6.4rem;
      z-index: 2;
      background-color: #fff;
      display: inline-flex;
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      height: 100%;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.line2};
      }
      li {
        flex: none;
        height: 4.8rem;
        border-bottom: 0;
        & ~ li {
          margin-left: 2.4rem;
        }
        span {
          margin-top: 0;
          color: ${({ theme }) => theme.colors.text6};
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.32px;
        }
        .line {
          z-index: 1;
          bottom: 0;
        }
        .isSelected {
          span {
            color: ${({ theme }) => theme.colors.text3};
            font-weight: 700;
          }
        }
      }
    }
  }
`;

export const ProductDetail = styled.div`
  .detailViewInfo {
    margin: 1.6rem;
    padding: 1.6rem;
    border-radius: 1.6rem;
    background: ${({ theme }) => theme.colors.background2};
    p {
      position: relative;
      padding-left: 3.2rem;
      color: ${({ theme }) => theme.colors.text4};
      font-size: 12px;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.24px;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2.4rem;
        height: 2.4rem;
        background: url(${R.svg.icoExclamation}) center / cover no-repeat;
      }
      u {
        font-weight: 700;
      }
    }
  }
`;

export const ProductDetailMore = styled.div`
  display: block;
  position: relative;
  z-index: 1;
  margin-top: -9.6rem;
  padding: 2rem 1.6rem;
  background: linear-gradient(0deg, #fff 50%, rgba(255, 255, 255, 0) 100%);
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 56px;
    border-radius: 1.6rem;
    border: 1px solid ${({ theme }) => theme.colors.line3};
    background: ${({ theme }) => theme.colors.background1};
    span {
      position: relative;
      padding-right: 2.4rem;
      color: ${({ theme }) => theme.colors.text3};
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.32px;
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2rem;
        height: 2rem;
        background: url(${R.svg.icoChevronDown}) center / cover no-repeat;
      }
    }
  }
  &.isExpanded {
    margin-top: 0;
    span {
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2rem;
        height: 2rem;
        background: url(${R.svg.icoChevronUp}) center / cover no-repeat;
      }
    }
  }
`;

export const ProductReview = styled.section``;

export const EmptyView = styled.div`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const EmptyReviewView = styled.div`
  padding: 1rem;
  margin: 0 2rem;
  margin-top: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.line3};
`;
// #endregion
export const ProdTag = styled.div`
  padding: 1.6rem;
`;
export const ProdTagList = styled.div`
  margin-top: 0.8rem;
  margin-left: -0.8rem;
  font-size: 0;
  button {
    margin-left: 0.8rem;
    margin-top: 0.8rem;
    overflow: hidden;
    vertical-align: top;
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem;
    height: 2.6rem;
    line-height: 1;
    border-radius: 1.3rem;
    font-size: 1.2rem;
    font-weight: 400;
    letter-spacing: -0.24px;
    color: ${({ theme }) => theme.colors.text4};
    background-color: #f6f6f9;
  }
`;
export const PordRecommend = styled.div`
  padding: 1.6rem;
`;
export const PordItemSwiperContainer = styled.div`
  position: relative;
  margin-left: -1.6rem;
  margin-right: -1.6rem;
  margin-top: 2.4rem;
`;
export const PordItemSlide = styled.div`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

export const PordPagination = styled.div`
  padding: 1.6rem;
`;
export const PordItemControlsWrapper = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  [class*='btn'] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.line3};
    background: ${({ theme }) => theme.colors.background1};
    &.btnPrev {
      background: url(${R.svg.icoChevronLeft}) center / cover no-repeat;
      background-size: 1.6rem;
    }
    &.btnNext {
      background: url(${R.svg.icoChevronRight}) center / cover no-repeat;
      background-size: 1.6rem;
    }
  }
  .pagination {
    margin: 0 2.4rem;
    display: inline-flex;
    align-items: center;
    span {
      position: relative;
      color: ${({ theme }) => theme.colors.text3};
      opacity: 0.7;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.28px;
      &.current {
        font-weight: 700;
        opacity: 1;
      }
      &.total {
        &:before {
          content: '|';
          display: inline-block;
          margin: 0 0.4rem;
        }
      }
    }
  }
`;
export const EmptyMessage = styled.div`
  padding: 1.6rem;
`;
export const PordStoreBest = styled.div`
  margin-top: 4rem;
  padding: 1.6rem;
`;
export const PordStoreBestInfo = styled.div`
  display: flex;
  align-items: center;
  .logo {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    width: 5.6rem;
    height: 5.6rem;
    margin-right: 1.2rem;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    flex: auto;
    .brand {
      color: ${({ theme }) => theme.colors.text3};
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: -0.28px;
    }
    .count {
      margin-top: 0.2rem;
      color: ${({ theme }) => theme.colors.text3};
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.24px;
    }
  }
  .btnWrap {
    flex-shrink: 9;
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    button {
      & ~ button {
        margin-left: 0.8rem;
      }
    }
  }
`;
export const PordStoreBestItem = styled.div`
  margin-top: 2.4rem;
  .title {
    color: ${({ theme }) => theme.colors.text3};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.28px;
    strong {
      font-weight: 700;
    }
  }
  .itemBox {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    .item {
      aspect-ratio: 1 / 1;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      position: relative;
      border-radius: 1.6rem;
      margin: 2px;
      &:nth-child(1) {
        grid-column: span 2;
        grid-row: span 2;
        .pordInfo {
          .pordPrice {
            font-size: 1.4rem;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: linear-gradient(180deg, rgba(21, 21, 21, 0.05) 12.92%, rgba(21, 21, 21, 0) 48.64%, #151515 76.74%);
        opacity: 0.5;
      }
      .pordInfo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.2em;
        .pordTitle {
          ${({ theme }) => theme.mixins.ellipsis(1)};
          color: ${({ theme }) => theme.colors.text1};
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -0.24px;
        }
        .pordPrice {
          margin-top: 0.2rem;
          color: ${({ theme }) => theme.colors.text1};
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: -0.28px;
          .discount {
            margin-right: 0.4rem;
            color: ${({ theme }) => theme.colors.primary1};
          }
        }
      }
    }
  }
`;

export const ProdAnnouncementView = styled.div`
  margin-top: 4rem;
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
`;

export const ProdAnnouncementSns = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 1.6rem;
  .linkTitle {
    margin-left: 0 !important;
    font-weight: 700 !important;
  }
  [class*='link'] {
    margin-left: 1.6rem;
    color: ${({ theme }) => theme.colors.text4};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.28px;
  }
`;

export const ProdAnnouncementList = styled.ul`
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
  li {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 1.6rem;
      transform: translateY(-50%);
      background-image: url(${R.svg.icoChevronRight});
      background-repeat: no-repeat;
      background-size: 1.6rem 1.6rem;
      width: 1.6rem;
      height: 1.6rem;
    }
    button {
      display: block;
      padding: 1.6rem;
      width: 100%;
      text-align: left;
      color: ${({ theme }) => theme.colors.text4};
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.28px;
    }
  }
`;

export const AnnouncementView = styled.div`
  padding: 1.6rem;
  height: calc(100vh - 6.4rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  section {
    & ~ section {
      margin-top: 1.6rem;
    }
    h1 {
      position: relative;
      padding-left: 1.2rem;
      color: ${({ theme }) => theme.colors.text4};
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 1.4;
      letter-spacing: -0.28px;
      &:before {
        content: '';
        position: absolute;
        top: 0.7rem;
        left: 0;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.status_disabled};
      }
    }
    p {
      padding-left: 1.2rem;
      margin-top: 0.4rem;
      color: ${({ theme }) => theme.colors.text4};
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.4;
      letter-spacing: -0.28px;
    }
  }
`;
