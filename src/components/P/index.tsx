import { fontSize } from 'fontSizes';
import { palette } from 'palette';

import './styles.css';

type Props = {
  children: string | number | JSX.Element;
  size?: string;
  color?: string;
  bold?: boolean;
  className?: string;
};

const P: React.FC<Props> = ({ children, size = 'm', color, bold = false, className }: Props) => {
  return (
    <p
      className={`P ${className}`}
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
