import React, { Suspense, useState } from 'react';

import * as S from './Tab.style';
import TabItem from './TabItem';

/**
 * Tab 컴포넌트의 Props 타입
 */
type Props = {
  /** 탭 아이템들의 정보 배열 */
  tabs: {
    /** 탭의 제목 */
    title: string;
    /** 탭의 컨텐츠 (지연 로딩 컴포넌트 또는 JSX 엘리먼트) */
    content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element;
  }[];
  /** 탭 고정 여부 */
  isStickyTab?: boolean;
  /** 하단 선택선 영역 화장 여부 */
  isBottomLineStretch?: boolean;
  /** 탭의 높이 */
  height?: number;
  /** 현재 활성화된 탭의 인덱스 */
  activeIndex?: number;
  /** 텝아이템 고정 width여부 */
  isFixedWidth?: boolean;
  /** isFixedWidth가 true이면 itemWidth값 필수 */
  itemWidth?: number;
  /** 클래스명  */
  className?: string;
  /** 탭 변경 시 호출되는 콜백 함수 */
  onChange?: (index: number) => void;
};

/**
 *
 * @param {Props} props - 탭 컴포넌트의 속성들
 * @returns {JSX.Element} 탭 컴포넌트
 *
 * @example
 * ```tsx
 * <Tab
 *   tabs={[
 *     { title: '탭1', content: <Content1 /> },
 *     { title: '탭2', content: <Content2 /> }
 *   ]}
 *   tabItemTypeInfo={{
 *     type: 'spread',
 *     style: {
 *       // ... 스타일 설정
 *     }
 *   }}
 * />
 * ```
 */
const Tab = ({
  tabs,
  height = 64,
  isStickyTab = false,
  isBottomLineStretch = true,
  isFixedWidth = false,
  itemWidth,
  activeIndex,
  className,
  onChange,
}: Props) => {
  const [internalActiveTab, setInternalActiveTab] = useState(0);

  // 외부에서 제어되는 경우 activeIndex 사용, 아닌 경우 내부 상태 사용
  const activeTab = activeIndex ?? internalActiveTab;

  /**
   * 탭 변경 핸들러
   * @param {number} index - 선택된 탭의 인덱스
   */
  const handleTabChange = (index: number) => {
    if (onChange) {
      onChange(index);
    }
    setInternalActiveTab(index);
  };

  /**
   * 컨텐츠 렌더링 함수
   * lazy 컴포넌트나 일반 JSX 구분하여 렌더링
   *
   * @param {React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element} content - 렌더링할 컨텐츠
   * @returns {JSX.Element} 렌더링된 컨텐츠
   */
  const renderContent = (content: React.LazyExoticComponent<React.ComponentType<any>> | JSX.Element) => {
    if (typeof content === 'object' && 'type' in content) {
      return content;
    } else {
      return <Suspense fallback={<div>Loading...</div>}>{React.createElement(content)}</Suspense>;
    }
  };

  return (
    <S.TabContainer className={className}>
      <S.TabItemView
        $isStickyTab={isStickyTab}
        $height={height}
      >
        {tabs.map((tab, index) => (
          <TabItem
            key={tab.title + index}
            isSelected={index === activeTab}
            onSelect={() => handleTabChange(index)}
            label={tab.title}
            itemWidth={itemWidth}
            height={height}
            isFixedWidth={isFixedWidth}
            isBottomLineStretch={isBottomLineStretch}
          />
        ))}
      </S.TabItemView>
      <S.TabContent
        $isStickyTab={isStickyTab}
        $tabViewHeight={height}
      >
        {renderContent(tabs[activeTab].content)}
      </S.TabContent>
    </S.TabContainer>
  );
};

export default Tab;
