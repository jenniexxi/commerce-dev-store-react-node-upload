import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { T } from '@commons';
import { Checkbox, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AllOrderStates, CLAIM_EXCHANGE_REQUEST_REASON } from '@type';
import dayjs from 'dayjs';

import { MobileNumber } from '@components/input/MobileInput';
import { showModal } from '@components/modal/ModalManager';

import { useDeliveryStore } from '@stores/useDeliveryStore';

import { useHeader } from '@hooks/useHeader';

import { Code } from '@apis/apiCommonType';
import buyersApi, { DeliveryAddress, Encrypt } from '@apis/buyersApi';
import claimApi, {
  ClaimExchangeRequestBody,
  ConfirmIsExchangeRequestBody,
  ExchangeRefundInfoInquiryRequestBody,
  ExchangeRefundInfoInquiryResp,
} from '@apis/claimApi';
import messages from '@apis/message';

import Separator from '@commons/Separator';

import { CustomShippingList } from '../ClaimRequest';
import * as S from '../ClaimRequest.style';
import ClaimAddPay from '../features/ClaimAddPay';
import ClaimAddr from '../features/ClaimAddr';
import ClaimPdItemGroup from '../features/ClaimPdItemGroup';
import ClaimReason from '../features/ClaimReason';
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
  images: string[];
  videos: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (index: number) => void;
  handleDeleteVideo: (index: number) => void;
};

export type UserAddrInfo = {
  name: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phonenumber: MobileNumber;
  deliveryRequestEnum: string | Code<string>;
  reason?: string;
};

const ExchangeOrder = ({
  ordersIdEncrypt,
  orderShippingPriceIdEncrypt,
  isCheckboxState,
  orderItemIdEncrypt,
  images,
  videos,
  handleImageUpload,
  handleDeleteImage,
  handleDeleteVideo,
}: Props) => {
  useHeader('상품 교환신청', { showHeader: true, showRightButton: false });
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [claimReasonEnum, setClaimReasonEnum] = useState<Code<string>>();
  const [exchangeReason, setExchangeReason] = useState('');
  const [shippingList, setShippingList] = useState<CustomShippingList[]>([]);
  const [isAllCheckedBox, setIsAllCheckedBox] = useState(false);
  const [refundInfo, setRefundInfo] = useState<ExchangeRefundInfoInquiryResp>();

  const claimReasonRef = useRef<HTMLDivElement>(null);
  const [errorMessageClaimReason, setErrorMessageClaimReason] = useState('');
  const [errorMessageReason, setErrorMessageReason] = useState('');

  const {
    existingAddress,
    setExistingAddress,
    exchangeAddress,
    setExchangeAddress,
    exchangeRequest,
    setExchangeRequest,
    exchangeRequestReason,
    setExchangeRequestReason,
  } = useDeliveryStore();

  const { data: addressCount } = useQuery({
    queryKey: ['getMyAddressCount'],
    queryFn: () => buyersApi.getMyAddressCount(),
  });

  const { data: addressData } = useQuery({
    queryKey: ['getMyAddresses'],
    queryFn: () => buyersApi.getMyAddresses(),
    enabled: addressCount && addressCount?.data !== 0,
  });

  const { data: exchangeOrderInfo } = useQuery({
    queryKey: ['ExchangeOrderInfo', ordersIdEncrypt, orderShippingPriceIdEncrypt],
    queryFn: () =>
      claimApi.claimExchangeInfoView({
        ordersIdEncrypt,
        orderShippingPriceIdEncrypt,
      }),
  });

  const { mutate: confirmIsExchangeOrder } = useMutation({
    mutationFn: (body: ConfirmIsExchangeRequestBody) => claimApi.confirmIsExchangeOrder(body),
    onSuccess: (response) => {
      if (response.list && response.list.length > 0) {
        showModal.text('교환신청하신 상품의 재고가 현재 부족하여 교환이 불가합니다. 고객센터에 문의바랍니다.');
      } else {
        if (refundInfo?.data?.addPaymentYn) {
          showModal.text(messages.Confirm40, {
            buttonType: 'multi',
            rightonClick: () => {
              // handleExchangeApply();
            },
          });
        } else if (!refundInfo?.data?.addPaymentYn) {
          showModal.text(messages.Confirm40, {
            buttonType: 'multi',
            rightonClick: () => {
              handleExchangeApply();
            },
          });
        }
      }
      console.log('주문 교환 가능 확인 성공:', response);
    },
    onError: (error) => {
      console.error('주문 교환 가능 확인 실패:', error);
    },
  });

  const { mutate: exchangeRefundInfoInquiry } = useMutation({
    mutationFn: (body: ExchangeRefundInfoInquiryRequestBody) => claimApi.exchangeRefundInfoInquiry(body),
    onSuccess: (response) => {
      setRefundInfo(response);
      setStep(2);
      console.log('교환 정보 조회 성공:', response);
    },
    onError: (error) => {
      console.error('교환 정보 조회 실패:', error);
    },
  });

  const { mutate: claimExchangeRequest } = useMutation({
    mutationFn: (body: ClaimExchangeRequestBody) => claimApi.claimExchangeRequest(body),
    onSuccess: (response) => {
      console.log('클레임 교환 처리 성공:', response);
      if (refundInfo?.data?.addPaymentYn) {
        console.log('클레임 교환 처리 성공 추가결제 있음');
        // navigate('') //교환페이지로 이동
      } else {
        showModal.text(messages.Alert324, {
          rightonClick: () => {
            // navigate('') //교환페이지로 이동
          },
        });
      }
    },
    onError: (error) => {
      console.error('클레임 교환 처리 실패:', error);
    },
  });

  useEffect(() => {
    if (exchangeOrderInfo?.success && exchangeOrderInfo.data.shippingList) {
      setShippingList(
        createCustomShippingList(exchangeOrderInfo.data.shippingList, isCheckboxState, orderItemIdEncrypt || []),
      );
      if (exchangeOrderInfo.data.shippingAddress) {
        setExistingAddress({ ...exchangeOrderInfo.data.shippingAddress, shippingMessage: '' });
      }
    }
  }, [exchangeOrderInfo]);

  useEffect(() => {
    const defaultAddress =
      addressData?.data?.filter((address: DeliveryAddress & Encrypt) => address.defaultYn === true)[0] ?? undefined;

    if (defaultAddress) {
      setExchangeAddress({
        name: defaultAddress.receiverName + '(' + defaultAddress.name + ')',
        contactNumber: defaultAddress.receiverCellPhone,
        zipCode: defaultAddress.zipCode,
        address: defaultAddress.receiverAddress,
        addressDetail: defaultAddress.receiverAddressDetail,
        shippingMessage: '',
        shippingOrderAddressIdEncrypt: defaultAddress.buyerAddressIdEncrypt,
      });
    }
  }, [addressData]);

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
    if (exchangeReason) {
      setErrorMessageReason('');
    }
  }, [exchangeReason]);

  useEffect(() => {
    if (errorMessageClaimReason || errorMessageReason) {
      // 스크롤을 ClaimReason 컴포넌트로 이동
      claimReasonRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errorMessageClaimReason, errorMessageReason]);

  const getExchangeRefundInfo = () => {
    if (!exchangeAddress || !existingAddress) return;
    const body: ExchangeRefundInfoInquiryRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      orderItemList: getRefundOrderItemList(shippingList),
      claimReasonEnum: claimReasonEnum?.code!,
      collectAddressZipCode: exchangeAddress.zipCode,
      reShippingAddressZipCode: exchangeAddress.zipCode,
      processIngCheckYn: false,
    };
    exchangeRefundInfoInquiry(body);
  };

  const shippingListItemChange = (orderItemIdEncrypt: string, checked?: boolean, value?: number) => {
    setShippingList((prev) => updateShippingListItem(prev, orderItemIdEncrypt, checked, value));
  };

  const allCheckedItem = (checked: boolean) => {
    setIsAllCheckedBox(checked);
    setShippingList((prev) => updateAllCheckedState(checked, prev));
  };

  const onChangeExchangeReason = (value: Code<string>) => {
    setClaimReasonEnum(value);
  };

  const handleExchangeApply = () => {
    if (!exchangeAddress || !existingAddress) {
      return;
    }

    const body: ClaimExchangeRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      claimReason: exchangeReason,
      list: getRefundOrderItemList(shippingList),
      claimItemStatusEnum: AllOrderStates.Claim.EC,
      claimReasonEnum: claimReasonEnum?.code || '',
      collectAddress: existingAddress,
      reShippingAddress: exchangeAddress,
    };

    claimExchangeRequest(body);
  };

  const reasonList = [
    {
      label: '단순 변심',
      userResponsibility: true,
      value: {
        code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_CHANGE_OPTION,
        codeName: '단순 변심',
      },
    },
    {
      label: '주문 실수',
      userResponsibility: true,
      value: {
        code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_ORDER_MISTAKE,
        codeName: '주문 실수',
      },
    },
    {
      label: '오배송',
      userResponsibility: false,
      value: {
        code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DELIVERY_MISTAKE,
        codeName: '오배송',
      },
    },
    {
      label: '파손 및 불량',
      userResponsibility: false,
      value: {
        code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DAMAGE_DEFECT,
        codeName: '파손 및 불량',
      },
    },
    {
      label: '구성품 누락',
      userResponsibility: false,
      value: {
        code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_MISSING_DELIVERY,
        codeName: '구성품 누락',
      },
    },
  ];

  const placeholderText = () => {
    switch (claimReasonEnum?.code) {
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_CHANGE_OPTION:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_ORDER_MISTAKE:
      default:
        return '교환사유를 입력해 주세요. (선택)';
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DELIVERY_MISTAKE:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DAMAGE_DEFECT:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_MISSING_DELIVERY:
        return '교환사유를 입력해 주세요. (필수)';
    }
  };

  const handleReasonApply = () => {
    if (!claimReasonEnum) {
      setErrorMessageClaimReason('교환사유를 선택해 주세요.');
      return;
    }

    switch (claimReasonEnum.code) {
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_CHANGE_OPTION:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_ORDER_MISTAKE:
      default:
        break;
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DELIVERY_MISTAKE:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DAMAGE_DEFECT:
      case CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_MISSING_DELIVERY:
        if (exchangeReason === '') {
          setErrorMessageReason('교환사유를 입력해 주세요.');
          return;
        }
    }

    getExchangeRefundInfo();
  };

  if (exchangeOrderInfo?.success === false) return <></>;

  return (
    <>
      {step === 1 ? (
        <div>
          <S.CancelOrderWrap>
            <S.OhDetailSecGoods>
              <S.SummaryPart>
                <S.OrderDate>
                  <S.Date>{dayjs(exchangeOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
                  <S.OrderNumber>{exchangeOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
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
                    <S.OrderItemPart key={goods.orderShippingPriceIdEncrypt}>
                      {goods.goodsList.map((item) => {
                        return (
                          <ClaimPdItemGroup
                            key={item.goodsId + item.buyCnt}
                            item={item}
                            shippingListItemChange={shippingListItemChange}
                            withCheckbox={isCheckboxState}
                            title='교환'
                          />
                        );
                      })}
                    </S.OrderItemPart>
                  );
                })}
              </S.GoodsListPart>
            </S.OhDetailSecGoods>
            <S.OhDetailSecReason ref={claimReasonRef}>
              <ClaimReason
                claimReasonEnum={claimReasonEnum}
                reasonList={reasonList}
                onChangeClaimReason={onChangeExchangeReason}
                claimReason={exchangeReason}
                setClaimReason={setExchangeReason}
                title='교환'
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
                <h2>교환주소</h2>
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
              />
              <Separator
                $height={1}
                $mv={20}
              />
              <ClaimAddr
                title='교환상품 받으실 주소'
                type='delivery'
                userAddrInfo={exchangeAddress}
                onChangeReason={(value) => {
                  if (exchangeAddress) {
                    setExchangeAddress({ ...exchangeAddress, shippingMessage: value });
                  }
                }}
                deliveryDesc={true}
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
                  <S.Date>{dayjs(exchangeOrderInfo?.data?.order?.orderDate).format('YYYY.MM.DD')}</S.Date>
                  <S.OrderNumber>{exchangeOrderInfo?.data?.order?.orderNumber}</S.OrderNumber>
                </S.OrderDate>
              </S.SummaryPartSecond>
              <S.GoodsListPartSecond>
                {shippingList.map((goods) => {
                  return (
                    <S.OrderDeConts key={goods.orderShippingPriceIdEncrypt}>
                      {goods.goodsList.map((item) => {
                        if (!item.isChecked) return;
                        return (
                          <ClaimPdItemGroup
                            key={item.goodsId}
                            item={item}
                            shippingListItemChange={shippingListItemChange}
                            withCheckbox={!isCheckboxState}
                            title='교환'
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
                <h2>교환사유</h2>
              </S.OhDetailTitle>
              <S.ReasonShow>
                <S.ReasonTitle>{claimReasonEnum?.codeName}</S.ReasonTitle>
                <S.ReasonForExch>{exchangeReason || ''}</S.ReasonForExch>
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
                <h2>교환주소</h2>
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
                      {exchangeRequest?.code === 'ORDER.SHIPPING_REQUEST.DIRECT'
                        ? exchangeRequestReason
                        : exchangeRequest?.codeName}
                    </S.ListTxt>
                  </S.DetailItem>
                </S.DetailList>
              </S.DetailBox>
              <Separator
                $height={1}
                $mv={20}
              />
              <S.DetailBox>
                <T.Body1_NormalB>교환상품 받으실 주소</T.Body1_NormalB>
                <S.DetailList>
                  <S.DetailItem>
                    <S.ListTit>받는 분</S.ListTit>
                    <S.ListTxt>{exchangeAddress?.name}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>주소</S.ListTit>
                    <S.ListTxt>
                      [{exchangeAddress?.zipCode}] {exchangeAddress?.address} {exchangeAddress?.addressDetail}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>휴대폰번호</S.ListTit>
                    <S.ListTxt>{exchangeAddress?.contactNumber}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>배송요청사항</S.ListTit>
                    <S.ListTxt>{exchangeRequestReason ? exchangeRequestReason : '-'}</S.ListTxt>
                  </S.DetailItem>
                </S.DetailList>
              </S.DetailBox>
            </S.OhDetailSecWrap>
            {refundInfo?.data?.addPaymentYn ? (
              <ClaimAddPay
                refundInfo={refundInfo.data}
                title='교환'
              />
            ) : (
              <></>
            )}
          </S.CancelOrderWrap>
        </div>
      )}
      <S.ExchangeBtnPart>
        {step === 1 && (
          <S.DescInfo>
            <li>구매자 귀책 사유인 경우 추가 배송비가 발생할 수 있습니다.</li>
            <li>판매자 귀책 사유인 경우 추가 배송비가 발생하지 않습니다.</li>
            <li>판매자와 협의 없이 신청 시에는 교환 처리가 안될 수 있습니다.</li>
          </S.DescInfo>
        )}
        <TwoButton
          leftType='tertiary'
          leftTitle={step === 1 ? '취소' : '이전'}
          rightTitle={step === 1 ? '다음' : '교환신청'}
          leftonClick={() => {
            if (step === 1) {
              showModal.text(messages.Confirm39, {
                buttonType: 'multi',
                leftType: 'tertiary',
                rightonClick: () => navigate(-1),
                leftTitle: '아니오',
                rightTitle: '예',
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
              // if (!validateForm(reShippingAddrInfo)) {
              //   return;
              // }
              handleReasonApply();
            } else {
              confirmIsExchangeOrder({
                ordersIdEncrypt,
                list: getRefundOrderItemList(shippingList),
              });
            }
          }}
          leftSize={4}
          rightSize={6}
        />
      </S.ExchangeBtnPart>
    </>
  );
};

export default ExchangeOrder;
