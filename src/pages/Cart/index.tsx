import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Space, Horizontal, P, Image, Button, Container, Checkbox } from 'components';
import { Profile } from 'models';
import { palette } from 'palette';
import { EmptyCart } from 'assets';

import { CartItem } from './components';
import './style.css';

type Props = {
  profile: Profile;
};

const Cart: React.FC<Props> = ({ profile }: Props) => {
  const [cartItems, setCartItems] = useState([
    {
      id: '123',
      name: 'Siyah Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört.',
      imageUrl:
        'https://cdn.dsmcdn.com/mnresize/1200/1800/ty184/product/media/images/20210927/16/136847065/135399598/1/1_org_zoom.jpg',
      checked: true,
      price: 49.99,
      size: 'M',
      total: 1,
      color: 'Siyah',
    },
    {
      id: '456',
      name: 'Mavi Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört.',
      imageUrl:
        'https://cdn.dsmcdn.com/mnresize/1200/1800/ty156/product/media/images/20210812/15/118159653/186967030/1/1_org_zoom.jpg',
      checked: true,
      price: 34.99,
      size: 'S',
      total: 1,
      color: 'Mavi',
    },
    {
      id: '789',
      name: 'Sarı Basic Erkek Bisiklet Yaka Oversize Kısa Kollu Tişört.',
      imageUrl:
        'https://cdn.dsmcdn.com/mnresize/1200/1800/ty161/product/media/images/20210817/8/119111888/164609399/1/1_org_zoom.jpg',
      checked: true,
      price: 39.99,
      size: 'M',
      total: 1,
      color: 'Sarı',
    },
  ]);
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();

  const switchSelect = (id: string) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const decreaseProduct = (id: string) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, total: item.total - 1 } : item)));
  };

  const increaseProduct = (id: string) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, total: item.total + 1 } : item)));
  };

  const goProductDetail = (id: string) => {
    navigate('/product-detail');
  };

  const removeProduct = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <Space v={'xxxl'} h={'xxxl'} flex column align={'flex-start'}>
      {false ? (
        <>
          <div
            className={'Cart-Empty-Cart-Container'}
            style={{
              backgroundColor: `${palette.m}60`,
            }}
          >
            <Image source={EmptyCart} width={65} height={65} />
          </div>
          <Space v={'s'}>
            <P color={'dg1'} bold>
              Sepetiniz boş!
            </P>
          </Space>
          <Button title={'Alışveriş yapmaya başla'} onClick={() => navigate('/')} />
        </>
      ) : (
        <Horizontal>
          <Space>
            {cartItems.map((item) => (
              <CartItem
                name={item.name}
                imageUrl={item.imageUrl}
                key={item.id}
                checked={item.checked}
                color={item.color}
                price={item.price}
                size={item.size}
                total={item.total}
                switchSelect={() => switchSelect(item.id)}
                onClick={() => goProductDetail(item.id)}
                onDecrease={() => decreaseProduct(item.id)}
                onIncrease={() => increaseProduct(item.id)}
                removeProduct={() => removeProduct(item.id)}
              />
            ))}
          </Space>

          <Space />
        </Horizontal>
      )}
    </Space>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(Cart);
