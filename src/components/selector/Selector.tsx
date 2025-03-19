import { useEffect, useRef, useState } from 'react';

import { isEqual } from 'lodash';

import Modal from '@components/modal/Modal';
import Radio from '@components/radio/Radio';

import * as S from './Selector.style';

export type Option<T> = {
  label: string;
  value: T;
  disabled?: boolean;
  preDisableText?: string;
  tailDisableText?: string;
  width?: string;
};

type Props<T> = {
  options: Option<T>[];
  onChange: (value: T) => void;
  defaultValue?: T;
  placeholder?: string;
  disable?: boolean;
  width?: number;
  className?: string;
  defaultOpen?: boolean;
  unit?: string;
  isError?: boolean;
  isBottomPopup?: boolean;
};

const Selector = <T,>({
  options,
  onChange,
  defaultValue,
  placeholder,
  width,
  disable = false,
  className,
  defaultOpen = false,
  unit,
  isError,
  isBottomPopup = false,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // isBottomPopup이 아닌 경우에만 외부 클릭 이벤트 리스너 추가
    if (!isBottomPopup) {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isBottomPopup]);

  useEffect(() => {
    if (defaultValue !== undefined) {
      const option = options.find((item) => isEqual(item.value, defaultValue));

      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(null);
    }
  }, [defaultValue, options]);

  const toggleSelector = (e: React.MouseEvent) => {
    if (disable) return;

    e.stopPropagation();

    // isBottomPopup인 경우, 닫기는 Modal의 onHide로 처리하고 여기서는 오직 열기만 담당
    if (isBottomPopup) {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const selectOption = (option: Option<T>, e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (option.disabled) return;

    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const handleModalHide = () => {
    setIsOpen(false);
  };

  return (
    <S.SelectContainer
      ref={selectorRef}
      onClick={toggleSelector}
      $disable={disable}
      $width={width}
      className={className}
    >
      <S.Selector
        $selectedOption={selectedOption}
        $isBottomPopup={isBottomPopup}
        $isOpen={isOpen}
        $disable={disable}
      >
        {selectedOption ? `${selectedOption.label}${unit ? ` ${unit}` : ''}` : placeholder}
      </S.Selector>

      {isOpen && !isBottomPopup && (
        <S.OptionContainer>
          {options.map((option, index) => (
            <S.Option
              key={index + option.label}
              $disabled={option?.disabled}
              onClick={(e) => selectOption(option, e)}
            >
              {option?.disabled && option?.preDisableText}
              {option.label}
              {unit ? ` ${unit}` : ''}
              {option?.disabled && option?.tailDisableText}
            </S.Option>
          ))}
        </S.OptionContainer>
      )}

      {/* isBottomPopup인 경우, isOpen이 true일 때만 Modal 렌더링 */}
      {isBottomPopup && isOpen && (
        <Modal
          onHide={handleModalHide}
          type='bottomSheet'
          showCloseBtn={false}
        >
          <S.RadioModalContainer onClick={(e) => e.stopPropagation()}>
            {options.map((option, index) => (
              <S.RadioItemView key={index + option.label}>
                <Radio
                  id={String(index) + option.label}
                  name='deliveryRequestOption'
                  label={option.label}
                  value={String(index)}
                  selectedValue={selectedOption === option ? String(index) : undefined}
                  fontType='body1_normal'
                  onChange={() => {
                    selectOption(option, null as any);
                  }}
                />
              </S.RadioItemView>
            ))}
          </S.RadioModalContainer>
        </Modal>
      )}
    </S.SelectContainer>
  );
};

export default Selector;
