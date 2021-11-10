import { P, Button, Space, Input, Image, Horizontal } from 'components';
import { palette } from 'palette';

import { NavItem } from './components';
import './style.css';
type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <div className={'Header'} style={{ borderBottomColor: `${palette.dg}50` }}>
      <nav>
        <Horizontal wrap spread>
          <Horizontal>
            <NavItem title={'Man'} to={'/man'} />
            <NavItem title={'Woman'} to={'/woman'} />
            <NavItem title={'Child'} to={'/child'} />
            <NavItem title={'Home & Life'} to={'/home'} />
            <NavItem title={'Pet'} to={'/pet'} />
            <NavItem title={'Garden'} to={'/garden'} />
            <NavItem title={'Electronic'} to={'/electronic'} />
          </Horizontal>
          <NavItem title={'Login'} to={'/auth'} />
        </Horizontal>
      </nav>
    </div>
  );
};

export default Header;
