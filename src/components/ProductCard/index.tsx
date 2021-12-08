import { FavoriteBorderRounded, FavoriteRounded } from '@material-ui/icons';

import { Space, P, Clickable, Horizontal, Image } from 'components';
import { palette } from 'palette';

import './style.css';

type Props = {
  imageSource: string;
  prize: number;
  title: string;
  score: number;
  onClick: () => void;
  isFavorite: boolean;
  switchFavorite: () => void;
};

const ProductCard: React.FC<Props> = ({
  imageSource,
  prize,
  title,
  score,
  onClick,
  isFavorite,
  switchFavorite,
}: Props) => {
  return (
    <Clickable onClick={() => {}}>
      <div className={'Product-Card-Container'} style={{ borderColor: palette.lg }}>
        <div style={{ position: 'relative' }}>
          <Image
            source="https://cdn.dsmcdn.com//ty184/product/media/images/20210927/16/136847065/135399598/1/1_org.jpg"
            alt="title"
            className={'Product-Card-Image'}
          />
          <Clickable
            htmlTitle={isFavorite ? 'Remove Favorites' : 'Add Favorites'}
            style={{ backgroundColor: palette.l }}
            className={'Product-Card-Favorite-Button'}
            onClick={() => {}}
          >
            {isFavorite ? (
              <FavoriteRounded style={{ color: palette.e }} />
            ) : (
              <FavoriteBorderRounded style={{ color: palette.dg1 }} />
            )}
          </Clickable>
        </div>
        <Space h={'s'} v={'xs'}>
          <P color={'dg'} line={2}>
            {title}
          </P>
        </Space>
      </div>
    </Clickable>
  );
};

export default ProductCard;
