import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  style?: any;
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
  style,
}: Props) => {
  const [showSecret, setShowSecret] = useState(false);
  return (
    <Space v={'n'} h={'n'}>
      {title && (
        <P bold={titleBold} color={titleColor}>
          {title}
        </P>
      )}
      <div
        className={'Input-Container'}
        style={{ borderColor: error ? palette.e : palette.dg, borderRadius, ...style }}
      >
        <input
          className={'Input'}
          style={{
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
        {showSecret ? <VisibilityOff /> : <Visibility />}
      </div>
      {errorMessage && (
        <P bold color={'e'} size={'s'}>
          {errorMessage}
        </P>
      )}
    </Space>
  );
};

export default Input;
