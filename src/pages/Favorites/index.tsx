import { useState } from 'react';
import { connect } from 'react-redux';

import { Space, Horizontal, P, Clickable, Menu } from 'components';
import { palette } from 'palette';
import { fontSize } from 'fontSizes';

import './style.css';

type Props = {};

const Favorites: React.FC<Props> = ({}: Props) => {
  const [sorting, setSorting] = useState('latest');

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
            <Menu labelColor={'m'} isLabelBold label={sorting} labelSize={'s'} items={menuItems} />
          </Space>
        </Horizontal>
      </Space>
    </Space>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(Favorites);
