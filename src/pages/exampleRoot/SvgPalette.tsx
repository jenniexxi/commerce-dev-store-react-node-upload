/// <reference lib="dom" />
import React, { useEffect, useRef, useState } from 'react';

import * as lottieWeb from 'lottie-web';
import styled from 'styled-components';

import R from '@utils/resourceMapper';

import SvgIcon from '@commons/SvgIcon';

const lottie = lottieWeb.default;

const LottiePlayer = React.memo(
  ({
    animationData,
    id,
    isPlaying,
    onPlayingChange,
  }: {
    animationData: any;
    id: string;
    isPlaying: boolean;
    onPlayingChange: (playing: boolean) => void;
  }) => {
    const lottieRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<any>(null);

    useEffect(() => {
      if (!lottieRef.current) return;

      const animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData,
      });

      animationRef.current = animation;

      animation.addEventListener('complete', () => {
        onPlayingChange(false);
      });

      return () => {
        animation.destroy();
      };
    }, [animationData]);

    useEffect(() => {
      const animation = animationRef.current;
      if (!animation) return;

      if (isPlaying) {
        animation.play();
      } else {
        animation.stop();
      }
    }, [isPlaying]);

    return (
      <LottieContainer>
        <LottieWrapper ref={lottieRef} />
        <StatusIndicator $isPlaying={isPlaying}>{isPlaying ? '재생중' : '클릭하여 재생'}</StatusIndicator>
      </LottieContainer>
    );
  },
);

type AssetItemProps = {
  type: string;
  name: string;
  src: any;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
};

const MemoizedAssetItem = React.memo(({ type, name, src, isPlaying, onPlayingChange }: AssetItemProps) => {
  const copyToClipboard = (type: string, key: string) => {
    const typeMap: Record<string, string> = {
      SVG: 'svg',
      Images: 'img',
      Lotties: 'lotties',
    };
    const text = `R.${typeMap[type]}.${key}`;
    void window.navigator.clipboard.writeText(text);
  };

  if (type === 'Lotties') {
    const handleClick = () => {
      onPlayingChange(!isPlaying);
    };

    return (
      <Item onClick={handleClick}>
        <LottiePlayer
          animationData={src}
          id={name}
          isPlaying={isPlaying}
          onPlayingChange={onPlayingChange}
        />
        <Name>{name}</Name>
        <CopyText>클릭하여 재생/정지</CopyText>
      </Item>
    );
  }

  return (
    <Item onClick={() => copyToClipboard(type, name)}>
      <ImageWrapper>
        <SvgIcon
          name={src}
          width={48}
          height={48}
        />
      </ImageWrapper>
      <Name>{name}</Name>
      <CopyText>클릭하여 코드 복사</CopyText>
    </Item>
  );
});

export default function SvgPalette() {
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});

  const handlePlayingChange = (id: string, playing: boolean) => {
    setPlayingStates((prev) => ({
      ...prev,
      [id]: playing,
    }));
  };

  const assetList = [
    { title: 'SVG', items: Object.entries(R.svg) },
    { title: 'Images', items: Object.entries(R.img) },
    { title: 'Lotties', items: Object.entries(R.lotties) },
  ];

  return (
    <Container>
      <Header>
        <Title>Asset Palette</Title>
        <Description>개발 환경에서만 접근 가능한 에셋 팔레트 페이지입니다</Description>
      </Header>
      {assetList.map(({ title, items }) => (
        <Section key={title}>
          <SectionTitle>{title}</SectionTitle>
          <Grid>
            {items.map(([key, src]) => (
              <div key={`${title}-${key}`}>
                <MemoizedAssetItem
                  type={title}
                  name={key}
                  key={`${title}-${key}`}
                  src={src}
                  isPlaying={playingStates[key] || false}
                  onPlayingChange={(playing) => handlePlayingChange(key, playing)}
                />
              </div>
            ))}
          </Grid>
        </Section>
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Name = styled.span`
  font-size: 12px;
  color: #333;
  text-align: center;
  word-break: break-all;
  margin-bottom: 4px;
`;

const CopyText = styled.span`
  font-size: 10px;
  color: #999;
  text-align: center;
`;

const LottieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LottieWrapper = styled.div`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  position: relative;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  svg {
    width: 100% !important;
    height: 100% !important;
  }
`;

const StatusIndicator = styled.div<{ $isPlaying: boolean }>`
  background: ${({ $isPlaying }) => ($isPlaying ? '#007AFF' : '#E5E5EA')};
  color: ${({ $isPlaying }) => ($isPlaying ? 'white' : '#8E8E93')};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
`;
