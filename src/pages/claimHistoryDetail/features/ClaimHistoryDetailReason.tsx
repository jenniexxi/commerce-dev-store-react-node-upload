import { T } from '@commons';

import { ClaimOrderDetail } from '@apis/claimApi';

import * as S from './_ClaimHistoryDetail.style';

type Props = {
  claimInfo: ClaimOrderDetail;
  title: string;
};

const ClaimHistoryDetailReason = ({ claimInfo, title }: Props) => {
  return (
    <S.Container>
      <T.Body1_NormalB>{title}사유</T.Body1_NormalB>
      <T.Body1_Normal>{claimInfo.claim.claimReasonEnum.codeName}</T.Body1_Normal>
      <T.Body1_Normal>{claimInfo.claim.claimReasonDetail}</T.Body1_Normal>
    </S.Container>
  );
};

export default ClaimHistoryDetailReason;
