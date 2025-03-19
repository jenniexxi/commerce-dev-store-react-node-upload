import React, { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { T } from '@commons';
import { PanInfo, useAnimation } from 'framer-motion';

import IconButton from '@components/button/IconButton';

import useWindowDimensions from '@hooks/useWindowDimensions';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

import * as S from './Modal.style';
import { ModalTypes } from './Modal.type';

// 모달 타입에 expandableBottomSheet 추가
type UpdatedModalTypes = ModalTypes | 'expandableBottomSheet';

type Props = {
  onClickBackDrop?: () => void;
  children?: React.ReactNode;
  type?: UpdatedModalTypes;
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
  title?: string; // expandable 모달이 확장될 때 표시될 제목
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
  const { width, height } = useWindowDimensions();
  const controls = useAnimation();
  const childViewRef = useRef<HTMLDivElement>(null);
  const initialHeight = useRef<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [draggedHeight, setDraggedHeight] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPosY = useRef<number | null>(null);
  const [isDraggingDown, setIsDraggingDown] = useState(false); // 아래로 드래그 중인지 여부
  const [isTransitioning, setIsTransitioning] = useState(false); // 전환 중인지 여부

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (childViewRef.current && (type === 'bottomSheet' || type === 'expandableBottomSheet')) {
      const height = childViewRef.current.offsetHeight;
      initialHeight.current = height;
      setDraggedHeight(height);
    }
  }, [type, children]); // children을 의존성 배열에 추가하여 내용이 변경될 때도 높이를 다시 계산

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

  const handleDragStart = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isTransitioning) return; // 전환 중에는 드래그 무시

    setIsDragging(true);
    setIsDraggingDown(false); // 초기화
    dragStartPosY.current = info.point.y;

    // 드래그 시작 시 현재 요소의 실제 높이 측정
    if (childViewRef.current) {
      const currentHeight = childViewRef.current.offsetHeight;
      initialHeight.current = currentHeight;
      setDraggedHeight(currentHeight);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isTransitioning) return; // 전환 중에는 드래그 무시

    setIsDragging(false);
    setIsDraggingDown(false);
    dragStartPosY.current = null;

    // 드래그가 끝나면 높이를 초기값으로 복원 (확장 상태가 바뀌지 않는 경우)
    if (initialHeight.current) {
      setDraggedHeight(initialHeight.current);

      // 위치도 원래대로 복원
      controls.start({
        y: 0,
        transition: { duration: 0.2, type: 'spring', stiffness: 300, damping: 30 },
      });
    }

    // expandableBottomSheet인 경우
    if (type === 'expandableBottomSheet') {
      // 확장된 상태에서 아래로 충분히 드래그한 경우 (헤더 영역에서 드래그)
      if (isExpanded && info.offset.y > 50) {
        // 전환 중 상태로 설정
        setIsTransitioning(true);

        // 확장 상태 해제 - 원래 높이로 바로 전환
        setIsExpanded(false);

        // 높이 전환 애니메이션 (y값은 0으로 유지)
        controls
          .start({
            y: 0,
            transition: { duration: 0 },
          })
          .then(() => {
            setIsTransitioning(false);
          });
      }
      // 확장되지 않은 상태에서 위로 충분히 드래그한 경우
      else if (!isExpanded && info.offset.y < -50) {
        // 전환 중 상태로 설정
        setIsTransitioning(true);

        // 전체화면으로 확장
        setIsExpanded(true);

        // 전체 화면 모드로 애니메이션
        controls
          .start({
            y: 0,
            transition: { duration: 0.3 },
          })
          .then(() => {
            setIsTransitioning(false);
          });
      }
      // 확장되지 않은 상태에서 아래로 충분히 드래그한 경우 (닫기)
      else if (!isExpanded && info.offset.y > 100) {
        controls
          .start({
            y: height,
            transition: { duration: 0.3 },
          })
          .then(onHide);
      }
    }
    // 일반 bottomSheet인 경우
    else if (type === 'bottomSheet') {
      // 아래로 충분히 드래그하면 닫기
      if (info.offset.y > 100 || (info.velocity.y > 200 && info.offset.y > 50)) {
        controls.start({ y: height, transition: { duration: 0.3 } }).then(onHide);
      }
    }
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isTransitioning) return; // 전환 중에는 드래그 무시

    // 현재 드래그 방향 감지 (아래로 드래그 중인지)
    if (dragStartPosY.current !== null && info.point.y > dragStartPosY.current) {
      setIsDraggingDown(true);
    } else {
      setIsDraggingDown(false);
    }

    // bottomSheet나 확장되지 않은 expandableBottomSheet에서 드래그하는 경우 높이 조정
    if (
      (type === 'bottomSheet' || (type === 'expandableBottomSheet' && !isExpanded)) &&
      dragStartPosY.current !== null
    ) {
      // 드래그 거리에 따라 높이 조정
      if (initialHeight.current) {
        // 위로 드래그할 때 높이를 늘리고 위치는 고정 (바닥이 올라가지 않도록)
        if (info.point.y < dragStartPosY.current) {
          const dragDistance = Math.abs(info.point.y - dragStartPosY.current);
          const newHeight = initialHeight.current + dragDistance;

          // 최대 화면 높이의 90%로 제한
          const maxHeight = height * 0.9;
          const clampedHeight = Math.min(newHeight, maxHeight);

          setDraggedHeight(clampedHeight);

          // 바닥이 고정되도록 y 위치 조정
          controls.set({ y: 0 });
        } else {
          // 아래로 드래그할 때는 원래 높이를 유지하고, y 위치만 변경
          setDraggedHeight(initialHeight.current);

          // 아래로 드래그 시에는 bottomSheet를 아래로 이동
          const dragDistance = info.point.y - dragStartPosY.current;
          controls.set({ y: dragDistance });
        }
      }
    } else if (type === 'expandableBottomSheet' && isExpanded) {
      // 확장된 상태에서 아래로 드래그할 때
      if (info.point.y > dragStartPosY.current!) {
        const dragDistance = Math.abs(info.point.y - dragStartPosY.current!);

        // 일정 거리(threshold)까지는 y 위치만 변경
        // threshold 이상 드래그하면 축소 모드로 전환 준비를 시각적으로 표시
        const threshold = 100;
        if (dragDistance <= threshold) {
          controls.set({ y: dragDistance });
        } else {
          // threshold를 넘어가면 계속 드래그해도 더 내려가지 않고 확장 상태 준비
          controls.set({ y: threshold });
        }
      } else {
        // 확장 상태에서 위로 드래그는 무시
        controls.set({ y: 0 });
      }
    }
  };

  // expandableBottomSheet 모달 상태 토글 (탭 이벤트에 사용 가능)
  const toggleExpand = () => {
    if (isTransitioning) return; // 전환 중에는 토글 무시

    setIsTransitioning(true);
    setIsExpanded((prev) => !prev);

    if (!isExpanded) {
      // 확장
      controls
        .start({
          y: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setIsTransitioning(false);
        });
    } else {
      // 축소
      controls
        .start({
          y: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setIsTransitioning(false);
        });
    }
  };

  // 헤더 탭 이벤트 처리
  const handleHeaderTap = () => {
    if (type === 'expandableBottomSheet') {
      toggleExpand();
    }
  };

  // 동적 높이 계산 함수
  const getContentStyle = () => {
    const baseStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      maxWidth: '100%',
      margin: 0,
    } as const;

    if (type === 'expandableBottomSheet' && isExpanded) {
      return {
        ...baseStyle,
        height: '100vh',
        transition: isTransitioning ? 'height 0.3s ease' : undefined,
      };
    }

    if (isDragging && draggedHeight !== null) {
      return {
        ...baseStyle,
        height: `${draggedHeight}px`,
        transition: 'none', // 드래그 중에는 transition 비활성화
        maxHeight: type === 'bottomSheet' ? '90vh' : isExpanded ? '100vh' : '90vh',
      };
    }

    return {
      ...baseStyle,
      height: type === 'expandableBottomSheet' && isExpanded ? '100vh' : 'auto',
      transition: isTransitioning ? 'height 0.3s ease' : 'height 0.2s ease',
    };
  };

  // 핸들러 스타일 계산 (아래로 드래그할 때만 움직이게)
  const getHandleStyle = () => {
    // 아래로 드래그 중일 때만 스타일 적용
    if (isDragging && isDraggingDown) {
      return {
        transform: 'translateY(5px)', // 약간의 움직임 효과
        transition: 'transform 0.1s ease',
      };
    }
    return {
      transform: 'translateY(0)',
      transition: 'transform 0.1s ease',
    };
  };

  // expandableBottomSheet 컨텐츠 렌더링
  const renderExpandableBottomSheet = () => (
    <S.MotionChildView
      ref={childViewRef}
      type={isExpanded ? 'full' : 'bottomSheet'}
      $width={width}
      $radius={radius}
      $isExpanded={isExpanded}
      drag='y'
      dragConstraints={{ top: 0, bottom: height }}
      dragElastic={0.2}
      animate={controls}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={getContentStyle()}
    >
      {isExpanded ? (
        // 확장된 상태일 때 헤더 표시
        <S.ExpandableHeader onClick={handleHeaderTap}>
          <h1>{title}</h1>
          {showCloseBtn && (
            <IconButton
              img={R.svg.icoClose}
              onClick={handleClose}
              className='btnClose'
            />
          )}
        </S.ExpandableHeader>
      ) : // 확장되지 않은 상태일 때 bottomSheet 헤더 표시
      bottomTitle ? (
        <S.BottomHeader onClick={handleHeaderTap}>
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
      ) : (
        <S.BottomHeaderWithoutTitle onClick={handleHeaderTap}>
          <span style={getHandleStyle()} />
        </S.BottomHeaderWithoutTitle>
      )}
      <S.ScrollView $type={isExpanded ? 'full' : 'bottomSheet'}>{children}</S.ScrollView>
      {fixedArea && fixedArea}
    </S.MotionChildView>
  );

  // bottomSheet 컨텐츠 렌더링
  const renderBottomSheet = () => (
    <S.MotionChildView
      ref={childViewRef}
      type='bottomSheet'
      $width={width}
      $radius={radius}
      drag='y'
      dragConstraints={{ top: 0, bottom: 100 }}
      dragElastic={0.2}
      animate={controls}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={getContentStyle()}
    >
      {bottomTitle ? (
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
      ) : (
        <S.BottomHeaderWithoutTitle>
          <span style={getHandleStyle()} />
        </S.BottomHeaderWithoutTitle>
      )}
      <S.ScrollView $type='bottomSheet'>{children}</S.ScrollView>
      {fixedArea && fixedArea}
    </S.MotionChildView>
  );

  // full 타입 컨텐츠 렌더링
  const renderFullModal = () => (
    <S.ChildView
      type='full'
      $width={width}
      $radius={radius}
    >
      {title && showCloseBtn && (
        <S.TopHeader>
          {title && <h1>{title}</h1>}
          <IconButton
            img={R.svg.icoClose}
            onClick={handleClose}
            className='btnClose'
          />
        </S.TopHeader>
      )}
      <S.ScrollView $type='full'>{children}</S.ScrollView>
      {fixedArea && fixedArea}
    </S.ChildView>
  );

  // 기타 타입 컨텐츠 렌더링 (center, topSheet 등)
  const renderOtherModal = () => (
    <S.ChildView
      type={type as ModalTypes}
      $width={width}
      $radius={radius}
    >
      {children}
      {showCloseBtn && (
        <S.CloseBtn $closeBtnPosition={closeBtnPosition}>
          <IconButton
            img={R.svg.icoClose}
            onClick={handleClose}
          />
        </S.CloseBtn>
      )}
    </S.ChildView>
  );

  // 모달 타입에 따른 컨텐츠 렌더링
  const renderContent = () => {
    if (type === 'expandableBottomSheet') {
      return renderExpandableBottomSheet();
    } else if (type === 'bottomSheet') {
      return renderBottomSheet();
    } else if (type === 'full') {
      return renderFullModal();
    } else {
      return renderOtherModal();
    }
  };

  // 백드롭 애니메이션 여부 결정
  const shouldAnimateBackdrop = backDropAnimation && (type === 'bottomSheet' || type === 'expandableBottomSheet');

  return createPortal(
    <S.BackDrop
      onClick={handleBackdropClick}
      $isAnimation={shouldAnimateBackdrop}
      $backDropColor={backDropColor}
      $zIndex={zIndex}
    >
      {/* 
        expandableBottomSheet와 bottomSheet는 transform:translate(-50%)를 
        사용하지 않도록 직접 렌더링하고, 다른 타입은 ModalView로 감싸서 렌더링
      */}
      {type === 'expandableBottomSheet' || type === 'bottomSheet' ? (
        renderContent()
      ) : (
        <S.ModalView
          type={type as ModalTypes}
          $isAnimated={isAnimation}
        >
          {renderContent()}
        </S.ModalView>
      )}
    </S.BackDrop>,
    document.body,
  );
};

export default Modal;
