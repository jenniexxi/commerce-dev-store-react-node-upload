import { T } from '@commons';
import { Button, Radio } from '@components';

import { colors } from '@styles/theme';

import R from '@utils/resourceMapper';

import { Code } from '@apis/apiCommonType';

import SvgIcon from '@commons/SvgIcon';

import * as S from './ClaimFeatures.style';

type ClaimReasonProps = {
  claimReasonEnum?: Code<string>;
  claimReason: string;
  reasonList: { label: string; value: Code<string> }[];
  onChangeClaimReason: (value: Code<string>) => void;
  setClaimReason: (value: string) => void;
  title: string;
  placeholder: string;
  images?: string[];
  videos?: string[];
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage?: (index: number) => void;
  handleDeleteVideo?: (index: number) => void;
  errorMessageClaimReason?: string;
  errorMessageReason?: string;
};

const ClaimReason = ({
  claimReasonEnum,
  reasonList,
  onChangeClaimReason,
  claimReason,
  setClaimReason,
  title,
  placeholder,
  images,
  videos,
  handleImageUpload,
  handleDeleteImage,
  handleDeleteVideo,
  errorMessageClaimReason,
  errorMessageReason,
}: ClaimReasonProps) => {
  const handleRadioChange = (value: string) => {
    const selectedReason = reasonList.find((reason) => reason.value.code === value);
    if (selectedReason) {
      onChangeClaimReason(selectedReason.value);
    }
  };

  return (
    <>
      <S.OhDetailTitleTy1>
        <h2>{title}사유</h2>
      </S.OhDetailTitleTy1>
      <S.ReasonBox>
        {reasonList.map((reason) => (
          <Radio
            key={reason.value.code}
            id={reason.value.code}
            value={reason.value.code}
            label={reason.label}
            name='claimReason'
            selectedValue={claimReasonEnum?.code || ''}
            onChange={handleRadioChange}
          />
        ))}
      </S.ReasonBox>
      {errorMessageClaimReason && (
        <T.Caption1_Normal $color={colors.status_danger}>{errorMessageClaimReason}</T.Caption1_Normal>
      )}
      <S.TextAreaConts $isError={errorMessageReason !== ''}>
        <S.TextArea
          placeholder={placeholder}
          value={claimReason}
          maxLength={100}
          onChange={(e) => {
            setClaimReason(e.target.value.trimStart());
          }}
        />
        <S.NumberCountBox>
          <S.NumberCount>{claimReason.length}</S.NumberCount>100
        </S.NumberCountBox>
      </S.TextAreaConts>
      {errorMessageReason && (
        <T.Caption1_Normal
          $mt={8}
          $color={colors.status_danger}
        >
          {errorMessageReason}
        </T.Caption1_Normal>
      )}
      {(title === '교환' || title === '반품') && (
        <>
          <S.BtnUploadWarp>
            <S.PictureWrapper>
              <Button
                btnType='tertiary'
                htmlFor='file-image'
                align='center'
                title={
                  <>
                    사진 등록하기{' '}
                    <T.Body1_NormalB $color={images?.length === 0 ? colors.text5 : colors.secondary1}>
                      {images?.length}
                    </T.Body1_NormalB>
                  </>
                }
              ></Button>
              <Button
                btnType='tertiary'
                htmlFor='file-video'
                align='center'
                title={
                  <>
                    영상 등록하기{' '}
                    <T.Body1_NormalB $color={videos?.length === 0 ? colors.text5 : colors.secondary1}>
                      {videos?.length}
                    </T.Body1_NormalB>
                  </>
                }
              />
              <S.PictureInput
                id='file-image'
                type='file'
                accept='.png, .jpg, .jpeg'
                onChange={handleImageUpload}
              />
              <S.PictureInput
                id='file-video'
                type='file'
                accept='.png, .jpg, .jpeg'
                onChange={handleImageUpload}
              />
            </S.PictureWrapper>
            <S.ImageLengthBox>
              <T.Caption1_NormalB $color={colors.text3}>
                {(images?.length || 0) + (videos?.length || 0)} <S.TextAllLength>/ 5</S.TextAllLength>
              </T.Caption1_NormalB>
            </S.ImageLengthBox>
          </S.BtnUploadWarp>
          <S.PreviewWrap>
            {images?.map((image, index) => (
              <S.ImagePreview key={index}>
                <S.PreviewImage
                  src={image}
                  alt={`미리보기 ${index + 1}`}
                />
                <S.DeleteButton
                  onClick={() => {
                    handleDeleteImage && handleDeleteImage(index);
                  }}
                >
                  <SvgIcon
                    name={R.svg.icoCloseCircleOpacity}
                    alt='삭제'
                    width={20}
                    height={20}
                  />
                </S.DeleteButton>
              </S.ImagePreview>
            ))}
            {videos?.map((image, index) => (
              <S.ImagePreview key={index}>
                <S.PreviewImage
                  src={image}
                  alt={`미리보기 ${index + 1}`}
                />
                <S.DeleteButton onClick={() => handleDeleteVideo && handleDeleteVideo(index)}>
                  <SvgIcon
                    name={R.svg.icoCloseCircleOpacity}
                    alt='삭제'
                    width={20}
                    height={20}
                  />
                </S.DeleteButton>
              </S.ImagePreview>
            ))}
          </S.PreviewWrap>
          <S.InfoList>
            <li>30MB 이하의 이미지, 동영상만 등록 가능합니다.</li>
            <li>사진 및 동영상은 최대 5개까지 등록할 수 있습니다.</li>
            <li>판매자 귀책일 경우, 사진 또는 동영상을 필수로 첨부해 주세요.</li>
          </S.InfoList>
        </>
      )}
    </>
  );
};

export default ClaimReason;
