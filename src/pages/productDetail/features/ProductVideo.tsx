import NonModalTooltip from '@components/tooltip/NonModalTooltip';

import { colors } from '@styles/theme';

import { numberWithCommas } from '@utils/display';

import { DetailsContent, RelationVideoContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  relationVideo?: RelationVideoContent;
};
const ProductVideo = ({ goodsInfo, relationVideo }: Props) => {
  if (!goodsInfo || !relationVideo) return;

  const VideoItem = ({ videoUrl, videoName, count }: { videoUrl: string; videoName: string; count: number }) => {
    return (
      <S.VideoContainer>
        <div className='video-box'>
          <span className='count'>
            <i></i>
            {numberWithCommas(count)}
          </span>
          <video muted>
            <source
              src={videoUrl}
              type='video/mp4'
            />
          </video>
        </div>
        <S.VideoTitle>{videoName}</S.VideoTitle>
      </S.VideoContainer>
    );
  };

  return (
    <S.ProdListInfoViewNoMargin className='prodListInfoViewNoMargin'>
      <S.ProductDetailSectionTitle>
        <S.ToolTipView className='toolTipView01'>
          <p className='tipTitle'>관련 영상</p>
          <NonModalTooltip
            title='관련 영상'
            trigerColor={colors.icon4}
            trigerType='!'
            className='tipTarget'
            position='center'
            showCloseButton={true}
            defaultShown={false}
            size={20}
            withDot={true}
            items={['추후 적용']}
          />
        </S.ToolTipView>
      </S.ProductDetailSectionTitle>

      <S.ListScrollxContainer>
        {relationVideo.map((video, index) => (
          <VideoItem
            key={index}
            videoUrl={video.videoUrl}
            videoName={video.videoName}
            count={video.count}
          />
        ))}
      </S.ListScrollxContainer>
    </S.ProdListInfoViewNoMargin>
  );
};

export default ProductVideo;
