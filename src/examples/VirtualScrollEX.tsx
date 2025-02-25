import React, { useCallback, useEffect, useState } from 'react';

import { VirtualScroll } from '@components';
import styled from 'styled-components';

import { useHeader } from '@hooks/useHeader';

type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

const baseUsers = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong.gildong@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: '박길동',
    email: 'park.gildong@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: '고길동',
    email: 'ko.gildong@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: '정길동',
    email: 'jung.gildong@example.com',
    avatar: 'https://via.placeholder.com/150',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUsers = async (page: number, pageSize: number): Promise<{ users: User[]; totalPages: number }> => {
  await delay(500); // 네트워크 딜레이처럼 보이게끔 처리

  const startIndex = (page - 1) * pageSize;

  const users = Array(pageSize)
    .fill(null)
    .map((_, index) => {
      const baseIndex = (startIndex + index) % baseUsers.length;
      const baseUser = baseUsers[baseIndex];
      return {
        ...baseUser,
        id: startIndex + index + 1,
        name: `${baseUser.name} ${startIndex + index + 1}`,
        email: `${baseUser.email.split('@')[0]}${startIndex + index + 1}@example.com`,
      };
    });

  return {
    users,
    totalPages: Math.ceil(1000 / pageSize),
  };
};

const VirtualScrollEX: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useHeader('가상 스크롤 예제');

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);
    try {
      const { users: newUsers, totalPages } = await fetchUsers(page, 20);
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setPage((prevPage) => prevPage + 1);
      setHasNextPage(page < totalPages);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasNextPage]);

  useEffect(() => {
    loadMore();
  }, []);

  const renderItem = (user: User) => {
    return (
      <ItemContent>
        <Avatar
          src={user.avatar}
          alt={user.name}
        />
        <Info>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </Info>
      </ItemContent>
    );
  };

  return (
    <VirtualScroll
      data={users}
      renderItem={renderItem}
      loadMore={loadMore}
      hasNextPage={hasNextPage}
      paginationMode={true}
      isLoading={isLoading}
      loadMoreThreshold={80}
      loadingComponent={<div>Loading...</div>}
      emptyComponent={<div>No more data</div>}
    />
  );
};

const ItemContent = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.span`
  font-weight: bold;
`;
const Email = styled.span`
  color: #666666;
  font-size: 0.9em;
`;

export default VirtualScrollEX;
