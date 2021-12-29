import { fontSize } from 'fontSizes';
import { palette } from 'palette';

import './styles.css';

type Props = {
  children: React.ReactNode;
  size?: string;
  color?: string;
  bold?: boolean;
  className?: string;
  style?: React.CSSProperties;
  align?: 'center' | 'left' | 'right' | 'justify';
  line?: number;
  capital?: boolean;
};

const P: React.FC<Props> = ({
  children,
  size = 'm',
  color,
  bold = false,
  className,
  style,
  align = 'left',
  line,
  capital = false,
}: Props) => {
  return (
    <p
      className={`P ${className} ${line ? 'P-Angry' : null}`}
      style={{
        fontSize: fontSize[size],
        color: color ? palette[color] : 'inherit',
        fontWeight: bold ? 700 : 'inherit',
        textAlign: align,
        ...style,
        WebkitLineClamp: line,
        textTransform: capital ? 'capitalize' : 'inherit',
      }}
    >
      {children}
    </p>
  );
};

export default P;
