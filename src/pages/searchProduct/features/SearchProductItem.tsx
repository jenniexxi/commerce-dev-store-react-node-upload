import { forwardRef } from 'react';

import { T } from '@commons';

import { showPriceText } from '@utils/display';

import { SearchListGoodsContent } from '@apis/DisplayApi';

import * as S from './_SearchProduct.style';

type Props = {
  item: SearchListGoodsContent;
};
const SearchProductItem = forwardRef<HTMLDivElement, Props>(({ item }: Props, ref) => {
  return (
    <S.ItemContainer ref={ref}>
      <S.RowView>
        <S.ItemImage src={item.imageFilesUrl} />
        <S.TextView>
          <T.Caption1_Normal>{item.brandName}</T.Caption1_Normal>
          <T.Caption1_Normal>{item.displayGoodsName}</T.Caption1_Normal>
          <T.Caption1_Normal>{showPriceText(item.paymentPrice)}</T.Caption1_Normal>
          <T.Caption1_Normal>{item.displaySaleStatusEnum.codeName}</T.Caption1_Normal>
        </S.TextView>
      </S.RowView>
    </S.ItemContainer>
  );
});

export default SearchProductItem;
