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

const Products: React.FC<Props> = ({ products }: Props) => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([
    { name: 'XS', selected: false },
    { name: 'S', selected: false },
    { name: 'M', selected: false },
    { name: 'L', selected: false },
    { name: 'XL', selected: false },
  ]);
  const [prices, setPrices] = useState([
    { name: '0-50', min: 0, max: 50, selected: false },
    { name: '50-100', min: 50, max: 100, selected: false },
    { name: '100-150', min: 100, max: 150, selected: false },
    { name: '150-200', min: 150, max: 200, selected: false },
  ]);
  const [marks, setMarks] = useState([
    { name: 'A', selected: false },
    { name: 'B', selected: false },
    { name: 'C', selected: false },
    { name: 'D', selected: false },
  ]);

  const [colors, setColors] = useState([
    { name: 'Red', selected: false },
    { name: 'White', selected: false },
    { name: 'Black', selected: false },
    { name: 'Yellow', selected: false },
    { name: 'Orange', selected: false },
  ]);

  const updateFilter = (filterItem: any, v: any) =>
    filterItem.map((item: any) => (item.name === v.name ? { ...item, selected: !item.selected } : item));

  const filterHandler = (key: string, v: any) => {
    if (key === 'Sizes') {
      setSizes(updateFilter(sizes, v));
    } else if (key === 'Marks') {
      setMarks(updateFilter(marks, v));
    } else if (key === 'Prices') {
      setPrices(updateFilter(prices, v));
    } else if (key === 'Colors') {
      setColors(updateFilter(colors, v));
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
                  <Checkbox checked={item.selected} onClick={() => filterHandler(f.name, item)} size={'small'} />
                  <Space v={'n'} h={'xs'} />
                  <P color={'dg1'}>{item.name}</P>
                </Horizontal>
              </Space>
            ))}
          />
        ))}
      </Space>
      <Space>
        <Space v={'s'} h={'s'}>
          <Horizontal>
            <P size={'l'} color={'d'}>
              Erkek tişört
            </P>
            <Space h={'s'} v={'n'}>
              <P size={'l'} color={'dg'}>
                (sonuç: 156)
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
