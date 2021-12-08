import ReactLoading from 'react-loading';

import { palette, PaletteKey } from 'palette';
import { FontSizeKey } from 'fontSizes';
import { CursorType } from '../Clickable';
import P from '../P';
import Horizontal from '../Horizontal';
import Space from '../Space';

import './style.css';

type Props = {
  title: string;
  type?: 'submit' | 'back';
  borderRadius?: number;
  color?: PaletteKey;
  fontSize?: FontSizeKey;
  fullWidth?: boolean;
  align?: 'center' | 'flex-start' | 'flex-end';
  loading?: boolean;
  onClick: () => void;
  cursor?: CursorType;
  loadingIconSize?: number;
  style?: React.CSSProperties;
  enabled?: boolean;
  icon?: any;
};

const Button: React.FC<Props> = ({
  title,
  type = 'submit',
  borderRadius = 7,
  color = type === 'submit' ? 'l' : 'd',
  fontSize = 'm',
  fullWidth,
  align = 'center',
  loading,
  onClick,
  cursor,
  loadingIconSize = 17,
  style,
  enabled = true,
  icon,
}: Props) => {
  const iconSize = { width: loadingIconSize, height: loadingIconSize };
  return (
    <button
      onClick={() => !loading && onClick()}
      className="Button"
      style={{
        ...styles[type],
        borderRadius,
        width: fullWidth ? '100%' : 'auto',
        justifyContent: align,
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'wait' : cursor,
        ...style,
      }}
      disabled={!enabled}
    >
      {loading ? (
        <ReactLoading type={'spinningBubbles'} color={palette.l} {...iconSize} />
      ) : (
        <Horizontal align={'bottom'}>
          {icon && (
            <>
              {icon}
              <Space v={'n'} h={'n'} l={'xs'} />
            </>
          )}
          <P color={color} size={fontSize}>
            {title}
          </P>
        </Horizontal>
      )}
    </button>
  );
};

const styles = {
  submit: {
    backgroundColor: palette.m,
  },
  back: {
    backgroundColor: palette.lg,
  },
};

export default Button;
