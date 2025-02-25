import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

import CloseButton from '@components/button/CloseButton';

import { colors } from '@styles/theme';

import * as S from './Tooltip.style';

type TooltipItem = {
  title: string | JSX.Element;
  content: string | JSX.Element;
};

type TooltipProps = {
  items: TooltipItem[];
  className?: string;
  position?: 'top' | 'bottom';
  shouldClose?: boolean;
  showCloseButton?: boolean;
  defaultShown?: boolean;
  customStyles?: CSSProperties & {
    arrowLeft?: number;
    arrowStyle?: React.CSSProperties;
  };
  closeBtnPosition?: { top?: number; right?: number; bottom?: number; left?: number };
};

const Tooltip = ({
  items,
  className,
  position = 'bottom',
  shouldClose = true,
  showCloseButton = true,
  defaultShown = false,
  customStyles = {},
  closeBtnPosition,
}: TooltipProps) => {
  const [isShown, setIsShown] = useState(defaultShown);
  const [arrowLeft, setArrowLeft] = useState(customStyles.arrowLeft || 0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const arrowPosition = useCallback(() => {
    if (triggerRef.current) {
      const trigger = triggerRef.current;
      const container = trigger.offsetParent as HTMLElement;

      const triggerRect = trigger.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const calculatedArrowLeft = triggerRect.left - containerRect.left + trigger.offsetWidth / 2 - 5;
      setArrowLeft(customStyles.arrowLeft || calculatedArrowLeft);
    }
  }, [customStyles.arrowLeft]);

  const toggleTooltip = () => {
    setIsShown((prev) => {
      const newState = !prev;
      if (newState) {
        arrowPosition();
      }
      return newState;
    });
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isShown || shouldClose) {
      toggleTooltip();
    }
  };

  const handleCloseClick = () => {
    setIsShown(false);
  };

  useEffect(() => {
    if (defaultShown) {
      arrowPosition();
    }

    const handleDocumentClick = (e: MouseEvent) => {
      if (
        shouldClose &&
        isShown &&
        targetRef.current &&
        !targetRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsShown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isShown, shouldClose, defaultShown, arrowPosition]);

  return (
    <>
      {items.map((item, index) => (
        <S.TipContainer
          key={index}
          className={className}
        >
          <S.TipTrigger
            ref={triggerRef}
            onClick={handleTriggerClick}
            className={`tipTrigger`}
          >
            {item.title}
          </S.TipTrigger>
          {isShown && (
            <S.TipTarget
              ref={targetRef}
              className={`tipTarget show ${position}`}
            >
              <S.TipTargetInner
                className={`tipTargetInner`}
                style={customStyles}
              >
                {item.content}
                {showCloseButton && (
                  <CloseButton
                    className={`btnTipClose`}
                    onClick={handleCloseClick}
                    closeBtnPosition={closeBtnPosition}
                    tintColor={colors.icon3}
                  />
                )}
              </S.TipTargetInner>
              <S.TipArrow
                style={{ left: `${arrowLeft}px` }}
                className={position}
                $arrowBorderColor={customStyles.arrowStyle?.borderColor}
                $arrowBackgroundColor={customStyles.arrowStyle?.backgroundColor}
              />
            </S.TipTarget>
          )}
        </S.TipContainer>
      ))}
    </>
  );
};

export default Tooltip;
