import Space, { SpaceValueKey } from '../Space';

import './style.css';

type Props = {
  children: React.ReactNode;
  v?: SpaceValueKey;
  h?: SpaceValueKey;
  borderRadius?: number | string;
  id?: string;
};

const Container: React.FC<Props> = ({ children, v = 'm', h = 'm', borderRadius, id }: Props) => {
  return (
    <Space style={{ borderRadius }} id={id} className={'Container'} v={v} h={h}>
      {children}
    </Space>
  );
};

export default Container;
