import { AddRounded, RemoveRounded, DeleteOutlineRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

import { palette } from 'palette';
import { w } from 'windowDimensions';
import { Camera } from 'assets';
import { Space, Checkbox, Container, Horizontal, Clickable, Image, P } from 'components';

import './style.css';

type Props = {
  onClick: () => void;
  checked: boolean;
  switchSelect: () => void;
  imageUrl?: string;
  name: string;
  color: string;
  size: string;
  price: number;
  total: number;
  removeProduct: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartItem: React.FC<Props> = ({
  checked,
  onClick,
  switchSelect,
  imageUrl,
  name,
  color,
  size,
  price,
  total,
  removeProduct,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Space flex v={'s'}>
      <Checkbox checked={checked} onClick={switchSelect} />
      <Space v={'n'} h={'s'} />
      <Container borderRadius={8} id={'Cart-Item-Container'}>
        <Horizontal style={{ width: w(50) }}>
          <Horizontal style={{ maxWidth: '80%' }} align={'top'}>
            <Clickable onClick={onClick}>
              <Image source={imageUrl || Camera} width={100} />
            </Clickable>
            <Space v={'xs'}>
              <P bold color={'dg'}>
                {name}
              </P>
              <Space h={'n'} v={'xs'}>
                <P color={'dg'} size={'s'}>
                  Color: <strong>{color}</strong>
                </P>
              </Space>
              <P color={'dg'} size={'s'}>
                Size: <strong>{size}</strong>
              </P>
              <Space h={'n'} v={'xs'}>
                <P bold size={'xl'} color={'m'}>
                  {price}TL
                </P>
              </Space>
              <P color={'dg1'} bold size={'s'}>
                {total} adet / {(price * total).toFixed(2)} TL
              </P>
            </Space>
          </Horizontal>

          <Space flex style={{ flex: 1 }}>
            <Horizontal>
              <Clickable onClick={() => total !== 1 && onDecrease()} className={'Cart-Item-Counter-Button'}>
                <RemoveRounded style={{ color: palette.dg1 }} />
              </Clickable>
              <Space v={'n'} h={'s'}>
                <P bold color={'dg'} size={'l'}>
                  {total}
                </P>
              </Space>
              <Clickable
                onClick={onIncrease}
                className={'Cart-Item-Counter-Button'}
                style={{ backgroundColor: palette.m }}
              >
                <AddRounded style={{ color: palette.l }} />
              </Clickable>
            </Horizontal>
          </Space>
        </Horizontal>
        <Clickable
          style={{ backgroundColor: palette.l }}
          onClick={removeProduct}
          htmlTitle={'Sepetten sil'}
          className={'Cart-Item-Delete-Button'}
        >
          <DeleteOutlineRounded style={{ color: palette.e }} />
        </Clickable>
      </Container>
    </Space>
  );
};

export default CartItem;
