import { fontSize } from 'fontSizes';
import { palette } from 'palette';

import './styles.css';

type Props = {
  children: string | number | JSX.Element;
  size?: string;
  color?: string;
};

const P: React.FC<Props> = ({ children, size = 'm', color = 'd' }: Props) => {
  return (
    <p className={'P'} style={{ fontSize: fontSize[size], color: palette[color] }}>
      {children}
    </p>
  );
};

export default P;
