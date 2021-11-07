type Props = {
  t?: number; // top;
  l?: number; // left;
  b?: number; // bottom;
  r?: number; // right;
  v?: number; // vertical;
  h?: number; // horizontal;
  children?: any;
  flex?: boolean;
  style?: any;
};

const Space: React.FC<Props> = ({ t, l, b, r, v = 10, h = 10, children, flex, style }: Props) => {
  return (
    <div
      style={{
        padding: `${v}px ${h}px`,
        paddingTop: `${t}px`,
        paddingLeft: `${l}px`,
        paddingBottom: `${b}px`,
        paddingRight: `${r}px`,
        display: flex ? 'flex' : 'inline-block',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Space;
