import { Space, P, Clickable, Button, Horizontal } from 'components';
import { palette } from 'palette';
import { productMenus } from 'config/products';

import './style.css';

type Props = {
  onOpen: () => void;
  onClose: () => void;
  category: string;
};

const SubNav: React.FC<Props> = ({ onOpen, onClose, category }: Props) => {
  const products = category
    ? Object.keys(productMenus[category])?.map((item) => ({
        title: item,
        items: productMenus[category][item],
      }))
    : null;
  return (
    <Space v={'n'} h={'xxxl'} className={'Sub-Nav'} style={{ backgroundColor: `${palette.dg}10` }} fullWidth>
      <Space onMouseEnter={onOpen} onMouseLeave={onClose} className={'Sub-Nav-Content'}>
        <Horizontal wrap align={'top'}>
          {products?.map((product) => (
            <Space h={'l'}>
              <Clickable onClick={() => {}}>
                <Space
                  v={'xs'}
                  h={'s'}
                  style={{ backgroundColor: `${palette.m}15` }}
                  className={'Sub-Nav-Product-Title'}
                >
                  <P color={'m'} bold>
                    {product.title}
                  </P>
                </Space>
              </Clickable>
              <Space v={'n'} b={'xs'} />
              {product.items.map((item: string) => (
                <Space h={'n'} v={'n'} b={'xs'}>
                  <Clickable onClick={() => {}} className={'Sub-Nav-Product-Item'}>
                    <P>{item}</P>
                  </Clickable>
                </Space>
              ))}
            </Space>
          ))}
        </Horizontal>
      </Space>
    </Space>
  );
};

export default SubNav;
