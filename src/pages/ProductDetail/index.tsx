import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'react-simple-star-rating';

import { Space, P, Horizontal, Button, Sizes, Clickable, ProductColors, ImageSlider, ProductCard } from 'components';
import { Product, Profile } from 'models';

import './style.css';
import { palette } from 'palette';
import { Person } from '@material-ui/icons';

type Props = {
  profile: Profile;
  productDetail: Product;
  similarProducts: Product[];
};

const ProductDetail: React.FC<Props> = ({
  profile,
  productDetail: { name, rating, ratingCount, price, description, seller, colors },
  similarProducts,
}: Props) => {
  const [showMoreDescriptionButton, setShowDescriptionButton] = useState(false);
  const [showMoreDescription, setShowDescription] = useState(false);

  const getElement = () => {
    const element: any = document.querySelector('.P-Angry');
    if (element) {
      const status = element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;
      setShowDescriptionButton(status);
    }
    if (!element) {
      getElement();
    }
  };
  useEffect(() => {
    getElement();
  }, []);
  return (
    <div>
      <Space flex column h={'xxl'} v={'xl'}>
        <Horizontal align={'top'} className={'Product-Detail-Container'}>
          <Space>
            <ImageSlider
              isFavorite
              images={[
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/1200/1800/ty184/product/media/images/20210927/16/136847065/135399598/1/1_org_zoom.jpg',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/1200/1800/ty161/product/media/images/20210817/8/119111888/164609399/1/1_org_zoom.jpg',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/1200/1800/ty156/product/media/images/20210812/15/118159653/186967030/1/1_org_zoom.jpg',
                },
              ]}
            />
          </Space>
          <Space l={'xl'}>
            <P color={'dg'} size={'xl'} bold>
              {name}
            </P>
            <Space h={'n'} v={'xs'} />
            <P color={'dg1'} bold>
              Değerlendirme
            </P>
            <Horizontal>
              <Rating readonly onClick={() => {}} size={30} ratingValue={rating} allowHalfIcon />
              <Space v={'n'} h={'xs'}>
                <P color={'dg1'}>({ratingCount})</P>
              </Space>
            </Horizontal>
            <Space h={'n'} v={'xs'} />
            <P color={'dg1'} bold>
              Fiyat
            </P>
            <P color={'dg'} size={'xxxl'} bold>
              {price} TL
            </P>
            <Space h={'n'} v={'xs'} />
            <Sizes onClick={(v: string) => {}} />
            <Space h={'n'} v={'s'} />
            <ProductColors
              onClick={(v: string) => {}}
              options={[
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty78/product/media/images/20210317/13/73036227/154236149/1/1_org_zoom.jpg',
                  color: 'red',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty77/product/media/images/20210303/20/68406319/148048713/0/0_org_zoom.jpg',
                  color: 'black',
                },
                {
                  imgUrl:
                    'https://cdn.dsmcdn.com/mnresize/128/192/ty79/product/media/images/20210303/17/68373830/147952454/0/0_org_zoom.jpg',
                  color: 'white',
                },
              ]}
            />
            <Space h={'n'} v={'s'} />
            <Button title={'Sepete ekle'} onClick={() => {}} fontSize={'l'} />
            <Space h={'n'} v={'s'} />
            <P bold color={'dg1'}>
              Satıcı
            </P>
            <P style={{ fontWeight: 500 }} color={'i'}>
              {seller}
            </P>
            <Space h={'n'} v={'xs'} />
            <P bold color={'dg1'}>
              Ürün açıklaması
            </P>
            <P color={'dg'} line={!showMoreDescription ? 3 : 1000} className={'Product-Detail-Description'}>
              {description}
            </P>
            <Space v={'n'} b={'xs'} />
            {showMoreDescriptionButton && (
              <div style={{ position: 'relative' }}>
                {!showMoreDescription && <div className={'Product-Detail-More-Description-Opacity'} />}
                <Clickable
                  className={'Product-Detail-More-Description'}
                  fullWidth
                  style={{ backgroundColor: `${palette.m}3f` }}
                  onClick={() => setShowDescription(!showMoreDescription)}
                >
                  <Space v={'xs'}>
                    <P color={'m'} bold size={'s'}>
                      {showMoreDescription ? 'Daha az' : 'Daha fazla'}
                    </P>
                  </Space>
                </Clickable>
              </div>
            )}
          </Space>
        </Horizontal>
        <Space />
        <div className={'Product-Detail-Container'}>
          <Space h={'n'}>
            <Horizontal>
              <P color={'dg'} bold>
                Ürün değerlendirmeleri
              </P>
              <Space v={'n'} h={'xs'}>
                <P color={'dg1'} style={{ fontWeight: 500 }}>
                  ({ratingCount})
                </P>
              </Space>
            </Horizontal>
            <Space v={'xs'} />
            <Horizontal align="top">
              <Horizontal>
                <P color={'dg'} bold size={'l'}>
                  {rating}
                </P>
                <Space v={'n'} h={'n'} r={'xs'} />
                <P color={'dg1'} size={'l'}>
                  /5
                </P>
              </Horizontal>
              <Space h={'xs'} v={'n'} />
              <Rating readonly onClick={() => {}} size={27} ratingValue={rating} allowHalfIcon />
            </Horizontal>
            <Space>
              <Horizontal align={'top'}>
                <div className={'Product-Detail-Person'} style={{ backgroundColor: `${palette.m}c1` }}>
                  <Person style={{ color: palette.l }} />
                </div>
                <Space v={'n'} h={'n'} l={'m'} />
                <div
                  style={{
                    borderBottom: `2px solid ${palette.lg}`,
                    paddingBottom: 10,
                    flex: 1,
                  }}
                >
                  <P color={'dg'} bold>
                    Lorem Ipsum
                  </P>
                  <Rating readonly onClick={() => {}} size={20} ratingValue={4.5} allowHalfIcon />
                  <P color={'dg1'} size={'s'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel iaculis mauris, id viverra sem
                  </P>
                </div>
              </Horizontal>
              <Horizontal align={'top'}>
                <div className={'Product-Detail-Person'} style={{ backgroundColor: `${palette.m}c1` }}>
                  <Person style={{ color: palette.l }} />
                </div>
                <Space v={'n'} h={'n'} l={'m'} />
                <div
                  style={{
                    borderBottom: `2px solid ${palette.lg}`,
                    paddingBottom: 10,
                    flex: 1,
                  }}
                >
                  <P color={'dg'} bold>
                    Lorem Ipsum
                  </P>
                  <Rating readonly onClick={() => {}} size={20} ratingValue={4.5} allowHalfIcon />
                  <P color={'dg1'} size={'s'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel iaculis mauris, id viverra sem
                  </P>
                </div>
              </Horizontal>
              <Horizontal align={'top'}>
                <div className={'Product-Detail-Person'} style={{ backgroundColor: `${palette.m}c1` }}>
                  <Person style={{ color: palette.l }} />
                </div>
                <Space v={'n'} h={'n'} l={'m'} />
                <div
                  style={{
                    borderBottom: `2px solid ${palette.lg}`,
                    paddingBottom: 10,
                    flex: 1,
                  }}
                >
                  <P color={'dg'} bold>
                    Lorem Ipsum
                  </P>
                  <Rating readonly onClick={() => {}} size={20} ratingValue={4.5} allowHalfIcon />
                  <P color={'dg1'} size={'s'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel iaculis mauris, id viverra sem
                  </P>
                </div>
              </Horizontal>
            </Space>
          </Space>
        </div>
        <Space />
        {similarProducts?.length > 0 && (
          <Space h={'xl'} className={'Product-Detail-Container'}>
            <P color={'dg'} bold>
              Benzer Ürünler
            </P>
            <Space h={'n'} v={'xs'} />
            <Horizontal className={'Product-Detail-Similar-Container'}>
              {similarProducts?.map((item: Product) => (
                <Fragment key={item._id}>
                  <ProductCard
                    onClick={() => {}}
                    isFavorite
                    prize={item.price}
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                    imageSource={
                      'https://cdn.dsmcdn.com/mnresize/1200/1800/ty161/product/media/images/20210817/8/119111888/164609399/1/1_org_zoom.jpg'
                    }
                    title={item.name}
                  />
                  <Space v={'n'} h={'s'} />
                </Fragment>
              ))}
            </Horizontal>
          </Space>
        )}
      </Space>
    </div>
  );
};

const mapStateToProps = ({ user: { profile }, product: { productDetail, similarProducts } }: any) => ({
  profile,
  productDetail,
  similarProducts,
});

export default connect(mapStateToProps)(ProductDetail);
