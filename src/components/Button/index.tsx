import ReactLoading from 'react-loading';

import { palette, PaletteKey } from 'palette';
import { P } from 'components';
import { FontSizeKey } from 'fontSizes';
import { CursorType } from 'components/Clickable';

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
  onClick: () => any;
  cursor?: CursorType;
  loadingIconSize?: number;
  style?: React.CSSProperties;
};

const Button: React.FC<Props> = ({
  title,
  type = 'submit',
  borderRadius = 7,
  color = 'd',
  fontSize = 'm',
  fullWidth,
  align,
  loading,
  onClick,
  cursor,
  loadingIconSize = 17,
  style,
}: Props) => {
  const iconSize = { width: loadingIconSize, height: loadingIconSize };
  return (
    <button
      onClick={onClick}
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
    >
      {loading ? (
        <ReactLoading type={'spinningBubbles'} color={palette.l} {...iconSize} />
      ) : (
        <P color={color} size={fontSize}>
          {title}
        </P>
      )}
    </button>
  );
};

const styles = {
  submit: {
    backgroundColor: palette.m,
  },
  back: {
    backgroundColor: palette.l,
  },
};

export default Button;
