import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Checkbox, TwoButton } from '@components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AllOrderStates, CLAIM_EXCHANGE_REQUEST_REASON } from '@type';
import dayjs from 'dayjs';

import { MobileNumber } from '@components/input/MobileInput';
import { showModal } from '@components/modal/ModalManager';

import { useHeader } from '@hooks/useHeader';

import { Code } from '@apis/apiCommonType';
import claimApi, {
  ClaimExchangeRequestBody,
  ConfirmIsExchangeRequestBody,
  ExchangeRefundInfoInquiryRequestBody,
  ExchangeRefundInfoInquiryResp,
} from '@apis/claimApi';
import messages from '@apis/message';

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
  useHeader('상품 교환신청', { showRightButton: false });
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [claimReasonEnum, setClaimReasonEnum] = useState<Code<string>>();
  const [exchangeReason, setExchangeReason] = useState('');
  const [shippingList, setShippingList] = useState<CustomShippingList[]>([]);
  const [isAllCheckedBox, setIsAllCheckedBox] = useState(false);
  const [refundInfo, setRefundInfo] = useState<ExchangeRefundInfoInquiryResp>();

  const [collectAddrInfo, setCollectAddrInfo] = useState<UserAddrInfo>({
    name: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    phonenumber: {
      first: '',
      second: '',
      third: '',
    },
    deliveryRequestEnum: '',
  });

  const [reShippingAddrInfo, setReShippingAddrInfo] = useState<UserAddrInfo>({
    name: '',
    zipCode: '',
    address: '',
    detailAddress: '',
    phonenumber: {
      first: '',
      second: '',
      third: '',
    },
    deliveryRequestEnum: { code: '', codeName: '' },
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
            // leftonClick: () => navigate(''), //추가결제 창 뜨면 pg 페이지로 이동
            // handleExchangeApply();
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
    }
  }, [exchangeOrderInfo]);

  useEffect(() => {
    const allChecked = getAllCheckboxCheckedState(shippingList);
    setIsAllCheckedBox(allChecked);
  }, [shippingList]);

  const getExchangeRefundInfo = () => {
    const body: ExchangeRefundInfoInquiryRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      orderItemList: getRefundOrderItemList(shippingList),
      claimReasonEnum: claimReasonEnum?.code!,
      collectAddressZipCode: collectAddrInfo.zipCode,
      reShippingAddressZipCode: reShippingAddrInfo.zipCode,
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
    const collectAddress = {
      name: collectAddrInfo.name,
      contactNumber: `${collectAddrInfo.phonenumber.first}-${collectAddrInfo.phonenumber.second}-${collectAddrInfo.phonenumber.third}`,
      zipCode: collectAddrInfo.zipCode,
      address: collectAddrInfo.address,
      addressDetail: collectAddrInfo.detailAddress,
      shippingMessage:
        typeof collectAddrInfo.deliveryRequestEnum === 'string'
          ? collectAddrInfo.deliveryRequestEnum
          : collectAddrInfo.deliveryRequestEnum?.codeName,
    };

    const reShippingAddress = {
      name: reShippingAddrInfo.name,
      contactNumber: `${reShippingAddrInfo.phonenumber.first}-${reShippingAddrInfo.phonenumber.second}-${reShippingAddrInfo.phonenumber.third}`,
      zipCode: reShippingAddrInfo.zipCode,
      address: reShippingAddrInfo.address,
      addressDetail: reShippingAddrInfo.detailAddress,
      shippingMessage:
        typeof reShippingAddrInfo.deliveryRequestEnum === 'string'
          ? reShippingAddrInfo.deliveryRequestEnum
          : reShippingAddrInfo.deliveryRequestEnum?.codeName,
    };

    const body: ClaimExchangeRequestBody = {
      ordersIdEncrypt,
      orderShippingPriceIdEncrypt,
      claimReason: exchangeReason,
      list: getRefundOrderItemList(shippingList),
      claimItemStatusEnum: AllOrderStates.Claim.EC,
      claimReasonEnum: claimReasonEnum?.code || '',
      collectAddress,
      reShippingAddress,
    };

    claimExchangeRequest(body);
  };

  const validateForm = (info: UserAddrInfo) => {
    if (!claimReasonEnum) {
      showModal.text(messages.Alert323);
      return false;
    }

    if (!exchangeReason || exchangeReason.trim() === '') {
      showModal.text('교환사유를 입력해 주세요.');
      return false;
    }

    if (!info.name || info.name === '') {
      showModal.text('이름을 입력해 주세요.');
      return false;
    }

    if (!info.detailAddress.trim()) {
      showModal.text('수거지 상세주소를 입력해 주세요.');
      return false;
    }

    if (!info.phonenumber.first || !info.phonenumber.second || !info.phonenumber.third) {
      showModal.text('휴대폰 번호를 정확히 입력해 주세요.');
      return false;
    }

    if (!collectAddrInfo.zipCode || !collectAddrInfo.address) {
      showModal.text('상품 수거지 주소를 입력해 주세요.');
      return false;
    }

    if (!reShippingAddrInfo.zipCode || !reShippingAddrInfo.address) {
      showModal.text('교환상품 받으실 주소를 입력해 주세요.');
      return false;
    }

    return true;
  };

  const reasonList = [
    {
      label: '단순 변심',
      value: { code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_CHANGE_OPTION.toString(), codeName: '단순 변심' },
    },
    {
      label: '주문 실수',
      value: { code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_ORDER_MISTAKE.toString(), codeName: '주문 실수' },
    },
    {
      label: '오배송',
      value: { code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DELIVERY_MISTAKE.toString(), codeName: '오배송' },
    },
    {
      label: '파손 및 불량',
      value: { code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_DAMAGE_DEFECT.toString(), codeName: '파손 및 불량' },
    },
    {
      label: '구성품 누락',
      value: { code: CLAIM_EXCHANGE_REQUEST_REASON.EXCHANGE_MISSING_DELIVERY.toString(), codeName: '구성품 누락' },
    },
  ];

  const renderDeliveryEnumValue = (addrInfo: UserAddrInfo) => {
    if (typeof addrInfo.deliveryRequestEnum === 'string') {
      if (addrInfo.deliveryRequestEnum.trim() === '') {
        return '-';
      } else {
        return addrInfo.deliveryRequestEnum;
      }
    } else {
      if (addrInfo.deliveryRequestEnum.codeName.trim() === '') {
        return '-';
      } else {
        return addrInfo.deliveryRequestEnum.codeName;
      }
    }
  };

  if (exchangeOrderInfo?.success === false) return <></>;

  return (
    <>
      {step === 1 ? (
        <div>
          1<button onClick={() => setStep(2)}>다음</button>
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
                            key={item.goodsId}
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
            <S.OhDetailSecReason>
              <ClaimReason
                claimReasonEnum={claimReasonEnum}
                reasonList={reasonList}
                onChangeClaimReason={onChangeExchangeReason}
                claimReason={exchangeReason}
                setClaimReason={setExchangeReason}
                title='교환'
                placeholder='교환사유를 입력해 주세요.'
                images={images}
                videos={videos}
                handleImageUpload={handleImageUpload}
                handleDeleteImage={handleDeleteImage}
                handleDeleteVideo={handleDeleteVideo}
              />
            </S.OhDetailSecReason>
            <S.OhDetailSecWrap>
              <S.OhDetailTitle>
                <h2>교환주소</h2>
              </S.OhDetailTitle>
              <ClaimAddr
                title='상품 수거지 주소'
                type='collect'
                userAddrInfo={collectAddrInfo}
                onChangeValue={setCollectAddrInfo}
              />
              <ClaimAddr
                title='교환상품 받으실 주소'
                type='delivery'
                userAddrInfo={reShippingAddrInfo}
                onChangeValue={setReShippingAddrInfo}
                deliveryDesc={true}
              />
            </S.OhDetailSecWrap>
          </S.CancelOrderWrap>
        </div>
      ) : (
        <div>
          2<button onClick={() => setStep(1)}>이전</button>
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
                <S.SubTitle>상품 수거지 주소</S.SubTitle>
                <S.DetailList>
                  <S.DetailItem>
                    <S.ListTit>보내는 분</S.ListTit>
                    <S.ListTxt>{collectAddrInfo.name}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>주소</S.ListTit>
                    <S.ListTxt>
                      [{collectAddrInfo.zipCode}] {collectAddrInfo.address} {collectAddrInfo.detailAddress}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>휴대폰번호</S.ListTit>
                    <S.ListTxt>
                      {collectAddrInfo.phonenumber.first}-{collectAddrInfo.phonenumber.second}-
                      {collectAddrInfo.phonenumber.third}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>배송요청사항</S.ListTit>
                    <S.ListTxt>
                      {renderDeliveryEnumValue(collectAddrInfo)}
                      {/* {collectAddrInfo.deliveryRequestEnum?.toString().trim() || '-'} */}
                    </S.ListTxt>
                  </S.DetailItem>
                </S.DetailList>
              </S.DetailBox>
              <S.DetailBox>
                <S.SubTitle>교환상품 받으실 주소</S.SubTitle>
                <S.DetailList>
                  <S.DetailItem>
                    <S.ListTit>받는 분</S.ListTit>
                    <S.ListTxt>{reShippingAddrInfo.name}</S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>주소</S.ListTit>
                    <S.ListTxt>
                      [{reShippingAddrInfo.zipCode}] {reShippingAddrInfo.address} {reShippingAddrInfo.detailAddress}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>휴대폰번호</S.ListTit>
                    <S.ListTxt>
                      {reShippingAddrInfo.phonenumber.first}-{reShippingAddrInfo.phonenumber.second}-
                      {reShippingAddrInfo.phonenumber.third}
                    </S.ListTxt>
                  </S.DetailItem>
                  <S.DetailItem>
                    <S.ListTit>배송요청사항</S.ListTit>
                    <S.ListTxt>
                      {renderDeliveryEnumValue(reShippingAddrInfo)}
                      {reShippingAddrInfo.reason && reShippingAddrInfo.reason}
                      {/* {(typeof reShippingAddrInfo.deliveryRequestEnum === 'object' &&
                        reShippingAddrInfo.deliveryRequestEnum?.codeName) ||
                        '-'} */}
                    </S.ListTxt>
                    {reShippingAddrInfo.reason && <S.ListTxt>{reShippingAddrInfo.reason}</S.ListTxt>}
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
              if (!validateForm(collectAddrInfo)) {
                return;
              }
              if (!validateForm(reShippingAddrInfo)) {
                return;
              }
              getExchangeRefundInfo();
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
