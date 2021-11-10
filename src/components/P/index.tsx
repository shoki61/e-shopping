import { fontSize } from 'fontSizes';
import { palette } from 'palette';

import './styles.css';

type Props = {
  children: string | number | JSX.Element;
  size?: string;
  color?: string;
  bold?: boolean;
};

const P: React.FC<Props> = ({ children, size = 'm', color, bold = false }: Props) => {
  return (
    <p
      className={'P'}
      style={{
        fontSize: fontSize[size],
        color: color ? palette[color] : 'inherit',
        fontWeight: bold ? 700 : 'inherit',
      }}
    >
      {children}
    </p>
  );
};

export default P;
