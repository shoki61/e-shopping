import { useState } from 'react';

import { Space, P, Horizontal, Clickable, Button, Checkbox, Collapse } from 'components';

import './style.css';

type Props = {};

const Products: React.FC<Props> = ({}: Props) => {
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

  const updateFilter = (filterItem: any, v: any) =>
    filterItem.map((item: any) => (item.name === v.name ? { ...item, selected: !item.selected } : item));

  const filterHandler = (key: string, v: any) => {
    if (key === 'sizes') {
      setSizes(updateFilter(sizes, v));
    } else if (key === 'marks') {
      setMarks(updateFilter(marks, v));
    } else if (key === 'prices') {
      setPrices(updateFilter(prices, v));
    }
  };
  return (
    <Horizontal>
      <Space>
        <Collapse
          title={'Marks'}
          contents={marks.map((m, i) => (
            <Space key={`products-marks-${m.name}-${i}`} h={'s'} v={'xs'}>
              <Horizontal>
                <Checkbox checked={m.selected} onClick={() => filterHandler('marks', m)} size={'small'} />
                <Space v={'n'} h={'xs'} />
                <P color={'dg1'}>{m.name}</P>
              </Horizontal>
            </Space>
          ))}
        />
        <Collapse
          title={'Sizes'}
          contents={sizes.map((s: any, i) => (
            <Space key={`products-sizes-${s.name}-${i}`} h={'s'} v={'xs'}>
              <Horizontal>
                <Checkbox checked={s.selected} onClick={() => filterHandler('sizes', s)} size={'small'} />
                <Space v={'n'} h={'xs'} />
                <P color={'dg1'}>{s.name}</P>
              </Horizontal>
            </Space>
          ))}
        />
        <Collapse
          title={'Prices'}
          contents={prices.map((p, i) => (
            <Space key={`products-prices-${p.name}-${i}`} h={'s'} v={'xs'}>
              <Horizontal>
                <Checkbox checked={p.selected} onClick={() => filterHandler('prices', p)} size={'small'} />
                <Space v={'n'} h={'xs'} />
                <P color={'dg1'}>
                  {p.min} - {p.max}
                </P>
              </Horizontal>
            </Space>
          ))}
        />
      </Space>
      <Space></Space>
    </Horizontal>
  );
};

export default Products;
