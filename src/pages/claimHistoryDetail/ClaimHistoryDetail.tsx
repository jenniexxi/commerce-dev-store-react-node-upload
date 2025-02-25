import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { MYPAGE_CLAIM_SORT_CODES } from '@type';

import { hideAllModals, showModal } from '@components/modal/ModalManager';

import R from '@utils/resourceMapper';

import claimApi from '@apis/claimApi';

import Separator from '@commons/Separator';
import SvgIcon from '@commons/SvgIcon';

import * as S from './ClaimHistoryDetail.style';
import ClaimHistoryDetailPriceInfo from './features/ClaimHistoryDetailPriceInfo';
import ClaimHistoryDetailReason from './features/ClaimHistoryDetailReason';
import ClaimHistorySectionItem from './features/ClaimHistorySectionItem';

const ClaimHistoryDetail = () => {
  const [title, setTitle] = useState('');
  const {
    state: { key, type },
  } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (type === 'cancel') {
      setTitle('취소 신청내역');
    } else if (type === 'return') {
      setTitle('반품 신청내역');
    } else {
      setTitle('교환 신청내역');
    }
  }, [type]);
  const { data, refetch } = useQuery({ queryKey: ['getCalim', key], queryFn: () => claimApi.getClaimOrderDetail(key) });

  useEffect(() => {
    if (data?.success === false) {
      showModal.text(data.error.message, {
        rightonClick: () => {
          navigate(-1);
          hideAllModals();
        },
      });
    }
  }, [data]);

  const updateList = () => {
    refetch();
  };

  const getClaimType = () => {
    const claimType = data?.data.claim.claimTypeEnum.code;
    if (claimType === MYPAGE_CLAIM_SORT_CODES.CANCEL) {
      return '취소';
    } else if (claimType === MYPAGE_CLAIM_SORT_CODES.EXCHANGE) {
      return '교환';
    } else {
      return '반품';
    }
  };

  if (!data?.data) return <></>;
  return (
    <S.Container>
      <S.Header>
        <S.BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <SvgIcon name={R.svg.icoChevronLeft} />
        </S.BackButton>
        {title}
      </S.Header>
      <ClaimHistorySectionItem
        claimInfo={data?.data}
        updateList={updateList}
      />
      <Separator />
      <ClaimHistoryDetailReason
        claimInfo={data.data}
        title={getClaimType()}
      />
      <Separator />
      <ClaimHistoryDetailPriceInfo
        claimInfo={data.data}
        title={getClaimType()}
      />
      <Separator />
    </S.Container>
  );
};

export default ClaimHistoryDetail;
