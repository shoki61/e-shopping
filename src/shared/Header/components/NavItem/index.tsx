import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { palette } from 'palette';
import { Space, P } from 'components';

import './style.css';

type Props = {
  title: string;
  to: string;
  data?: any;
};

const NavItem: React.FC<Props> = ({ title, to, data }: Props) => {
  const [isActiveNav, setIsActiveNav] = useState(false);
  return (
    <div className={'Nav-Item-Container'} style={{ borderBottomColor: isActiveNav ? palette.m : 'transparent' }}>
      <NavLink
        style={({ isActive }) => {
          setIsActiveNav(isActive);
          return {
            color: isActive ? palette.m : palette.dg,
          };
        }}
        to={to}
        state={data}
        className={'Nav-Item'}
      >
        <Space v={'s'}>
          <P bold>{title}</P>
        </Space>
      </NavLink>
    </div>
  );
};

export default NavItem;
