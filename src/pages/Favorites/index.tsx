import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Space, Horizontal, P, Clickable, Menu, ProductCard, Image, Button } from 'components';
import { palette } from 'palette';
import { fontSize } from 'fontSizes';
import { Empty } from 'assets';

import './style.css';

type Props = {};

const Favorites: React.FC<Props> = ({}: Props) => {
  const [sorting, setSorting] = useState('latest');
  const navigate = useNavigate();
  const menuItems = [
    {
      label: 'Latest',
      onClick: () => {
        setSorting('latest');
      },
    },
    {
      label: 'Oldest',
      onClick: () => {
        setSorting('oldest');
      },
    },
  ];
  return (
    <Space>
      <Space h={'xxl'}>
        <Horizontal>
          <P color={'dg1'} size={'xxxl'}>
            Favorilerim <span style={{ color: `${palette.dg}99`, fontSize: fontSize.xl }}>({`${23}`})</span>
          </P>
          <Space h={'xs'} v={'n'} />
          <Space v={'xs'} h={'xs'} style={{ borderColor: `${palette.m}90` }} className={'Favorites-Sorting-Container'}>
            <Menu labelColor={'m'} isLabelBold label={sorting} labelSize={'xs'} items={menuItems} />
          </Space>
        </Horizontal>
        <Space v={'s'} />
        {true ? (
          <Horizontal className={'Favorites-Products-Container'}>
            <ProductCard
              onClick={() => {}}
              title={'Siyah Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört'}
              isFavorite
              prize={125}
              rating={4}
              ratingCount={150}
              isInCard
              imageSource={
                'https://cdn.dsmcdn.com/mnresize/1200/1800/ty184/product/media/images/20210927/16/136847065/135399598/1/1_org_zoom.jpg'
              }
            />
            <Space h={'s'} />
          </Horizontal>
        ) : (
          <Horizontal>
            <Image source={Empty} className={'Favorites-Empty-Image'} />
            <Space h={'xxxl'} />
            <Space flex column>
              <P color={'dg'} bold size={'xl'}>
                Favori listeniz boş!
              </P>
              <Space h={'n'} v={'n'} b={'m'}>
                <P color={'dg'}>Dilediğiniz ürünü favorilerinize ekleyebilirsiniz.</P>
              </Space>
              <Clickable onClick={() => navigate('/')}>
                <Space v={'s'} style={{ backgroundColor: `${palette.m}35` }} className={'Favorites-Empty-Button'}>
                  <P color={'m'} bold>
                    Alışverişe başla
                  </P>
                </Space>
              </Clickable>
            </Space>
          </Horizontal>
        )}
      </Space>
    </Space>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(Favorites);
