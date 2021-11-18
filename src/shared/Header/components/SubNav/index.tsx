import { Space, P, Clickable, Button } from 'components';
import { palette } from 'palette';

import './style.css';

type Props = {};

const SubNav: React.FC<Props> = ({}: Props) => {
  const products = [{ title: 'Shoes', items: ['Bot', 'test', 'lest', 'best'] }];
  return (
    <Space v={'n'} h={'xxxl'} className={'Sub-Nav'} style={{ backgroundColor: `${palette.dg}20` }} fullWidth>
      <Space className={'Sub-Nav-Content'}>
        {products.map((product) => (
          <div>
            <P>{product.title}</P>
            {product.items.map((item) => (
              <P>{item}</P>
            ))}
          </div>
        ))}
      </Space>
    </Space>
  );
};

export default SubNav;
