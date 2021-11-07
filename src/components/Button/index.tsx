import { palette } from 'palette';

import './style.css';

type Props = {
  title: string;
  type?: 'submit' | 'back';
  borderRadius?: number;
};

const Button: React.FC<Props> = ({ title, type = 'submit', borderRadius }: Props) => {
  return (
    <button className="Button" style={{ ...styles[type], borderRadius }}>
      {title}
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
