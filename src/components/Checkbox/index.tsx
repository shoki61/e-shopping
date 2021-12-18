import { FontSizeKey } from 'fontSizes';
import { PaletteKey } from 'palette';
import Space from '../Space';
import P from '../P';
import './style.css';

type Props = {
  label?: string;
  checked?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  labelSize?: FontSizeKey;
  labelColor?: PaletteKey;
  borderRadius?: number | string;
};

const Checkbox: React.FC<Props> = ({
  label,
  labelSize = 'm',
  labelColor = 'dg',
  checked,
  size = 'medium',
  borderRadius,
  onClick,
}: Props) => {
  return (
    <label className={'container'}>
      <input onClick={onClick} checked={checked} type={'checkbox'} />
      <span style={{ ...style[size], borderRadius: borderRadius ?? 'auto' }} className={'checkmark'}></span>
      {label && (
        <>
          <Space v={'n'} h={'n'} l={'xs'} />
          <P size={labelSize} color={labelColor}>
            {label}
          </P>
        </>
      )}
    </label>
  );
};

const style = {
  small: { width: 20, height: 20 },
  medium: { width: 25, height: 25 },
  large: { width: 30, height: 30 },
};

export default Checkbox;
