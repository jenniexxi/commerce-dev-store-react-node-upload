import { useState } from 'react';

import { Button, Selector } from '@components';

import { MiniCartAddGoods, MiniCartsListResp } from '@apis/shoppingCartApi';

import * as S from './_ProductDetail.style';

const AddGoodsModal = ({
  miniCartData,
  onAccept,
}: {
  miniCartData: MiniCartsListResp;
  onAccept: (selectedGoods: MiniCartAddGoods[]) => void;
}) => {
  const [selectedGoods, setSelectedGoods] = useState<MiniCartAddGoods[]>([]);

  const handleSelectorChange = (value: string, addGoodsList: MiniCartAddGoods[]) => {
    const selected = addGoodsList.find((goods) => goods.goodsOptionId === parseInt(value));

    if (selected) {
      setSelectedGoods((prev) => {
        const exists = prev.some((item) => item.goodsOptionId === selected.goodsOptionId);

        if (exists) return prev;
        return [...prev, selected];
      });
    }
  };

  const handleComplete = () => {
    onAccept(selectedGoods);
  };

  return (
    <S.ModalAddGoodsContainer>
      <h3>추가상품 선택</h3>
      {miniCartData?.data.addGoodsList?.map((item: MiniCartAddGoods, index: number) => {
        const options = item.addGoodsList.map((goods) => ({
          label: goods.valueStr,
          value: goods.goodsOptionId.toString(),
        }));

        return (
          <div key={`addgoods-${index}`}>
            <Selector
              options={options}
              onChange={(value: string) => handleSelectorChange(value, item.addGoodsList)}
              placeholder={item.valueStr}
              defaultValue='' // 초기값 설정
            />
            <div style={{ height: '1rem' }} />
          </div>
        );
      })}

      <Button
        title='선택완료'
        onClick={handleComplete}
      />
    </S.ModalAddGoodsContainer>
  );
};

export default AddGoodsModal;
