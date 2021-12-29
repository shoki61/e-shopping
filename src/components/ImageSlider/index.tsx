import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { ChevronLeftRounded, ChevronRightRounded, FavoriteBorderRounded, FavoriteRounded } from '@material-ui/icons';

import { palette } from 'palette';

import Clickable from '../Clickable';
import Image from '../Image';
import './style.css';

type Props = {
  images: { imgUrl: string }[];
  isFavorite: boolean;
};

const ImageSlider: React.FC<Props> = ({ images, isFavorite }: Props) => {
  const [showControls, setShowControls] = useState(true);
  const finalImages = images.map((img) => ({
    original: img.imgUrl,
    thumbnail: img.imgUrl,
    thumbnailClass: 'Image-Slider-Bottom-Image',
  }));
  const renderLeftNav = (onClick: any) =>
    showControls ? (
      <Clickable
        style={{ backgroundColor: palette.l }}
        className={'Image-Slider-Nav-Buttons Image-Slider-Left-Button'}
        onClick={onClick}
      >
        <ChevronLeftRounded style={{ color: palette.dg }} fontSize={'large'} />
      </Clickable>
    ) : (
      <div />
    );

  const renderRightNav = (onClick: any) =>
    showControls ? (
      <Clickable
        style={{ backgroundColor: palette.l }}
        className={'Image-Slider-Nav-Buttons Image-Slider-Right-Button'}
        onClick={onClick}
      >
        <ChevronRightRounded style={{ color: palette.dg }} fontSize={'large'} />
      </Clickable>
    ) : (
      <div />
    );

  const renderItem = (item: any) => (
    <div style={{ position: 'relative' }}>
      <Image
        onZoom={(v) => setShowControls(!v)}
        width={350}
        height={500}
        zoomable
        className={'Image-Slider-Original'}
        source={item.original}
      />
    </div>
  );
  const renderFovoriteButton = () => (
    <Clickable style={{ backgroundColor: palette.l }} className={'Image-Slider-Favoite-Button'} onClick={() => ''}>
      {isFavorite ? (
        <FavoriteRounded style={{ color: palette.e }} fontSize={'small'} />
      ) : (
        <FavoriteBorderRounded style={{ color: palette.dg1 }} fontSize={'small'} />
      )}
    </Clickable>
  );

  return (
    <ImageGallery
      showPlayButton={false}
      slideOnThumbnailOver
      onMouseOver={() => {}}
      onMouseLeave={() => {}}
      showFullscreenButton={false}
      items={finalImages}
      renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav}
      renderItem={renderItem}
      renderCustomControls={renderFovoriteButton}
    />
  );
};

export default ImageSlider;
