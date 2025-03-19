import { useState } from 'react';

import { T } from '@commons';
import { Button, Modal } from '@components';
import { useMutation } from '@tanstack/react-query';
import { CouponTypeCodes } from '@type';

import Coupon from '@components/coupon/Coupon';
import { addToast } from '@components/toast/Toast';
import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { showMileageText } from '@utils/display';

import { DetailsContent, PriceContent } from '@apis/goodsApi';
import { MyPageMain } from '@apis/mypageApi';
import promotionApi, { CouponListResp } from '@apis/promotionApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  goodsPriceInfo?: PriceContent;
  goodsId: number;
  couponData?: CouponListResp;
  myPageInfo?: MyPageMain;
  refetch: () => void;
};
const ProductPointInfo = ({ goodsInfo, goodsId, goodsPriceInfo, couponData, myPageInfo, refetch }: Props) => {
  const [couponModal, setCouponModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const { mutate: downloadCoupon } = useMutation({
    mutationFn: (code: string) => promotionApi.postDownloadCoupon(code, { goodsId }),
    onSuccess: (data) => {
      if (data.success) {
        refetch();
      } else {
        addToast(data.error.message, 1500, 76);
      }
    },
  });

  if (!goodsInfo || !goodsPriceInfo) return;

  const showCouponModal = () => {
    setCouponModal(true);
  };

  const hideCouponModal = () => {
    setCouponModal(false);
  };

  const toggleDetail = () => {
    setIsOpen((prev) => !prev);
  };

  const downloadAllCoupon = async () => {
    const codeList = couponData?.data
      ?.filter((item) => !item.downloadYn)
      .flatMap((item) => {
        return item.code;
      });

    if (!codeList?.length) return;

    try {
      for (const code of codeList) {
        await downloadCoupon(code);
      }
    } catch (error) {
      // 에러 처리
    } finally {
      refetch();
    }
  };
  const isDownloadAll = couponData?.data.every((item) => {
    return item.downloadYn;
  });

  const storeCoupon =
    couponData?.data.filter((item) => item.typeEnum.code === CouponTypeCodes.Store && !item.downloadYn) || [];

  return (
    <S.MyBenefitView>
      <S.MyBenefitCont>
        <S.UserInfo>
          <S.UserName>{myPageInfo?.buyerGroup?.name}님을 위한 혜택</S.UserName>
          {goodsInfo.couponExistYn &&
            (isDownloadAll ? (
              <Button
                title='받은쿠폰'
                btnType='tertiary'
                size='xsm'
                onClick={showCouponModal}
              />
            ) : (
              <Button
                title='쿠폰받기'
                btnType='highlight'
                size='xsm'
                onClick={showCouponModal}
              />
            ))}
        </S.UserInfo>
        <S.PointSummaryView>
          <S.PointSummaryViewTotal>
            <S.RowViewBetween className='flex-item'>
              <strong className='bTitle'>최대 적립</strong>
              <span className='desc'>{showMileageText(goodsPriceInfo.totalExpectMileage)}</span>
            </S.RowViewBetween>
          </S.PointSummaryViewTotal>
          <S.PointSummaryViewItem>
            <S.ToolTipView>
              <p className='tipTitle'>구매적립</p>
              <NonModalTooltip
                title='구매적립'
                trigerColor={colors.icon4}
                trigerType='!'
                position='center'
                showCloseButton={true}
                defaultShown={false}
                withDot={true}
                items={[
                  '010PAY 포인트는 구매 확정 시 적립됩니다',
                  '적립 금액은 쿠폰 사용, 쇼핑지원금 사용, 010PAY 포인트 사용 및 상품 옵션 금액을 기준으로 적립되므로 최종 적립 금액은 쿠폰, 쇼핑지원금 사용여부 및 옵션 금액에 따라 달라질 수 있습니다',
                  '010PAY 포인트 사용 금액에 대한 적립은 제공되지 않습니다',
                  '기본 적립은 최대 N원까지 적립 가능합니다',
                ]}
              />
            </S.ToolTipView>
            <S.RowViewBetween className='flex-item'>
              <strong className='sTitle'>기본적립</strong>
              <span className='desc'>{showMileageText(goodsPriceInfo.goodsExpectMileage)}</span>
            </S.RowViewBetween>
          </S.PointSummaryViewItem>
          <S.AccoDetaiView $isOpen={isOpen}>
            <S.PointSummaryViewItem>
              <S.ToolTipView>
                <p className='tipTitle'>라운드 등급 적립</p>
                <NonModalTooltip
                  title='등급 적립'
                  trigerColor={colors.icon4}
                  trigerType='!'
                  position='center'
                  showCloseButton={true}
                  defaultShown={false}
                  withDot={true}
                  items={['추후 업데이트 예정이에요!']}
                />
              </S.ToolTipView>
              <S.RowViewBetween className='flex-item'>
                <strong className='sTitle'>등급 적립 혜택</strong>
                <span className='desc'>{showMileageText(goodsPriceInfo.buyerGroupExpectMileage)}</span>
              </S.RowViewBetween>
              <S.BtnMaxBenefits>
                <Button
                  title='라운드 등급 최대 적립 받기'
                  btnType='highlight'
                  size='xsm'
                  rightIcon={<i></i>}
                />
              </S.BtnMaxBenefits>
              <S.RowViewBetween className='flex-item sub-item badgeR2'>
                <S.ToolTipView>
                  <p className='tipTitle'>등급 적립 혜택</p>
                  <NonModalTooltip
                    title='등급 적립 혜택'
                    trigerColor={colors.icon4}
                    trigerType='!'
                    position='center'
                    showCloseButton={true}
                    defaultShown={false}
                    withDot={true}
                    items={['추후 업데이트 예정이에요!']}
                  />
                </S.ToolTipView>
                <span className='desc'>추가 적립 {showMileageText(goodsPriceInfo.buyerGroupExpectMileage)}</span>
              </S.RowViewBetween>
              <S.BenefitsTip>
                <span>라운드2 등급이 되면 추가 적립을 받을 수 있어요!</span>
              </S.BenefitsTip>
              <S.RowViewBetween className='flex-item sub-item badgeS'>
                <S.ToolTipView>
                  <p className='tipTitle'>슈퍼적립 혜택</p>
                  <NonModalTooltip
                    title='슈퍼적립 혜택'
                    trigerColor={colors.icon4}
                    trigerType='!'
                    position='center'
                    showCloseButton={true}
                    defaultShown={false}
                    withDot={true}
                    items={['추후 업데이트 예정이에요!']}
                  />
                </S.ToolTipView>
                <span className='desc'>추가 적립 {showMileageText(goodsPriceInfo.superExpectMileage)}</span>
              </S.RowViewBetween>
            </S.PointSummaryViewItem>
            <S.PointSummaryViewItem>
              <S.ToolTipView>
                <p className='tipTitle'>결제적립</p>
                <NonModalTooltip
                  title='결제적립'
                  trigerColor={colors.icon4}
                  trigerType='!'
                  position='center'
                  showCloseButton={true}
                  defaultShown={false}
                  withDot={true}
                  items={[
                    '결제 적립은 010PAY머니 결제 등, 특정 조건에서 결제 시 적립이 가능합니다',
                    '주문서에서 선택한 결제 수단에 따라 해당 혜택이 잘 적용되었는지 확인 부탁드립니다',
                  ]}
                />
              </S.ToolTipView>
              <S.RowViewBetween className='flex-item sub-item'>
                <S.ToolTipView className='sTitle'>
                  <p className='tipTitle'>010PAY 머니 결제 시 최대 적립</p>
                  <NonModalTooltip
                    title='010PAY 머니 결제 시 최대 적립'
                    trigerColor={colors.icon4}
                    trigerType='!'
                    position='center'
                    showCloseButton={true}
                    defaultShown={false}
                    withDot={true}
                    items={['추후 업뎃']}
                  />
                </S.ToolTipView>
                <span className='desc'>{showMileageText(goodsPriceInfo.pay010ExpectMileage)}</span>
              </S.RowViewBetween>
            </S.PointSummaryViewItem>
          </S.AccoDetaiView>
        </S.PointSummaryView>
        <S.AccoDetailBtn>
          <button
            type='button'
            onClick={toggleDetail}
          >
            {isOpen ? '접기' : '자세히 보기'}
          </button>
        </S.AccoDetailBtn>
      </S.MyBenefitCont>

      {couponModal && (
        <Modal
          onHide={hideCouponModal}
          type='bottomSheet'
          bottomTitle='사용 가능한 쿠폰'
          fixedArea={
            <S.BottomButton>
              <Button
                width='100%'
                align='center'
                title='전체 다운로드'
                disabled={isDownloadAll}
                onClick={downloadAllCoupon}
              />
            </S.BottomButton>
          }
        >
          <S.CouponModalContainer>
            {couponData?.data
              .filter((item) => item.typeEnum.code !== CouponTypeCodes.Store || item.downloadYn)
              .map((item) => {
                return (
                  <Coupon
                    goodsId={goodsId}
                    info={item}
                    type={item.typeEnum.code}
                    key={item.couponId}
                    refetch={refetch}
                  />
                );
              })}
            {storeCoupon.length > 0 && (
              <>
                <T.Body1_NormalB
                  $mt={32}
                  $mb={16}
                >
                  스토어명에서 드리는 스토어 쿠폰
                </T.Body1_NormalB>
                {storeCoupon.map((item) => {
                  return (
                    <Coupon
                      goodsId={goodsId}
                      info={item}
                      type={item.typeEnum.code}
                      key={item.couponId}
                      refetch={refetch}
                    />
                  );
                })}
              </>
            )}
          </S.CouponModalContainer>
        </Modal>
      )}
    </S.MyBenefitView>
  );
};

export default ProductPointInfo;
