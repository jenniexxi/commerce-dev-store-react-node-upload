import styled from 'styled-components';

export const CancelOrderWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.background2};
  display: flex;
  flex-direction: column;
`;

export const OhDetailSec = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
`;

export const OhDetailSecGoods = styled(OhDetailSec)`
  border-radius: 1.6rem;
  margin: 2rem 1.6rem;
`;

export const OhDetailSecGoodsSecond = styled.div`
  margin: 2rem 1.6rem;
`;

export const OhDetailSecWrap = styled(OhDetailSec)`
  padding: 0.4rem 1.6rem 2rem;
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
`;

export const OhDetailSecReason = styled(OhDetailSec)`
  /* margin-bottom: 0.8rem; */
  padding: 0.4rem 1.6rem 2rem;
`;

export const OhDetailSecCause = styled(OhDetailSec)`
  /* margin-bottom: 0.8rem; */
  /* border-top: 0.8rem solid ${({ theme }) => theme.colors.line2}; */
  padding: 0.4rem 0 2rem;
  h2 {
    padding-left: 1.6rem;
  }
`;

export const SummaryPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line2};
`;

export const SummaryPartSecond = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 1.6rem;
  border-radius: 1.6rem;
  margin-bottom: 1.6rem;
`;

export const GoodsListPart = styled.div`
  padding: 0 1.6rem;
`;

export const GoodsListPartSecond = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 0.4rem 1.6rem;
  border-radius: 1.6rem;
`;

export const AllCheckBoxBar = styled.div`
  padding: 2rem 0 0.4rem;
`;

export const OrderDate = styled.div``;

export const Date = styled.div`
  ${({ theme }) => theme.fonts.body1_normalb};
  color: ${({ theme }) => theme.colors.text3};
  margin-bottom: 0.2rem;
`;

export const OrderNumber = styled.p`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text5};
`;

export const OrderItemPart = styled.div``;

export const OrderDeConts = styled.div``;

export const OhDetailTitle = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  h2 {
    ${({ theme }) => theme.fonts.headline2b};
    color: ${({ theme }) => theme.colors.text3};
  }
`;

export const TextAreaConts = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 3rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 12rem;
  border: none;
  outline: none;
`;

export const NumberCount = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
`;

export const RefundInfoContainer = styled.div``;

export const DescText = styled.p`
  font-size: 1.2rem;
`;

export const RefundInfoBox = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #ccc;
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
  span {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const UserRefundInfo = styled.div`
  margin: 1rem 0;
  div {
    font-size: 1.4rem;
  }
`;

export const DescInfo = styled.ul`
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 1.2rem;
  padding: 1.2rem;
  margin-bottom: 2rem;
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

export const AddPayInfoBox = styled.div``;

export const AddPayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

export const BtnPart = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 2rem 1.6rem;
  /* margin-top: 0.8rem; */
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
`;

export const ExchangeBtnPart = styled.div`
  background-color: ${({ theme }) => theme.colors.background1};
  padding: 0 1.6rem 2rem;
  padding-top: 2rem;
  border-top: 0.8rem solid ${({ theme }) => theme.colors.line2};
`;

export const AddPayInfoContainer = styled.div``;

export const PayInfoBox = styled.div`
  margin: 1rem auto;
`;

export const PayInfoDesc = styled.p`
  font-size: 1.4rem;
`;

//#region 취소

//#endregion 취소

//#region 교환
export const ItemPart = styled.div``;

export const ItemConts = styled.div``;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ItemGroup = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 20rem;
  }
`;

export const MoGroup = styled.div``;

export const ReasonShow = styled.div``;

export const ReasonTitle = styled.div`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text5};
  margin: 0.8rem 1.6rem 0;
`;

export const ReasonForExch = styled.p`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
  margin: 0.8rem 1.6rem 0;
`;

export const ImgPreview = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 1.6rem;
  margin-top: 1.6rem;
  img {
    flex-shrink: 0;
    width: 10rem;
    height: 10rem;
    border-radius: 1.6rem;
    + img {
      margin-left: 0.8rem;
    }
  }
`;

export const DetailBox = styled.div`
  &:nth-child(2) {
    /* padding: 0.8rem 0 2rem; */
  }
  &:last-child {
    /* padding: 2rem 0 0 0; */
  }
`;

export const DetailList = styled.div`
  div {
    display: flex;
    align-items: center;
  }
`;

export const DetailItem = styled.div`
  margin-top: 1.6rem;
`;

export const ListTit = styled.span`
  ${({ theme }) => theme.fonts.body2_normalb};
  color: ${({ theme }) => theme.colors.text5};
  width: 8rem;
  margin-right: 0.8rem;
  flex-shrink: 0;
`;

export const ListTxt = styled.span`
  ${({ theme }) => theme.fonts.body2_normal};
  color: ${({ theme }) => theme.colors.text3};
`;
//#endregion 교환

//#region 반품
//#endregion 반품
