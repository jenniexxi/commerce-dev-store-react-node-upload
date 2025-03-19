import { TwoButton } from '@components';

import { useHeader } from '@hooks/useHeader';

import * as S from './OrderComplete.style';

const OrderComplete = () => {
  useHeader('주문완료', { showHeader: true, showRightButton: false, showLeftButton: false });
  return (
    <S.Container>
      <S.ContentView></S.ContentView>
      <S.BottomButtonContainer>
        <TwoButton
          leftTitle='주문내역 확인'
          rightTitle='쇼핑 계속하기'
        />
      </S.BottomButtonContainer>
    </S.Container>
  );
};

export default OrderComplete;
