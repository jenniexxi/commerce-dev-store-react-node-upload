import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
import { Checkbox, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AllOrderStates, CLAIM_RETURN_REQUEST_REASON } from '@type';
import dayjs from 'dayjs';

import { showModal } from '@components/modal/ModalManager';

import { useDeliveryStore } from '@stores/useDeliveryStore';

import { useHeader } from '@hooks/useHeader';

import { Code } from '@apis/apiCommonType';
import claimApi, {
  CancelRefundInfoInquiryResp,
  ClaimExchangeRequestBody,
  ExchangeRefundInfoInquiryRequestBody,
} from '@apis/claimApi';
import messages from '@apis/message';
import { OrderRefundAccountResp } from '@apis/orderApi';

import { CustomShippingList } from '../ClaimRequest';
import * as S from '../ClaimRequest.style';
import { UserAddrInfo } from '../ExchangeOrder/ExchangeOrder';
import ClaimAddPay from '../features/ClaimAddPay';
import ClaimAddr from '../features/ClaimAddr';
import ClaimPdItemGroup from '../features/ClaimPdItemGroup';
import ClaimReason from '../features/ClaimReason';
import ClaimRefundInfo from '../features/ClaimRefundInfo';
import {
  createCustomShippingList,
  getAllCheckboxCheckedState,
  getRefundOrderItemList,
  updateAllCheckedState,
  updateShippingListItem,
} from '../utils';

type Props = {
  ordersIdEncrypt: string;
  orderShippingPriceIdEncrypt: string;
  isCheckboxState: boolean;
  orderItemIdEncrypt?: string[];
  orderRefundAccountInfo?: OrderRefundAccountResp;
  images: string[];
  videos: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (index: number) => void;
  handleDeleteVideo: (index: number) => void;
};

const ReturnOrder = ({
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  isCheckboxState,
  orderItemIdEncrypt,
  orderRefundAccountInfo,
  images,
  videos,
  handleImageUpload,
  handleDeleteImage,
  handleDeleteVideo,
}: Props) => {
  useHeader('상품 반품신청', { showHeader: true, showRightButton: false });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [claimReasonEnum, setClaimReasonEnum] = useState<Code<string>>();
  const [returnReason, setReturnReason] = useState('');
  const [shippingList, setShippingList] = useState<CustomShippingList[]>([]);
  const [isAllCheckedBox, setIsAllCheckedBox] = useState(false);
  const [refundInfo, setRefundInfo] = useState<CancelRefundInfoInquiryResp>();

  const claimReasonRef = useRef<HTMLDivElement>(null);
  const [errorMessageClaimReason, setErrorMessageClaimReason] = useState('');
  const [errorMessageReason, setErrorMessageReason] = useState('');

  const { existingAddress, setExistingAddress } = useDeliveryStore();

  const { data: returnOrderInfo } = useQuery({
    queryKey: ['returnOrderInfo', ordersIdEncrypt, orderShippingPriceIdEncrypt],
    queryFn: () =>
      claimApi.claimReturnInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
  });

  const { mutate: returnRefundInfoInquiry } = useMutation({
    mutationFn: (body: ExchangeRefundInfoInquiryRequestBody) => claimApi.returnRefundInfoInquiry(body),
    onSuccess: (response) => {
      setRefundInfo(response);
      setStep(2);
      console.log('반품 정보 조회 성공:', response);
    },
    onError: (error) => {
      console.error('반품 정보 조회 실패:', error);
    },
  });

  const { mutate: claimReturnRequest } = useMutation({
    mutationFn: (body: ClaimExchangeRequestBody) => claimApi.claimReturnRequest(body),
    onSuccess: (response) => {
      console.log('클레임 반품 처리 성공:', response);
      if (refundInfo?.data?.addPaymentYn) {
        if (refundInfo?.data?.refundPrice.number < refundInfo?.data?.addPaymentPrice.number) {
          showModal.text('반품신청이 완료되었습니다.', {
            rightTitle: '확인',
            rightonClick: () => console.log('추후 작업'),
            // pg 페이지로 이동 후
            // navigate('') 환불페이지로 이동
          });
        } else {
          // pg 페이지로 이동 후
          // navigate('') 환불페이지로 이동
        }
      } else {
        showModal.text('반품신청이 완료되었습니다.', {
          rightTitle: '확인',
          rightonClick: () => console.log('환불페이지로 이동'),
          // navigate('') 환불페이지로 이동
        });
      }
    },
    onError: (error) => {
      console.error('클레임 반품 처리 실패:', error);
    },
  });

  useEffect(() => {
    if (errorMessageClaimReason || errorMessageReason) {
      // 스크롤을 ClaimReason 컴포넌트로 이동
      claimReasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errorMessageClaimReason, errorMessageReason]);

  useEffect(() => {
    if (returnOrderInfo?.success && returnOrderInfo.data.shippingList) {
      setShippingList(
        createCustomShippingList(returnOrderInfo.data.shippingList, isCheckboxState, orderItemIdEncrypt || []),
      );
      if (returnOrderInfo.data.shippingAddress) {
        setExistingAddress({ ...returnOrderInfo.data.shippingAddress, shippingMessage: '' });
      }
    }
  }, [returnOrderInfo]);

  useEffect(() => {
    const allChecked = getAllCheckboxCheckedState(shippingList);
    setIsAllCheckedBox(allChecked);
  }, [shippingList]);

  useEffect(() => {
    if (claimReasonEnum) {
      setErrorMessageClaimReason('');
    }
  }, [claimReasonEnum]);

  useEffect(() => {
    if (returnReason) {
      setErrorMessageReason('');
    }
  }, [returnReason]);

  const getReturnRefundInfo = () => {
    const body: ExchangeRefundInfoInquiryRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      orderItemList: getRefundOrderItemList(shippingList),
      claimReasonEnum: claimReasonEnum?.code!,
      collectAddressZipCode: existingAddress?.zipCode || '',
      processIngCheckYn: false,
    };
    returnRefundInfoInquiry(body);
  };

  const allCheckedItem = (checked: boolean) => {
    setIsAllCheckedBox(checked);
    setShippingList((prev) => updateAllCheckedState(checked, prev));
  };

  const shippingListItemChange = (orderItemIdEncrypt: string, checked?: boolean, value?: number) => {
    setShippingList((prev) => updateShippingListItem(prev, orderItemIdEncrypt, checked, value));
  };

  const onChangeReturnReason = (value: Code<string>) => {
    setClaimReasonEnum(value);
  };

  const reasonList = [
    {
      label: '단순 변심',
      userResponsibility: true,
      value: {
        code: CLAIM_RETURN_REQUEST_REASON.RETURN_SIMPLE_CHANGE_MIND,

        codeName: '단순 변심',
      },
    },
    {
      label: '주문 실수',
      userResponsibility: true,
      value: {
        code: CLAIM_RETURN_REQUEST_REASON.RETURN_ORDER_MISTAKE,
        codeName: '주문 실수',
      },
    },
    {
      label: '파손 및 불량',
      userResponsibility: false,
      value: {
        code: CLAIM_RETURN_REQUEST_REASON.RETURN_DAMAGE_DEFECT,
        codeName: '파손 및 불량',
      },
    },
    {
      label: '배송 누락',
      userResponsibility: false,
      value: {
        code: CLAIM_RETURN_REQUEST_REASON.RETURN_MISSING_DELIVERY,
        codeName: '배송 누락',
      },
    },
    {
      label: '오배송',
      userResponsibility: false,
      value: {
        code: CLAIM_RETURN_REQUEST_REASON.RETURN_DELIVERY_MISTAKE,
        codeName: '오배송',
      },
    },
  ];

  const handleReasonApply = () => {
    if (!claimReasonEnum) {
      setErrorMessageClaimReason('반품사유를 선택해 주세요.');
      return;
    }

    switch (claimReasonEnum.code) {
      case CLAIM_RETURN_REQUEST_REASON.RETURN_SIMPLE_CHANGE_MIND:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_ORDER_MISTAKE:
      default:
        break;
      case CLAIM_RETURN_REQUEST_REASON.RETURN_DAMAGE_DEFECT:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_MISSING_DELIVERY:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_DELIVERY_MISTAKE:
        if (returnReason === '') {
          setErrorMessageReason('반품사유를 입력해 주세요.');
          return;
        }
    }

    getReturnRefundInfo();
  };

  const placeholderText = () => {
    switch (claimReasonEnum?.code) {
      case CLAIM_RETURN_REQUEST_REASON.RETURN_SIMPLE_CHANGE_MIND:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_ORDER_MISTAKE:
      default:
        return '반품사유를 입력해 주세요. (선택)';
      case CLAIM_RETURN_REQUEST_REASON.RETURN_DAMAGE_DEFECT:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_MISSING_DELIVERY:
      case CLAIM_RETURN_REQUEST_REASON.RETURN_DELIVERY_MISTAKE:
        return '반품사유를 입력해 주세요. (필수)';
    }
  };

  const returnCondition = () => {
    if (refundInfo?.data?.addPaymentYn) {
      if (refundInfo?.data?.refundPrice.number < refundInfo?.data?.addPaymentPrice.number) {
        showModal.text('환불신청 금액보다 추가발생비용이 높습니다. 그래도 반품하시겠습니까?', {
          buttonType: 'multi',
          leftType: 'tertiary',
          leftTitle: '아니오',
          rightTitle: '예',
          rightonClick: handleReturnApply,
        });
      } else {
        console.log('111');
        showModal.text('상품 반품신청을 하시겠습니까?', {
          buttonType: 'multi',
          leftType: 'tertiary',
          leftTitle: '아니오',
          rightTitle: '예',
          rightonClick: () => {
            // pg를 타고, 그 결과에 따라서 handleReturnApply 이걸 탈지 말지 로직을 작성하고
            handleReturnApply();
          },
        });
      }
    } else {
      showModal.text('상품 반품신청을 하시겠습니까?', {
        buttonType: 'multi',
        leftType: 'tertiary',
        leftTitle: '아니오',
        rightTitle: '예',
        rightonClick: handleReturnApply,
      });
    }
  };

  const handleReturnApply = () => {
    if (existingAddress) {
      const collectAddress = {
        ...existingAddress,
      };

      const body: ClaimExchangeRequestBody = {
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
        claimReason: returnReason,
        list: getRefundOrderItemList(shippingList),
        claimItemStatusEnum: AllOrderStates.Claim.RC,
        claimReasonEnum: claimReasonEnum?.code || '',
        collectAddress,
      };

      claimReturnRequest(body);
    }
  };

  return (
    <>
      {step === 1 ? (
        <div>
          <S.CancelOrderWrap>
            <S.OhDetailSecGoods>
              <S.SummaryPart>
                <S.OrderDate>
                  <S.Date>{dayjs(returnOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
                  <S.OrderNumber>{returnOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
                </S.OrderDate>
              </S.SummaryPart>
              <S.GoodsListPart>
                {isCheckboxState ? (
                  <S.AllCheckBoxBar>
                    <Checkbox
                      checked={isAllCheckedBox}
                      value={'전체 선택'}
                      id={'allCheckedBox'}
                      name={'allCheckedBox'}
                      onChange={allCheckedItem}
                    />
                  </S.AllCheckBoxBar>
                ) : (
                  <></>
                )}
                {shippingList.map((goods) => {
                  return (
                    <S.OrderDeConts key={goods.orderShippingPriceIdEncrypt}>
                      {goods.goodsList.map((item) => {
                        return (
                          <ClaimPdItemGroup
                            key={item.goodsId}
                            item={item}
                            shippingListItemChange={shippingListItemChange}
                            withCheckbox={isCheckboxState}
                            title='반품'
                          />
                        );
                      })}
                    </S.OrderDeConts>
                  );
                })}
              </S.GoodsListPart>
            </S.OhDetailSecGoods>
            <S.OhDetailSecReason ref={claimReasonRef}>
              <ClaimReason
                claimReasonEnum={claimReasonEnum}
                reasonList={reasonList}
                onChangeClaimReason={onChangeReturnReason}
                claimReason={returnReason}
                setClaimReason={setReturnReason}
                title='반품'
                placeholder={placeholderText()}
                images={images}
                videos={videos}
                handleImageUpload={handleImageUpload}
                handleDeleteImage={handleDeleteImage}
                handleDeleteVideo={handleDeleteVideo}
                errorMessageClaimReason={errorMessageClaimReason}
                errorMessageReason={errorMessageReason}
              />
            </S.OhDetailSecReason>
            <S.OhDetailSecWrap>
              <S.OhDetailTitle>
                <h2>반품주소</h2>
              </S.OhDetailTitle>
              <ClaimAddr
                title='상품 수거지 주소'
                type='collect'
                userAddrInfo={existingAddress}
                onChangeReason={(value) => {
                  if (existingAddress) {
                    setExistingAddress({ ...existingAddress, shippingMessage: value });
                  }
                }}
                collectDesc={true}
              />
            </S.OhDetailSecWrap>
          </S.CancelOrderWrap>
        </div>
      ) : (
        <div>
          <S.CancelOrderWrap>
            <S.OhDetailSecGoodsSecond>
              <S.SummaryPartSecond>
                <S.OrderDate>
                  <S.Date>{dayjs(returnOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
                  <S.OrderNumber>{returnOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
                </S.OrderDate>
              </S.SummaryPartSecond>
              <S.GoodsListPartSecond>
                {shippingList.map((goods) => {
                  return (
                    <S.OrderDeConts key={goods.orderShippingPriceIdEncrypt}>
                      {goods.goodsList.map((item) => {
                        return (
                          <ClaimPdItemGroup
                            key={item.goodsId}
                            item={item}
                            shippingListItemChange={shippingListItemChange}
                            withCheckbox={!isCheckboxState}
                            title='반품'
                          />
                        );
                      })}
                    </S.OrderDeConts>
                  );
                })}
              </S.GoodsListPartSecond>
            </S.OhDetailSecGoodsSecond>
            <S.OhDetailSecCause>
              <S.OhDetailTitle>
                <h2>반품사유</h2>
              </S.OhDetailTitle>
              <S.ReasonShow>
                <S.ReasonTitle>{claimReasonEnum?.codeName}</S.ReasonTitle>
                <S.ReasonForExch>{returnReason || ''}</S.ReasonForExch>
              </S.ReasonShow>
              {images && images.length > 0 && (
                <S.ImgPreview>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`미리보기 ${index}`}
                    />
                  ))}
                </S.ImgPreview>
              )}
            </S.OhDetailSecCause>
            <S.OhDetailSecWrap>
              <S.OhDetailTitle>
                <h2>반품주소</h2>
              </S.OhDetailTitle>
              <S.DetailBox>
                <T.Body1_NormalB>상품 수거지 주소</T.Body1_NormalB>
                <S.DetailList>
                  <S.DetailItem>
                    <S.ListTit>보내는 분</S.ListTit>
                    <S.ListTxt>{existingAddress?.name}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>주소</S.ListTit>
                    <S.ListTxt>
                      [{existingAddress?.zipCode}] {existingAddress?.address} {existingAddress?.addressDetail}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>휴대폰번호</S.ListTit>
                    <S.ListTxt>{existingAddress?.contactNumber}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>배송요청사항</S.ListTit>
                    <S.ListTxt>
                      {existingAddress?.shippingMessage || ' -'}
                      {/* {collectAddrInfo.deliveryRequestEnum?.toString().trim() || '-'} */}
                    </S.ListTxt>
                  </S.DetailItem>
                </S.DetailList>
              </S.DetailBox>
            </S.OhDetailSecWrap>
            <S.OhDetailSecWrap>
              <ClaimRefundInfo
                refundInfo={refundInfo}
                paymentMethodEnum={returnOrderInfo?.data?.payment.paymentMethodEnum}
                orderRefundAccountInfo={orderRefundAccountInfo}
                title='반품'
              />
            </S.OhDetailSecWrap>
            {refundInfo?.data?.addPaymentYn ? (
              <ClaimAddPay
                refundInfo={refundInfo.data}
                title='반품'
              />
            ) : (
              <></>
            )}
          </S.CancelOrderWrap>
        </div>
      )}
      <S.ExchangeBtnPart>
        <TwoButton
          leftType='tertiary'
          leftTitle={step === 1 ? '취소' : '이전'}
          rightTitle={step === 1 ? '다음' : '반품신청'}
          leftonClick={() => {
            if (step === 1) {
              showModal.text('반품신청을 취소하시겠습니까?', {
                buttonType: 'multi',
                leftType: 'tertiary',
                rightonClick: () => navigate(-1),
              });
            } else {
              setStep(1);
            }
          }}
          rightonClick={() => {
            if (step === 1) {
              // if (!validateForm(collectAddrInfo)) {
              //   return;
              // }
              handleReasonApply();
            } else {
              returnCondition();
            }
          }}
        />
      </S.ExchangeBtnPart>
    </>
  );
};

export default ReturnOrder;
