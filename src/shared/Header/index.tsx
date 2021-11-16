import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PersonIcon from '@material-ui/icons/Person';
import LogoutRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MenuItem, ControlledMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { P, Space, Image, Horizontal, SearchBar, Clickable, T } from 'components';
import { AppLogo, TR, US } from 'assets';
import { palette } from 'palette';
import { translate } from 'util/translate';
import * as actions from 'store/actions';
import { store } from 'store';

import { NavItem } from './components';
import './style.css';

type ReduxProps = {
  languages: any;
  profile: any;
  loggedIn: boolean;
};

type HeaderProps = unknown;

type Props = ReduxProps & HeaderProps;

const Header: React.FC<Props> = ({ languages, profile, loggedIn }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { title: translate('man'), to: '/man' },
    { title: translate('woman'), to: '/woman' },
    { title: translate('child'), to: '/child' },
    { title: `${translate('home')} & ${translate('life')}`, to: '/home' },
    { title: translate('pet'), to: '/pet' },
    { title: translate('garden'), to: '/garden' },
    { title: translate('electronic'), to: '/electronic' },
  ];
  const ref = useRef(null);
  const { toggleMenu, ...menuProps } = useMenuState({ transition: true });

  return (
    <div className={'Header'} style={{ borderBottomColor: `${palette.dg}50` }}>
      <Space v={'xs'} h={'n'} fullWidth>
        <Horizontal align={'bottom'} spread>
          <Clickable onClick={() => navigate('/')}>
            <Image width={250} source={AppLogo} alt={'App-Logo'} />
          </Clickable>
          <Space fullWidth v={'n'} h={'xxl'} b={'s'}>
            <SearchBar value={searchValue} onChange={setSearchValue} placeholder={translate('searchBarPlaceholder')} />
          </Space>
          <Space v={'n'} b={'s'}>
            <Horizontal>
              {loggedIn && (
                <>
                  <div ref={ref} onMouseEnter={() => toggleMenu(true)}>
                    <Clickable onClick={() => {}}>
                      <AccountCircleIcon style={{ color: `${palette.dg}`, height: 25 }} />
                      <P color={'dg'}>{profile.name || 'Sohrat'}</P>
                    </Clickable>
                  </div>
                  <ControlledMenu
                    {...menuProps}
                    arrow
                    menuStyles={{ borderRadius: 10 }}
                    align={'center'}
                    anchorRef={ref}
                    onMouseLeave={() => toggleMenu(false)}
                    onClose={() => toggleMenu(false)}
                  >
                    <MenuItem
                      styles={{
                        color: palette.dg,
                        hover: {
                          color: palette.m,
                          backgroundColor: `${palette.lg}40`,
                        },
                        active: {
                          backgroundColor: `${palette.m}30`,
                        },
                      }}
                    >
                      <PersonIcon />
                      <Space v={'n'} h={'xs'} />
                      <P bold>Your account</P>
                    </MenuItem>
                    <MenuItem
                      styles={{
                        color: palette.dg,
                        hover: {
                          color: palette.m,
                          backgroundColor: `${palette.lg}40`,
                        },
                        active: {
                          backgroundColor: `${palette.m}30`,
                        },
                      }}
                    >
                      <LogoutRoundedIcon />
                      <Space v={'n'} h={'xs'} />
                      <P bold>Logout</P>
                    </MenuItem>
                  </ControlledMenu>
                  <Space v={'n'} />
                </>
              )}
              <Clickable onClick={() => {}}>
                <FavoriteSharp style={{ color: palette.e, height: 25 }} />
                <P color={'dg'}>
                  <T>favorites</T>
                </P>
              </Clickable>
              <Space v={'n'} />
              <Clickable onClick={() => {}}>
                <ShoppingCartIcon style={{ color: palette.y, height: 25 }} />
                <P color={'dg'}>
                  <T>cart</T>
                </P>
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
            {!loggedIn && (
              <>
                <NavItem title={translate('login')} to={'/login'} />
                <P color={'dg'}>
                  <T>or</T>
                </P>
                <NavItem title={translate('signUp')} to={'/sign-up'} />
              </>
            )}
            <Space v={'n'} h={'s'} />
            <Clickable onClick={() => setShowLanguages(!showLanguages)} style={{ position: 'relative' }}>
              <Horizontal>
                <Image source={languages.key === 'US' ? US : TR} width={15} height={15} borderRadius={3} />
                <Space v={'n'} h={'n'} l={'xs'} />
                <P color={'dg'}>{languages.key}</P>
                <KeyboardArrowDownIcon style={{ color: palette.dg }} />
              </Horizontal>
              {showLanguages && (
                <Space className={'Header-Languages-Container'} style={{ backgroundColor: palette.l }} v={'s'} h={'s'}>
                  <Clickable fullWidth onClick={() => store.dispatch(actions.changeLanguage('en'))}>
                    <Horizontal>
                      <Image source={US} width={15} height={15} borderRadius={3} />
                      <Space v={'n'} h={'n'} r={'xs'} />
                      <P color={languages.key === 'US' ? 'm' : 'dg'}>
                        <T>en</T>
                      </P>
                    </Horizontal>
                  </Clickable>
                  <Space v={'n'} h={'n'} t={'s'} />
                  <Clickable fullWidth onClick={() => store.dispatch(actions.changeLanguage('tr'))}>
                    <Horizontal>
                      <Image source={TR} width={15} height={15} borderRadius={3} />
                      <Space v={'n'} h={'n'} r={'xs'} />
                      <P color={languages.key === 'TR' ? 'm' : 'dg'}>
                        <T>tr</T>
                      </P>
                    </Horizontal>
                  </Clickable>
                </Space>
              )}
            </Clickable>
          </Horizontal>
        </Horizontal>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ app: { languages }, user: { profile, loggedIn } }: any) => ({
  languages,
  profile,
  loggedIn,
});

export default connect(mapStateToProps)(Header);
