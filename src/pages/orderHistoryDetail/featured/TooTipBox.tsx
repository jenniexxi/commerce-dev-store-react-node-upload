import { ADD_SHIPPING_PRICE_AREA_CODES, SHIPPING_POLICY_TYPE } from '@type';

import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { showPriceText } from '@utils/display';

import { ShippingInfo } from '@apis/shoppingCartApi';

type Props = {
  item: ShippingInfo;
};

const TooltipBox = ({ item }: Props) => {
  if (!item) return null;
  console.log(item);
  const {
    shippingPolicyEnum: { code: policyCode },
    addShippingPriceEnum,
    addShippingPrice,
    addShippingPrice2,
    policyCondition,
    policyConditionPrice,
    policyCondition2,
    policyConditionPrice2,
    // basicShippingPrice,
  } = item;

  const getShippingPriceContent = () => {
    const contents = [];

    // 조건부 무료배송 메시지
    if (policyCode === SHIPPING_POLICY_TYPE.CONDITION) {
      if (policyConditionPrice2.number !== 0) {
        contents.push(`${showPriceText(policyConditionPrice2)}이상 구매 시 무료배송`);
      } else {
        contents.push(`${showPriceText(policyConditionPrice)}이상 구매 시 무료배송`);
      }
    }

    // 수량별 배송비 메시지
    if (policyCode === SHIPPING_POLICY_TYPE.QUANTITY) {
      const condition =
        addShippingPriceEnum?.code === ADD_SHIPPING_PRICE_AREA_CODES.SECTION_3 ? policyCondition2 : policyCondition;
      contents.push(`${condition} 개마다 기본 배송비 부과`);
    }

    if (addShippingPriceEnum) {
      // 추가 배송비 메시지
      if (addShippingPriceEnum?.code !== ADD_SHIPPING_PRICE_AREA_CODES.NONE) {
        contents.push(`제주/도서산간 추가배송비 ${showPriceText(addShippingPrice)}`);

        if (addShippingPriceEnum?.code === ADD_SHIPPING_PRICE_AREA_CODES.SECTION_3) {
          contents.push(`도서산간 추가배송비 ${showPriceText(addShippingPrice2)}`);
        }
      }
    }
    // contents.push(`기본배송비 ${showShippingPriceText(basicShippingPrice)}`);

    return contents;
  };

  const shippingContents = getShippingPriceContent();
  if (shippingContents.length === 0) return null;

  return (
    <NonModalTooltip
      trigerType='?'
      title='배송비'
      position='center'
      items={shippingContents}
    />
  );
};

export default TooltipBox;
