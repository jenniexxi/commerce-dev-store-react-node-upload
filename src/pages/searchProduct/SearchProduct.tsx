import React, { useCallback, useEffect, useRef, useState } from 'react';

import { T } from '@commons';
import { Button, Input } from '@components';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { DISPLAY_GOODS_SORT_TYPE, DisplayGoodsSortTypeCode } from '@type';

import Radio, { RadioItem } from '@components/radio/Radio';

import { useHeader } from '@hooks/useHeader';

import DisplayAPI, { SearchGoodsResult } from '@apis/DisplayApi';

import * as S from './SearchProduct.style';
import SearchProductItem from './features/SearchProductItem';

const PAGE_LIMIT = 20;

const SEARCH_TYPE_RADIO: RadioItem<string>[] = [
  { id: 'radio1', label: '인기', value: DISPLAY_GOODS_SORT_TYPE.BEST, radioGroup: 'group1' },
  { id: 'radio2', label: '최신', value: DISPLAY_GOODS_SORT_TYPE.NEW, radioGroup: 'group1' },
  { id: 'radio3', label: '낮은가격', value: DISPLAY_GOODS_SORT_TYPE.LOW_PRICE, radioGroup: 'group1' },
  { id: 'radio4', label: '높은가격', value: DISPLAY_GOODS_SORT_TYPE.HIGH_PRICE, radioGroup: 'group1' },
];
const SearchProduct = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [sortType, setSortType] = useState<DisplayGoodsSortTypeCode>(DISPLAY_GOODS_SORT_TYPE.BEST);

  useHeader('검색', { showHeader: true, showRightButton: false });

  const { data: autoCompleteKeyword } = useQuery({
    queryKey: ['searchAutoComplete', keyword],
    queryFn: () => DisplayAPI.searchAutoComplete(keyword),
    enabled: keyword !== '' && showAutoComplete,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<SearchGoodsResult>({
    queryKey: ['searchProduceList', keyword, sortType],
    queryFn: ({ pageParam }) =>
      DisplayAPI.searchGoodsResult({
        page: pageParam as number,
        size: PAGE_LIMIT,
        searchTextMain: keyword,
        goodsSortTypeEnum: sortType,
      }),
    initialPageParam: 0,
    enabled: isSearching && searchKeyword !== '',
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last || allPages.length >= lastPage.totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const handleSearch = () => {
    if (keyword.trim()) {
      setSearchKeyword(keyword);
      setShowAutoComplete(false);
      setIsSearching(true);
    }
  };

  const handleKeywordChange = (value: string) => {
    setIsSearching(false);
    setKeyword(value);
    setShowAutoComplete(true);
  };

  const handleAutoCompleteSelect = (selectedKeyword: string) => {
    setKeyword(selectedKeyword);
    setSearchKeyword(selectedKeyword);
    setShowAutoComplete(false);
    setIsSearching(true); // 자동완성 선택 시 검색 시작
  };

  const onChangeType = (type: DisplayGoodsSortTypeCode) => {
    setSortType(type);
  };

  useEffect(() => {
    if (sortType && isSearching) {
      // 정렬 변경 시 검색 결과 갱신
      setIsSearching(true);
    }
  }, [sortType]);

  return (
    <S.SearchContainer>
      <S.SearchSection>
        {SEARCH_TYPE_RADIO.map((item) => (
          <Radio
            key={item.id}
            id={item.id}
            label={item.label}
            value={item.value}
            name={item.radioGroup}
            selectedValue={sortType}
            onChange={onChangeType}
          />
        ))}
      </S.SearchSection>
      <S.SearchSection>
        <Input
          name='keyword'
          height='xsm'
          value={keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
        />
        <Button
          size='xsm'
          btnType='tertiary'
          title='검색'
          width={60}
          align='center'
          onClick={handleSearch}
        />

        {showAutoComplete && autoCompleteKeyword && autoCompleteKeyword?.data.length > 0 && (
          <S.SearchKeywordView>
            {autoCompleteKeyword?.data.map((item: { keyword: string }) => (
              <Button
                key={keyword}
                width='100%'
                size='xsm'
                btnType='text'
                title={<T.Caption1_Normal>{item.keyword}</T.Caption1_Normal>}
                onClick={() => handleAutoCompleteSelect(item.keyword)}
              />
            ))}
          </S.SearchKeywordView>
        )}
      </S.SearchSection>
      {data?.pages.map((page, pageIndex) => {
        return (
          <React.Fragment key={pageIndex}>
            {page.content.map((item, itemIndex) => (
              <SearchProductItem
                item={item}
                ref={
                  pageIndex === data.pages?.length - 1 && itemIndex === page.content.length - 1 ? lastElementRef : null
                }
              />
            ))}
          </React.Fragment>
        );
      })}
    </S.SearchContainer>
  );
};

export default SearchProduct;
