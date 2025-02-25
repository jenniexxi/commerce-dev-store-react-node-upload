import { ShippingDelayList } from '@apis/orderApi';

import * as S from '../OrderHistoryDetail.style';

type PopupDelayProps = {
  delayDetails: ShippingDelayList[];
};

const PopupDelay = ({ delayDetails }: PopupDelayProps) => {
  return (
    <S.HistoryPopWrapper>
      <h2>배송지연 내역</h2>
      <S.HistoryPopContainer>
        <S.TitleBox>
          <h3>배송지연 내역</h3>
        </S.TitleBox>
        <S.ContsPart>
          {delayDetails.map((item, idx) => (
            <S.ContsBox key={'item' + idx}>
              <li>
                <span>상품 정보</span>
                <div>
                  <div>{item.brandName}</div>
                  <div>{item.displayGoodsName}</div>
                  <div>
                    {item.displayGoodsName} | {item.buyCnt}개
                  </div>
                </div>
              </li>
              <li>
                <span>배송지연 사유</span>
                <div>{item.delayReason}</div>
              </li>
            </S.ContsBox>
          ))}
        </S.ContsPart>
      </S.HistoryPopContainer>
    </S.HistoryPopWrapper>
  );
};

export default PopupDelay;
