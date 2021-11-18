import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import FavoriteSharp from '@material-ui/icons/FavoriteSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PersonIcon from '@material-ui/icons/Person';
import LogoutRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { P, Space, Image, Horizontal, SearchBar, Clickable, T, Menu } from 'components';
import { AppLogo, TR, US } from 'assets';
import { palette } from 'palette';
import { translate } from 'util/translate';
import * as actions from 'store/actions';
import { store } from 'store';

import { NavItem, SubNav } from './components';
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
  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { title: translate('man'), to: '/man' },
    { title: translate('woman'), to: '/woman' },
    { title: translate('child'), to: '/child' },
    { title: `${translate('home')} & ${translate('life')}`, to: '/home' },
    { title: translate('pet'), to: '/pet' },
    { title: translate('electronic'), to: '/electronic' },
    { title: translate('sport'), to: '/sport' },
  ];

  const menuItems = [
    { label: 'Your Account', icon: <PersonIcon />, onClick: () => {} },
    { label: 'Logout', icon: <LogoutRoundedIcon />, onClick: () => store.dispatch(actions.logout()) },
  ];

  return (
    <>
      <div id={'Header'} style={{ borderBottomColor: `${palette.dg}50` }}>
        <Space v={'xs'} h={'xxl'} fullWidth>
          <Horizontal align={'bottom'} spread>
            <Clickable onClick={() => navigate('/')}>
              <Image width={250} source={AppLogo} alt={'App-Logo'} />
            </Clickable>
            <Space fullWidth v={'n'} h={'xxl'} b={'s'}>
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder={translate('searchBarPlaceholder')}
              />
            </Space>
            <Space v={'n'} b={'s'}>
              <Horizontal>
                {loggedIn && (
                  <>
                    <Menu
                      labelIcon={<AccountCircleIcon style={{ color: palette.dg }} />}
                      label={profile.name}
                      items={menuItems}
                      horizontal={false}
                    />
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
          <Space v={'n'} h={'xxl'}>
            <Horizontal wrap spread>
              <Horizontal>
                {navItems.map((item, i) => (
                  <NavItem
                    onMouseEnter={() => setShowMenu(true)}
                    onMouseLeave={() => setShowMenu(false)}
                    {...item}
                    key={`header-nav-item-${i}`}
                  />
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
                    <Space
                      className={'Header-Languages-Container'}
                      style={{ backgroundColor: palette.l }}
                      v={'s'}
                      h={'s'}
                    >
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
          </Space>
        </nav>
      </div>
      <CSSTransition in={showMenu} classNames={'fade'} timeout={200} unmountOnExit>
        <SubNav onOpen={() => setShowMenu(true)} onClose={() => setShowMenu(false)} />
      </CSSTransition>
    </>
  );
};

const mapStateToProps = ({ app: { languages }, user: { profile, loggedIn } }: any) => ({
  languages,
  profile,
  loggedIn,
});

export default connect(mapStateToProps)(Header);
