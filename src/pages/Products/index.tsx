import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Space, P, Horizontal, Clickable, Button, Checkbox, Collapse, ProductCard, AppNotification } from 'components';
import { palette } from 'palette';
import { Product } from 'models';
import { store } from 'store';
import * as actions from 'store/actions';

import './style.css';

type Props = {
  products: Product[];
};

type FilterObj = {
  [key: string]: any;
};

const Products: React.FC<Props> = ({ products }: Props) => {
  const navigate = useNavigate();
  const filterObj: FilterObj = {
    sizes: [],
    marks: [],
    prices: [],
    colors: [],
  };
  const sizes = [{ name: 'XS' }, { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }];
  const prices = [{ name: '0-50' }, { name: '50-100' }, { name: '100-150' }, { name: '150-200' }];
  const marks = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];
  const colors = [{ name: 'Red' }, { name: 'White' }, { name: 'Black' }, { name: 'Yellow' }, { name: 'Orange' }];

  const filterHandler = (key: string, value: string) => {
    if (filterObj[key].includes(value)) {
      filterObj[key] = filterObj[key].filter((item: string) => item !== value);
    } else {
      filterObj[key].push(value);
    }
  };

  const filters = [
    { name: 'Marks', items: marks },
    { name: 'Sizes', items: sizes },
    { name: 'Prices', items: prices },
    { name: 'Colors', items: colors },
  ];

  const goToProductDetail = (productId: string) => {
    store.dispatch(
      actions.getProductDetail(productId, (res: any) => {
        if (res.error) {
          return AppNotification.error(res.error.message);
        }
        navigate('/product-detail');
      }),
    );
  };

  const getFilteredProducts = () => {
    if (
      filterObj.sizes?.length < 1 &&
      filterObj.marks?.length < 1 &&
      filterObj.prices?.length < 1 &&
      filterObj.colors?.length < 1
    ) {
      return;
    }
    let myArr = [];
    const numbersArr = [];
    if (filterObj.prices?.length > 0) {
      myArr = filterObj.prices.map((item: string) => item.split('-'));
      for (let i = 0; i < myArr.length; i++) {
        for (let j = 0; j < myArr[i].length; j++) {
          numbersArr.push(Number(myArr[i][j]));
        }
      }
      filterObj.prices = Array.from(new Set(numbersArr));
    }
    store.dispatch(
      actions.getFilteredProducts(filterObj, (res) => {
        if (res.error) {
          AppNotification.error(res.error.message);
        }
      }),
    );
  };
  return (
    <Horizontal style={{ position: 'relative' }} align={'top'}>
      <Space style={{ backgroundColor: palette.l }} h={'xxxl'} className={'Products-Left-Container'}>
        <Space h={'s'} v={'s'}>
          <P color={'dg'} size={'l'}>
            Filtrelemeler
          </P>
        </Space>
        {filters.map((f, i) => (
          <Collapse
            key={`products-collapse-${f.name}-${i}`}
            title={f.name}
            contents={f.items.map((item, i) => (
              <Space key={`products-collapse-${item.name}-${i}`} h={'s'} v={'xs'}>
                <Horizontal>
                  <Checkbox onClick={() => filterHandler(f.name.toLowerCase(), item.name)} size={'small'} />
                  <Space v={'n'} h={'xs'} />
                  <P color={'dg1'}>{item.name}</P>
                </Horizontal>
              </Space>
            ))}
          />
        ))}
        <Space h={'s'}>
          <Button fullWidth onClick={getFilteredProducts} title={'Ürünleri getir'} />
        </Space>
      </Space>
      <Space>
        <Space v={'s'} h={'s'}>
          <Horizontal>
            <P size={'l'} color={'d'}>
              Erkek tişört
            </P>
            <Space h={'s'} v={'n'}>
              <P size={'l'} color={'dg'}>
                (sonuç: {products?.length})
              </P>
            </Space>
          </Horizontal>
        </Space>
        <Horizontal wrap>
          {products?.map((item: Product) => (
            <Space v={'s'} h={'n'} r={'m'} key={`products-${item._id}`}>
              <ProductCard
                onClick={() => goToProductDetail(item._id)}
                imageSource={
                  'https://cdn.dsmcdn.com/mnresize/1200/1800/ty184/product/media/images/20210927/16/136847065/135399598/1/1_org_zoom.jpg'
                }
                isFavorite
                prize={item.price}
                rating={item.rating}
                ratingCount={item.ratingCount}
                title={item.name}
              />
            </Space>
          ))}
        </Horizontal>
      </Space>
    </Horizontal>
  );
};

const mapStateToProps = ({ product: { products } }: any) => ({ products });

export default connect(mapStateToProps)(Products);
