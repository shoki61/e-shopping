import { Fragment, useState } from 'react';

import Space from '../Space';
import P from '../P';
import Clickable from '../Clickable';
import Horizontal from '../Horizontal';
import Image from '../Image';
import './style.css';
import { palette } from 'palette';

type Props = {
  onClick: (v: string) => void;
  options: { imgUrl: string; color: string }[];
};

const ProductColors: React.FC<Props> = ({ onClick, options }: Props) => {
  const [selectedColor, setSelectedColor] = useState('');
  return (
    <Fragment>
      <P bold color={'dg1'}>
        Colors
      </P>
      <Space h={'n'} v={'xs'} />
      <Horizontal>
        {options.map(({ imgUrl, color }, i) => (
          <Fragment key={`product-color-${imgUrl}-${i}`}>
            <Clickable
              onClick={() => {
                setSelectedColor(color);
                onClick(color);
              }}
            >
              <Image
                className={'Product-Color-Image'}
                style={{ borderColor: color === selectedColor ? palette.m : palette.lg }}
                source={imgUrl}
              />
            </Clickable>
            <Space v={'n'} h={'n'} l={'s'} />
          </Fragment>
        ))}
      </Horizontal>
    </Fragment>
  );
};

export default ProductColors;
