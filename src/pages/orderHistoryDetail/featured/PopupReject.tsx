import { CLAIM_TYPE_CODES } from '@type';

import { RejectList } from '@apis/orderApi';

import * as S from '../OrderHistoryDetail.style';

type RejectType = 'Cancel' | 'Exchange' | 'Return';

type PopupRejectProps = {
  rejectDetails: RejectList[];
};

const PopupReject = ({ rejectDetails }: PopupRejectProps) => {
  const getRejectDataByType = (type: RejectType) => {
    return rejectDetails.filter(
      (item) =>
        (type === 'Cancel' && item.claimTypeEnum.code === CLAIM_TYPE_CODES.Cancel) ||
        (type === 'Exchange' && item.claimTypeEnum.code === CLAIM_TYPE_CODES.Exchange) ||
        (type === 'Return' && item.claimTypeEnum.code === CLAIM_TYPE_CODES.Return),
    );
  };

  const getTitle = (type: RejectType) => {
    switch (type) {
      case 'Cancel':
        return '취소';
      case 'Exchange':
        return '교환';
      case 'Return':
        return '반품';
      default:
        return '';
    }
  };

  const renderItem = (type: RejectType) => {
    const filterdData = getRejectDataByType(type);

    if (filterdData.length === 0) {
      return null;
    }

    const typeStr = getTitle(type);

    return (
      <S.HistoryPopWrapper>
        <h2>취소/교환/반품 거부내역</h2>
        <S.HistoryPopContainer>
          <S.TitleBox>
            <h3>{typeStr} 거부내역</h3>
          </S.TitleBox>
          {filterdData.map((item, index) => (
            <S.ContsPart key={typeStr + index}>
              {item.goodsList.map((goods, idx) => (
                <S.ContsBox key={'goods' + idx}>
                  <li>
                    <span>상품 정보</span>
                    <div>
                      <div>{goods.brandName}</div>
                      <div>{goods.displayGoodsName}</div>
                      <div>
                        {goods.displayGoodsName} | {goods.buyCnt}개
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>{typeStr}거부 사유</span>
                    <div>{goods.rejectReason}</div>
                  </li>
                </S.ContsBox>
              ))}
            </S.ContsPart>
          ))}
        </S.HistoryPopContainer>
      </S.HistoryPopWrapper>
    );
  };

  return (
    <>
      {rejectDetails.length > 0 ? (
        <>
          {renderItem('Cancel')}
          {renderItem('Exchange')}
          {renderItem('Return')}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PopupReject;
