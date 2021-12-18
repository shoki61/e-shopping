import { Space, P, Horizontal, Clickable, Button, Checkbox } from 'components';

import './style.css';

type Props = {};

const Products: React.FC<Props> = ({}: Props) => {
  return (
    <Horizontal>
      <Space></Space>
      <Space></Space>
    </Horizontal>
  );
};

export default Products;
