import { useRef, useState } from 'react';

import { useHeader } from '@hooks/useHeader';

import * as S from './ImageViewer.style';

type Props = {
  imageList: string[];
  currentIndex?: number;
};

type TouchState = {
  distance?: number;
  x?: number;
  y?: number;
};

const ImageViewer = ({ imageList = [], currentIndex = 0 }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(currentIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const lastTouchRef = useRef<TouchState | null>(null);

  const handleDoubleTap = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      lastTouchRef.current = { distance };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchRef.current?.distance) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

      const deltaScale = distance / lastTouchRef.current.distance;
      const newScale = Math.min(Math.max(scale * deltaScale, 1), 3);

      setScale(newScale);
      lastTouchRef.current = { distance };
    } else if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0];
      if (lastTouchRef.current?.x !== undefined && lastTouchRef.current?.y !== undefined) {
        const deltaX = touch.clientX - lastTouchRef.current.x;
        const deltaY = touch.clientY - lastTouchRef.current.y;
        setPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      }
      lastTouchRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
    }
  };

  const handleTouchEnd = () => {
    lastTouchRef.current = null;
  };

  const currentImage = imageList[currentIdx];

  return (
    <S.Container>
      <S.ImageViewArea>
        {currentImage && (
          <S.ViewImage
            ref={imageRef}
            src={currentImage}
            alt={`Image ${currentIdx + 1}`}
            $scale={scale}
            $translateX={position.x}
            $translateY={position.y}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleTap}
          />
        )}
      </S.ImageViewArea>
      <S.ThumbnailList>
        {imageList.map((item, index) => (
          <S.Thumbnail
            key={index}
            className={index === currentIdx ? 'active' : ''}
            $selected={index === currentIdx}
            onClick={() => setCurrentIdx(index)}
          >
            <img
              width={64}
              height={64}
              src={item}
            />
          </S.Thumbnail>
        ))}
      </S.ThumbnailList>
    </S.Container>
  );
};

export default ImageViewer;
