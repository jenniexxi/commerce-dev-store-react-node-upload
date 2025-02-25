import * as S from './Pagination.style';

type Props = {
  totalCount: number;
  currentPage: number;
  aPageListLength?: number; // 한 페이지에 표시할 항목의 수
  paginationLength?: number; // 한 페이지에 표시할 페이지 버튼의 수
  onClickPage: (page: number) => void;
};

const Pagination = ({ totalCount, currentPage, aPageListLength = 20, paginationLength = 10, onClickPage }: Props) => {
  const totalPage = Math.ceil(totalCount / aPageListLength); // 전체 페이지 수 계산

  const moveToFirst = () => {
    onClickPage(0);
  };

  const moveToLast = () => {
    onClickPage(totalPage - 1);
  };

  const moveToBefore = () => {
    if (currentPage === 0) return;
    onClickPage(currentPage - 1);
  };

  const moveToAfter = () => {
    if (currentPage === totalPage - 1) return;
    onClickPage(currentPage + 1);
  };

  const renderPage = () => {
    const list = [];
    const startPage = Math.floor(currentPage / paginationLength) * paginationLength;

    for (let index = startPage; index < startPage + paginationLength; index++) {
      if (index >= totalPage) break;

      list.push(
        <S.PageBtn
          key={'pagination' + index}
          $isActive={currentPage === index}
          onClick={() => onClickPage(index)}
        >
          {index + 1}
        </S.PageBtn>,
      );
    }

    return list;
  };

  return (
    <S.PagingWrap>
      <S.BtnFirst
        onClick={moveToFirst}
        disabled={currentPage === 0}
      >
        &lt;&lt;
      </S.BtnFirst>
      <S.BtnPrev
        onClick={moveToBefore}
        disabled={currentPage === 0}
      >
        &lt;
      </S.BtnPrev>
      {renderPage()}
      <S.BtnNext
        onClick={moveToAfter}
        disabled={currentPage === 0}
      >
        &gt;
      </S.BtnNext>
      <S.BtnEnd
        onClick={moveToLast}
        disabled={currentPage === 0}
      >
        &gt;&gt;
      </S.BtnEnd>
    </S.PagingWrap>
  );
};

export default Pagination;
