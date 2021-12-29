import { useNavigate } from 'react-router-dom';

import { Space, P, Clickable, Horizontal } from 'components';
import { palette } from 'palette';
import { productMenus } from 'config/products';

import './style.css';

type Props = {
  onOpen: () => void;
  onClose: () => void;
  category: string;
};

const SubNav: React.FC<Props> = ({ onOpen, onClose, category }: Props) => {
  const navigate = useNavigate();
  const products = category
    ? Object.keys(productMenus[category])?.map((item) => ({
        title: item.replace(/[_]/gi, ' ').toLowerCase(),
        items: productMenus[category][item],
      }))
    : null;
  return (
    <Space v={'n'} h={'xxxl'} className={'Sub-Nav'} style={{ backgroundColor: `${palette.dg}10` }} fullWidth>
      <Space onMouseEnter={onOpen} onMouseLeave={onClose} className={'Sub-Nav-Content'}>
        <Horizontal wrap align={'top'}>
          {products?.map((product, i: number) => (
            <Space h={'l'} key={`sub-nav-porducts-${product.title}-${i}`}>
              <Clickable onClick={() => navigate(`/products/${category.toLowerCase()}?q=${product.title}`)}>
                <Space
                  v={'xs'}
                  h={'s'}
                  style={{ backgroundColor: `${palette.m}15` }}
                  className={'Sub-Nav-Product-Title'}
                >
                  <P capital color={'m'} bold>
                    {product.title}
                  </P>
                </Space>
              </Clickable>
              <Space v={'n'} b={'xs'} />
              {product.items.map((item: string, i: number) => (
                <Space h={'n'} v={'n'} b={'xs'} key={`sub-nav-products-items-${item}-${i}`}>
                  <Clickable
                    onClick={() => navigate(`/products/${category.toLowerCase()}?q=${product.title}&product=${item}`)}
                    className={'Sub-Nav-Product-Item'}
                  >
                    <P capital>{item.replace(/[_]/gi, ' ').toLowerCase()}</P>
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
