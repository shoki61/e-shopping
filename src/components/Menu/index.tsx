import { useRef } from 'react';
import { MenuItem, ControlledMenu, useMenuState } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { Clickable, P, Space } from 'components';
import { palette, PaletteKey } from 'palette';
import { FontSizeKey } from 'fontSizes';

type Props = {
  label?: string | JSX.Element;
  labelIcon?: JSX.Element;
  horizontal?: boolean;
  onClick?: () => any;
  items?: { label?: string; icon?: JSX.Element; onClick?: () => any }[];
  itemLabelSize?: FontSizeKey;
  labelSize?: FontSizeKey;
  isLabelBold?: boolean;
  labelColor?: PaletteKey;
};

const Menu: React.FC<Props> = ({
  label,
  labelIcon,
  onClick,
  items,
  horizontal = true,
  itemLabelSize = 'm',
  labelSize = 'm',
  isLabelBold,
  labelColor = 'dg',
}: Props) => {
  const ref = useRef(null);
  const { toggleMenu, ...menuProps } = useMenuState({ transition: true });

  return (
    <>
      <div ref={ref} onMouseEnter={() => toggleMenu(true)}>
        <Clickable onClick={onClick} style={{ display: horizontal ? 'flex' : 'block', alignItems: 'center' }}>
          {labelIcon && labelIcon}
          {labelIcon && horizontal && <Space v={'n'} h={'xs'} />}
          {label && (
            <P bold={isLabelBold} color={labelColor} size={labelSize}>
              {label}
            </P>
          )}
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
        {items?.map(({ label, icon, onClick }, i: number) => (
          <MenuItem
            key={`menu-items-${label}-${i}`}
            onClick={onClick}
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
            {icon && icon}
            <Space v={'n'} h={'xs'} />
            {label && <P size={itemLabelSize}>{label}</P>}
          </MenuItem>
        ))}
      </ControlledMenu>
    </>
  );
};

export default Menu;
