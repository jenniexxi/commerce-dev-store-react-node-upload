import { ChangeEvent } from 'react';

import { BtnSize } from '@components/button/Button';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import * as S from './QuantityCounter.style';

type Props = {
  quantity: number;
  setQuantity: (quantity: number) => void;
  size?: BtnSize;
  width?: number;
  maxValue?: number;
  minValue?: number;
};

const QuantityCounter = ({ quantity, setQuantity, size = 'xsm', minValue = 1, width, maxValue = 999 }: Props) => {
  const max = maxValue > 999 ? 999 : maxValue;
  const plusQuantity = () => {
    if (max) {
      if (quantity + 1 > max) return;
    }

    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity === minValue) return;
    setQuantity(quantity - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isNaN(parseInt(newValue))) {
      setQuantity(1);
      return;
    }
    if (max) {
      if (parseInt(newValue) > max) {
        setQuantity(max);
      } else {
        setQuantity(parseInt(newValue));
      }
    } else {
      setQuantity(parseInt(newValue));
    }
  };

  return (
    <S.Container>
      <S.QuntitiyBtn onClick={minusQuantity}>
        <SvgIcon name={R.svg.icoMinus} />
      </S.QuntitiyBtn>
      <S.QuntityInput
        name='name'
        type='number'
        value={quantity.toString()}
        onChange={handleChange}
      />
      <S.QuntitiyBtn onClick={plusQuantity}>
        <SvgIcon name={R.svg.icoPlus} />
      </S.QuntitiyBtn>
    </S.Container>
  );
};

export default QuantityCounter;
