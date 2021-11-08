import { fontSize } from 'fontSizes';
import { palette } from 'palette';

import './styles.css';

type Props = {
  children: string | number | JSX.Element;
  size?: string;
  color?: string;
  bold?: boolean;
};

const P: React.FC<Props> = ({ children, size = 'm', color = 'd', bold = false }: Props) => {
  return (
    <p className={'P'} style={{ fontSize: fontSize[size], color: palette[color], fontWeight: bold ? 700 : 'normal' }}>
      {children}
    </p>
  );
};

export default P;
