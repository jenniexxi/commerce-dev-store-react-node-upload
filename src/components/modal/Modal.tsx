import React, { useEffect } from 'react';

import { createPortal } from 'react-dom';

import { T } from '@commons';

import CloseButton from '@components/button/CloseButton';
import IconButton from '@components/button/IconButton';

import useWindowDimensions from '@hooks/useWindowDimensions';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import * as S from './Modal.style';
import { ModalTypes } from './Modal.type';

type Props = {
  onClickBackDrop?: () => void;
  children?: React.ReactNode;
  type?: ModalTypes;
  isAnimation?: boolean;
  showCloseBtn?: boolean;
  isEnableBackDropHide?: boolean;
  backDropAnimation?: boolean;
  closeBtnPosition?: { top: number; right: number; size: number };
  radius?: number;
  onHide: () => void;
  backDropColor?: string;
  zIndex?: number;
  bottomTitle?: string;
  title?: string;
  fixedArea?: JSX.Element;
};

export type ModalProps = Props & {};

const Modal = ({
  children = <></>,
  onClickBackDrop,
  type = 'center',
  isAnimation = true,
  showCloseBtn = true,
  isEnableBackDropHide = true,
  backDropAnimation = false,
  radius = 20,
  closeBtnPosition = { top: 5, right: 10, size: 32 },
  backDropColor,
  onHide,
  zIndex = 100,
  bottomTitle,
  title,
  fixedArea,
}: Props) => {
  const { width } = useWindowDimensions();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      isEnableBackDropHide && onHide();
      onClickBackDrop && onClickBackDrop();
    }
  };

  const handleClose = () => {
    onHide();
  };

  return createPortal(
    <S.BackDrop
      onClick={handleBackdropClick}
      $isAnimation={backDropAnimation}
      $backDropColor={backDropColor}
      $zIndex={zIndex}
    >
      <S.ModalView
        type={type}
        $isAnimated={isAnimation}
      >
        <S.ChildView
          $width={width}
          type={type}
          $radius={radius}
        >
          {type === 'full' && title && showCloseBtn && (
            <S.topHeader>
              {title && <h1>{title}</h1>}
              <IconButton
                img={R.svg.icoClose}
                onClick={handleClose}
                className='btnClose'
              />
            </S.topHeader>
          )}
          {type === 'bottomSheet' && (
            <S.BottomHeader>
              <T.Headline2B>{bottomTitle}</T.Headline2B>
              {showCloseBtn && (
                <button onClick={handleClose}>
                  <SvgIcon
                    width={24}
                    height={24}
                    name={R.svg.icoClose}
                  />
                </button>
              )}
            </S.BottomHeader>
          )}
          {type === 'bottomSheet' || type === 'full' ? <S.ScrollView $type={type}>{children}</S.ScrollView> : children}
          {(type === 'bottomSheet' || type === 'full') && fixedArea && fixedArea}
        </S.ChildView>
        {type !== 'bottomSheet' && type !== 'full' && showCloseBtn && (
          <S.CloseBtn $closeBtnPosition={closeBtnPosition}>
            <IconButton
              img={R.svg.icoClose}
              onClick={handleClose}
            />
          </S.CloseBtn>
        )}
      </S.ModalView>
    </S.BackDrop>,
    document.body,
  );
};

export default Modal;
