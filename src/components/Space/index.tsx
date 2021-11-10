type Props = {
  t?: SpaceValueKey; // top;
  l?: SpaceValueKey; // left;
  b?: SpaceValueKey; // bottom;
  r?: SpaceValueKey; // right;
  v?: SpaceValueKey; // vertical;
  h?: SpaceValueKey; // horizontal;
  children?: any;
  flex?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Space: React.FC<Props> = ({ t, l, b, r, v = 'm', h = 'm', children, flex, style, className }: Props) => {
  console.log(className);
  return (
    <div
      style={{
        padding: `${spaceValue[v]}px ${spaceValue[h]}px`,
        paddingTop: t ? spaceValue[t] : 'auto',
        paddingLeft: l ? spaceValue[l] : 'auto',
        paddingBottom: b ? spaceValue[b] : 'auto',
        paddingRight: r ? spaceValue[r] : 'auto',
        display: flex ? 'flex' : 'inline-block',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export type SpaceValueKey = 'n' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

type SpaceValue = {
  [key: string]: number;
};

const spaceValue: SpaceValue = {
  n: 0,
  s: 10,
  m: 20,
  l: 30,
  xl: 40,
  xxl: 50,
  xxxl: 60,
};

export default Space;
