import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  ShoppingCart,
  FavoriteBorderRounded,
  FavoriteRounded,
  AccountCircle,
  ShoppingCartOutlined,
  ExitToAppRounded,
  Person,
  KeyboardArrowDown,
} from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

import { P, Space, Image, Horizontal, SearchBar, Clickable, T, Menu, AppNotification } from 'components';
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
  const [category, setCategory] = useState('');
  const { pathname } = useLocation();

  const getProducts = (mainCategory: string) => {
    store.dispatch(
      actions.getMainCategoryProducts(mainCategory, (res: any) => {
        if (res.error) {
          AppNotification.error(res.error.message);
        }
      }),
    );
  };

  const navItems = [
    { title: translate('man'), to: '/products/man', onClick: () => getProducts('MAN') },
    { title: translate('woman'), to: '/products/woman', onClick: () => getProducts('WOMAN') },
    { title: translate('child'), to: '/products/child', onClick: () => getProducts('CHILD') },
    { title: translate('pet'), to: '/products/pet', onClick: () => getProducts('PET') },
    { title: translate('electronic'), to: '/products/electronic', onClick: () => getProducts('ELECTRONIC') },
    { title: translate('sport'), to: '/products/sport', onClick: () => getProducts('SPORT') },
  ];

  const menuItems = [
    { label: 'Your Account', icon: <Person />, onClick: () => {} },
    { label: 'Logout', icon: <ExitToAppRounded />, onClick: () => store.dispatch(actions.logout()) },
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
                      labelIcon={<AccountCircle style={{ color: palette.dg }} />}
                      label={profile.name}
                      items={menuItems}
                      horizontal={false}
                    />
                    <Space v={'n'} />
                  </>
                )}
                <Clickable onClick={() => navigate('favorites')}>
                  {pathname.includes('favorites') ? (
                    <FavoriteRounded style={{ color: palette.e, height: 25 }} />
                  ) : (
                    <FavoriteBorderRounded style={{ color: palette.dg1, height: 25 }} />
                  )}
                  <P color={'dg'}>
                    <T>favorites</T>
                  </P>
                </Clickable>
                <Space v={'n'} />
                <Clickable onClick={() => navigate('/cart')}>
                  {pathname.includes('cart') ? (
                    <ShoppingCart style={{ color: palette.y, height: 25 }} />
                  ) : (
                    <ShoppingCartOutlined style={{ color: palette.dg1, height: 25 }} />
                  )}
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
                    onMouseEnter={(v: string) => {
                      setCategory(v.replace(/[ ]/gi, '_').toUpperCase());
                      setShowMenu(true);
                    }}
                    onMouseLeave={() => {
                      setShowMenu(false);
                    }}
                    {...item}
                    key={`header-nav-item-${i}`}
                  />
                ))}
              </Horizontal>
              <Horizontal>
                {!loggedIn && (
                  <>
                    <NavItem title={translate('login')} to={'/login'} onClick={() => {}} />
                    <P color={'dg'}>
                      <T>or</T>
                    </P>
                    <NavItem title={translate('signUp')} to={'/sign-up'} onClick={() => {}} />
                  </>
                )}
                <Space v={'n'} h={'s'} />
                <Clickable onClick={() => setShowLanguages(!showLanguages)} style={{ position: 'relative' }}>
                  <Horizontal>
                    <Image source={languages.key === 'US' ? US : TR} width={15} height={15} borderRadius={3} />
                    <Space v={'n'} h={'n'} l={'xs'} />
                    <P color={'dg'}>{languages.key}</P>
                    <KeyboardArrowDown style={{ color: palette.dg }} />
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
        <SubNav
          category={category}
          onOpen={() => setShowMenu(true)}
          onClose={() => {
            setShowMenu(false);
            setCategory('');
          }}
        />
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
