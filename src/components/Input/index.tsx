import { palette, PaletteKey } from 'palette';

import P from '../P';
import Space from '../Space';
import './style.css';

type Props = {
  title?: string;
  value: string;
  placeholder?: string;
  onChange: (v: any) => any;
  secret?: boolean;
  error?: boolean;
  borderRadius?: number;
  errorMessage?: string;
  color?: PaletteKey;
  titleBold?: boolean;
  valueBold?: boolean;
  titleColor?: PaletteKey;
  enabled?: boolean;
  placeholderColor?: PaletteKey;
  maxLength?: number;
  minLength?: number;
};

const Input: React.FC<Props> = ({
  title,
  value,
  placeholder,
  onChange = () => {},
  secret = false,
  error = false,
  borderRadius = 3,
  errorMessage,
  color = 'd',
  titleBold = true,
  valueBold = false,
  titleColor = 'd',
  enabled = true,
  maxLength,
  minLength,
}: Props) => {
  return (
    <Space>
      {title && (
        <P bold={titleBold} color={titleColor}>
          {title}
        </P>
      )}
      <input
        className={'Input'}
        style={{
          borderColor: error ? palette.e : palette.dg,
          borderRadius,
          color: palette[color],
          fontWeight: valueBold ? 700 : 'normal',
        }}
        value={value}
        placeholder={placeholder}
        onChange={({ target: { value } }) => onChange(value)}
        disabled={!enabled}
        maxLength={maxLength}
        minLength={minLength}
      />
      {errorMessage && (
        <P bold color={'e'} size={'s'}>
          {errorMessage}
        </P>
      )}
    </Space>
  );
};

export default Input;
