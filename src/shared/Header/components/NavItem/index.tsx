import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { palette } from 'palette';
import { Space, P, Clickable } from 'components';

import './style.css';

type Props = {
  title: string;
  to: string;
  data?: any;
  onMouseEnter?: (v: string) => any;
  onMouseLeave?: () => void;
  onClick: () => any;
};

const NavItem: React.FC<Props> = ({ title, to, onClick, data, onMouseEnter, onMouseLeave }: Props) => {
  const [isActiveNav, setIsActiveNav] = useState(false);
  return (
    <Clickable onClick={onClick}>
      <div
        onMouseEnter={() => onMouseEnter && onMouseEnter(title)}
        onMouseLeave={onMouseLeave}
        className={'Nav-Item-Container'}
        style={{ borderBottomColor: isActiveNav ? palette.m : 'transparent' }}
      >
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
            <P capital bold>
              {title.replace(/[ ]/gi, ' ')}
            </P>
          </Space>
        </NavLink>
      </div>
    </Clickable>
  );
};

export default NavItem;
