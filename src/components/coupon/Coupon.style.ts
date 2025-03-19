import { CouponTypeCode, CouponTypeCodes } from '@type';
import styled, { css } from 'styled-components';

import { purple, redOrange, yellowGreen } from '@styles/theme';

import { pxToRem } from '@utils/display';

export const Container = styled.div`
  display: flex;
  height: 13.5rem;
  margin-bottom: 1.2rem;
`;

export const CouponMain = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem 0.7rem 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line3};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line3};
`;

export const DownloadButton = styled.button<{ $bgColor: string }>`
  width: 3.6rem;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.8rem;
  background-color: ${({ $bgColor }) => $bgColor};
`;
export const CouponInfo = styled.div`
  flex: 1;
  margin-right: 0.8rem;
`;

export const RowView = styled.div<{ $mb: number }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ $mb }) => pxToRem($mb)};
`;

export const CouponTypeBadge = styled.div<{ $type: CouponTypeCode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.4rem;
  height: 2rem;
  border-radius: 0.8rem;
  ${({ $type, theme }) => {
    switch ($type) {
      case CouponTypeCodes.Store:
        return css`
          background-color: ${purple[10]};
          p {
            color: ${purple[70]};
          }
        `;
      case CouponTypeCodes.Duplication:
        return css`
          background-color: ${redOrange[10]};
          p {
            color: ${theme.colors.secondary1};
          }
        `;
      case CouponTypeCodes.Goods:
        return css`
          background-color: ${yellowGreen[20]};
          p {
            color: ${yellowGreen[80]};
          }
        `;
    }
  }}
`;

export const DdayBadge = styled.div`
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding: 0 0.4rem;
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary1};
    p {
      color: ${theme.colors.white};
    }
  `}

  border-radius: 0.8rem;
`;
