import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh; // 전체 뷰포트 높이 사용
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333333;
`;

export const StyledLink = styled(Link)`
  display: block;
  padding: 12px 16px;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333333;
  transition: background-color 0.2s ease;
  border: 1px solid #333333;
  margin: 0px;

  &:hover {
    background-color: #e0e0e0;
  }
`;
