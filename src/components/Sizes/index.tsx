import { Fragment, useState } from 'react';

import { palette } from 'palette';

import P from '../P';
import Horizontal from '../Horizontal';
import Clickable from '../Clickable';
import Space from '../Space';
import './style.css';

type Props = {
  onClick: (v: string) => void;
};

const Sizes: React.FC<Props> = ({ onClick }: Props) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [size, setSize] = useState('M');
  return (
    <Fragment>
      <P bold color={'dg1'}>
        Sizes
      </P>
      <Space h={'n'} v={'xs'} />
      <Horizontal>
        {sizes.map((s, i) => (
          <Fragment key={`sizes-${s}-${i}`}>
            <Clickable
              style={{ backgroundColor: s === size ? palette.m : palette.l }}
              className={'Sizes-Button'}
              onClick={() => {
                setSize(s);
                onClick(s);
              }}
            >
              <P color={s === size ? 'l' : 'dg'}>{s}</P>
            </Clickable>
            <Space v={'n'} h={'xs'} />
          </Fragment>
        ))}
      </Horizontal>
    </Fragment>
  );
};

export default Sizes;
