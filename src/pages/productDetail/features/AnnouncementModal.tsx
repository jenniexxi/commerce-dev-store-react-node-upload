import { AnnouncementContent } from '@apis/goodsApi';

import * as S from './_ProductDetail.style';

type Props = {
  announcement: AnnouncementContent[];
};

const AnnouncementModal = ({ announcement }: Props) => {
  if (!announcement) return;

  return (
    <S.AnnouncementView>
      {announcement.map((item, index) => (
        <section key={index}>
          <h1>{item.itemTypeEnum.codeName}</h1>
          <p>{item.itemContent}</p>
        </section>
      ))}
    </S.AnnouncementView>
  );
};

export default AnnouncementModal;
