import { Space, P, Clickable, Button, Horizontal } from 'components';
import { palette } from 'palette';
import { productMenus } from 'config/products';

import './style.css';

type Props = {
  onOpen: () => void;
  onClose: () => void;
};

const SubNav: React.FC<Props> = ({ onOpen, onClose }: Props) => {
  const products = [
    { title: 'Shoes', items: productMenus.man.clothes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.accessory },
    { title: 'Shoes', items: productMenus.man.electronic },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
    { title: 'Shoes', items: productMenus.man.shoes },
  ];
  return (
    <Space v={'n'} h={'xxxl'} className={'Sub-Nav'} style={{ backgroundColor: `${palette.dg}20` }} fullWidth>
      <Space onMouseEnter={onOpen} onMouseLeave={onClose} className={'Sub-Nav-Content'}>
        <Horizontal wrap align={'top'}>
          {products.map((product) => (
            <div style={{ margin: 15 }}>
              <P size={'l'} bold>
                {product.title}
              </P>
              {product.items.map((item: string) => (
                <P>{item}</P>
              ))}
            </div>
          ))}
        </Horizontal>
      </Space>
    </Space>
  );
};

export default SubNav;
