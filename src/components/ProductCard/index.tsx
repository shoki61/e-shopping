import { FavoriteBorderRounded, FavoriteRounded, AddShoppingCart, DoneRounded } from '@material-ui/icons';
import { Rating } from 'react-simple-star-rating';

import { Space, P, Clickable, Horizontal, Image, Button } from 'components';
import { palette } from 'palette';
import { Camera } from 'assets';

import './style.css';
import { fontSize } from 'fontSizes';

type Props = {
  imageSource?: string;
  prize: number;
  title: string;
  rating: number;
  onClick: () => void;
  isFavorite: boolean;
  isInCard?: boolean;
};

const ProductCard: React.FC<Props> = ({ imageSource, prize, title, rating, onClick, isFavorite, isInCard }: Props) => {
  return (
    <Clickable onClick={onClick}>
      <div className={'Product-Card-Container'} style={{ borderColor: palette.lg }}>
        <div style={{ position: 'relative' }}>
          {imageSource ? (
            <Image source={imageSource} alt="title" className={'Product-Card-Image'} />
          ) : (
            <Space flex className={'Product-Card-Default-Image-Container'} style={{ backgroundColor: palette.lg }}>
              <Image className={'Product-Card-Default-Image'} source={Camera} />
            </Space>
          )}
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
          <P color={'dg'} size={'s'} line={2}>
            {title}
          </P>
          <Space v={'n'} b={'xs'} />
          <Horizontal>
            <Rating ratingValue={rating} onClick={() => {}} size={18} readonly />
            <Space v={'n'} h={'n'} l={'xs'} />
            <P color={'dg1'} size={'xs'}>
              ( 275 )
            </P>
          </Horizontal>
          <Space h={'n'} v={'xs'}>
            <P bold color={'dg'} size={'l'}>
              {prize} TL
            </P>
          </Space>
          <Button
            icon={
              isInCard ? (
                <DoneRounded style={{ color: palette.l, fontSize: fontSize.l }} />
              ) : (
                <AddShoppingCart style={{ color: palette.l, fontSize: fontSize.l }} />
              )
            }
            fullWidth
            title={isInCard ? 'Sepete eklendi' : 'Sepete ekle'}
            onClick={() => {}}
          />
        </Space>
      </div>
    </Clickable>
  );
};

export default ProductCard;
