import { useState } from 'react';

import { Modal } from '@components';

import { AnnouncementContent, DetailsContent } from '@apis/goodsApi';

import AnnouncementModal from './AnnouncementModal';
import * as S from './_ProductDetail.style';

type Props = {
  goodsInfo?: DetailsContent;
  announcement?: AnnouncementContent;
  goodsId: number;
};

const ProductAnnouncement = ({ goodsInfo, announcement }: Props) => {
  const [announcementModal, setAnnouncementModal] = useState(false);
  if (!goodsInfo || !announcement) return;
  const showAnnouncementModal = () => {
    setAnnouncementModal(true);
  };

  const hideAnnouncementModal = () => {
    setAnnouncementModal(false);
  };

  return (
    <S.ProdAnnouncementView>
      {(goodsInfo?.instagramUrl || goodsInfo?.youtubeUrl) && (
        <S.ProdAnnouncementSns>
          <span className='linkTitle'>채널</span>
          {goodsInfo?.instagramUrl && (
            <a
              href={goodsInfo.instagramUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='link'
            >
              인스타그램
            </a>
          )}
          {goodsInfo?.youtubeUrl && (
            <a
              href={goodsInfo.youtubeUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='link'
            >
              유튜브
            </a>
          )}
        </S.ProdAnnouncementSns>
      )}
      <S.ProdAnnouncementList>
        <li>
          <button
            type='button'
            onClick={() => showAnnouncementModal()}
          >
            상품정보 제공고시
          </button>
        </li>
        <li>
          <button type='button'>반품/교환안내</button>
        </li>
        <li>
          <button type='button'>스토어정보</button>
        </li>
        <li>
          <button type='button'>쇼핑 안전거래 TIP</button>
        </li>
        <li>
          <button type='button'>상품정보 신고하기</button>
        </li>
      </S.ProdAnnouncementList>
      {announcementModal && (
        <Modal
          type='full'
          onHide={hideAnnouncementModal}
          title='상품정보 제공고시'
        >
          <AnnouncementModal announcement={announcement} />
        </Modal>
      )}
    </S.ProdAnnouncementView>
  );
};

export default ProductAnnouncement;
