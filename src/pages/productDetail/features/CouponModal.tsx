import { T } from '@commons';
import { Button } from '@components';
import { useMutation } from '@tanstack/react-query';
import { DiscountTypeCode, DiscountTypeCodes } from '@type';
import dayjs from 'dayjs';

import useWindowDimensions from '@hooks/useWindowDimensions';

import { showPriceText } from '@utils/display';

import promotionApi, { CouponInfo } from '@apis/promotionApi';

import * as S from './_ProductDetail.style';

type Props = {
  onHide: () => void;
  goodsId: number;
  couponData: CouponInfo[];
  refetch: () => void;
};

const CouponModal = ({ goodsId, couponData, refetch }: Props) => {
  const { height } = useWindowDimensions();
  const { mutate: downloadGoodsCoupon } = useMutation({
    mutationFn: (code: string) => promotionApi.postDownloadCoupon(code, { goodsId }),
    onSuccess: () => {
      refetch();
    },
  });
  const renderDiscountValue = (code: DiscountTypeCode) => {
    if (code === DiscountTypeCodes.Fixed) {
      return '원';
    } else {
      return '%';
    }
  };
  const downloadCoupon = (code: string) => {
    downloadGoodsCoupon(code);
  };
  const CouponItem = ({ couponInfo }: { couponInfo: CouponInfo }) => {
    return (
      <S.CouponContainer>
        <S.RowViewBetween>
          <S.RowView>
            <T.Body1_NormalB>
              {couponInfo.discountValue}
              {renderDiscountValue(couponInfo.discountTypeEnum.code)}
            </T.Body1_NormalB>
          </S.RowView>
          <S.RowView onClick={!couponInfo.downloadYn ? () => downloadCoupon(couponInfo.code) : () => {}}>
            <T.Body1_Normal>{couponInfo.downloadYn ? '다운로드 완료' : '다운로드'}</T.Body1_Normal>
          </S.RowView>
        </S.RowViewBetween>
        <S.Row />
        <T.Body1_Normal>{couponInfo.displayName}</T.Body1_Normal>
        {couponInfo.minGoodsYn && <T.Body2_Normal>{showPriceText(couponInfo.minGoodsPrice)}</T.Body2_Normal>}
        {couponInfo.maxDiscountYn && <T.Body2_Normal>{showPriceText(couponInfo.maxDiscountPrice)}</T.Body2_Normal>}

        <S.RowViewBetween>
          <T.Body1_Normal>{dayjs(couponInfo.issueEndDatetime).format('YYYY년 MM월 DD일')}까지</T.Body1_Normal>
          <T.Body1_Normal>적용 상품 보러가기</T.Body1_Normal>
        </S.RowViewBetween>
      </S.CouponContainer>
    );
  };

  return (
    <S.CouponModalContainer>
      <S.CouponList $maxHeight={height}>
        {couponData.map((item) => (
          <CouponItem
            couponInfo={item}
            key={item.couponId}
          />
        ))}
      </S.CouponList>
      <S.BottomButton>
        <Button
          width='100%'
          align='center'
          title='전체 다운로드'
        />
      </S.BottomButton>
    </S.CouponModalContainer>
  );
};

export default CouponModal;
