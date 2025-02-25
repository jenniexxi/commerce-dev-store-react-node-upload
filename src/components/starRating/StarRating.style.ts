import styled from 'styled-components';

import R from '@utils/resourceMapper';

export const StarRating = styled.div`
  position: relative;
  width: 8rem;
  height: 1.6rem;
  background: url(${R.svg.bgStarOff}) center / cover no-repeat;
  .active {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: url(${R.svg.bgStarOn}) left center no-repeat;
    background-color: 8rem 1.6rem;
  }
`;
