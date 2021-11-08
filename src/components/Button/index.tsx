import { palette, PaletteKey } from 'palette';
import { P } from 'components';
import { FontSizeKey } from 'fontSizes';

import './style.css';

type Props = {
  title: string;
  type?: 'submit' | 'back';
  borderRadius?: number;
  color?: PaletteKey;
  fontSize?: FontSizeKey;
};

const Button: React.FC<Props> = ({ title, type = 'submit', borderRadius = 7, color = 'd', fontSize = 'm' }: Props) => {
  return (
    <button className="Button" style={{ ...styles[type], borderRadius }}>
      <P color={color} size={fontSize}>
        {title}
      </P>
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
