import { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { palette, PaletteKey } from 'palette';

import P from '../P';
import Space from '../Space';
import Clickable from '../Clickable';
import './style.css';

type Props = {
  title?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
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
  style?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
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
  type = 'text',
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
        style={{ borderColor: error ? palette.e : palette.lg, borderRadius, ...style }}
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
          type={secret ? (showSecret ? 'text' : 'password') : type}
        />
        {secret ? (
          <Clickable onClick={() => setShowSecret(!showSecret)}>
            {showSecret ? <Visibility style={{ color: palette.m }} /> : <VisibilityOff style={{ color: palette.lg }} />}
          </Clickable>
        ) : null}
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
