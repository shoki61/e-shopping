import { useState } from 'react';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { P, Button, Space, Input, Image, Horizontal, SearchBar, Clickable } from 'components';
import { AppLogo } from 'assets';
import { palette } from 'palette';

import { NavItem } from './components';
import './style.css';
type Props = {};

const Header: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = useState('');

  const navItems = [
    { title: 'Man', to: '/man' },
    { title: 'Woman', to: '/woman' },
    { title: 'Child', to: '/child' },
    { title: 'Home & Life', to: '/home' },
    { title: 'Pet', to: '/pet' },
    { title: 'Garden', to: '/garden' },
    { title: 'Electronic', to: '/electronic' },
  ];

  return (
    <div className={'Header'} style={{ borderBottomColor: `${palette.dg}50` }}>
      <Space v={'xs'} h={'n'} fullWidth>
        <Horizontal align={'bottom'} spread>
          <Clickable onClick={() => {}}>
            <Image width={250} source={AppLogo} alt={'App-Logo'} />
          </Clickable>
          <Space fullWidth v={'n'} h={'xxl'} b={'s'}>
            <SearchBar
              value={searchValue}
              onChange={setSearchValue}
              placeholder={'please enter product, category or mark...'}
            />
          </Space>
          <Space v={'n'} b={'s'}>
            <Horizontal>
              <Clickable onClick={() => {}}>
                <FavoriteSharp style={{ color: palette.e }} />
                <P color={'dg'}>Favorites</P>
              </Clickable>
              <Space v={'n'} />
              <Clickable onClick={() => {}}>
                <ShoppingCartIcon style={{ color: palette.y }} />
                <P color={'dg'}>Cart</P>
              </Clickable>
            </Horizontal>
          </Space>
        </Horizontal>
      </Space>
      <nav>
        <Horizontal wrap spread>
          <Horizontal>
            {navItems.map((item, i) => (
              <NavItem {...item} key={`header-nav-item-${i}`} />
            ))}
          </Horizontal>
          <Horizontal>
            <NavItem title={'Login'} to={'/auth'} />
            <P color={'dg'}>or</P>
            <NavItem title={'Sign Up'} to={'/sign-up'} />
          </Horizontal>
        </Horizontal>
      </nav>
    </div>
  );
};

export default Header;
