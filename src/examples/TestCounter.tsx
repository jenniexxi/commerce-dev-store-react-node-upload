import dayjs from 'dayjs';
import styled from 'styled-components';

import useCountdown from '@hooks/useCounter';

const TestCounter = () => {
  const date = dayjs('20241231', 'YYYYMMDD').toDate();
  const { days, hours, minutes, seconds } = useCountdown(date);

  return (
    <CounterStyle>
      <span>{days}일</span>
      <span>{hours}시간</span>
      <span>{minutes}분</span>
      <span>{seconds}초</span>
    </CounterStyle>
  );
};

const CounterStyle = styled.div`
  span {
    font-size: 20px;
  }
`;

export default TestCounter;
