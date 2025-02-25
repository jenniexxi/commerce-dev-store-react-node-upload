import { SwiperCarousel } from '@components';
import styled from 'styled-components';

const TestSwiper = () => {
  const data = [
    { background: '', desc: '' },
    { background: '', desc: '' },
    { background: '', desc: '' },
    { background: '', desc: '' },
    { background: '', desc: '' },
    { background: '', desc: '' },
  ];

  return (
    <SwiperCarousel
      spaceBetween={20}
      slidesPerView={3}
      isPagination={true}
      slideClick={() => console.log('TestSwiper slideClick')}
      //   slideNavi={false}
    >
      {data.map((item, index) => (
        <ItemContainer key={index}>
          <img src={item.background} />
          <p>{item.desc}</p>
        </ItemContainer>
      ))}
    </SwiperCarousel>
  );
};

const ItemContainer = styled.div`
  height: 200px;
  background: #eeeeee;
`;

export default TestSwiper;
