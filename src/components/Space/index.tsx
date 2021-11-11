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
  fullWidth?: boolean;
  column?: boolean;
  align?: 'center' | 'flex-start' | 'flex-end';
};

const Space: React.FC<Props> = ({
  t,
  l,
  b,
  r,
  v = 'm',
  h = 'm',
  children,
  flex,
  style,
  className,
  fullWidth,
  column,
  align,
}: Props) => {
  console.log(className);
  return (
    <div
      style={{
        padding: `${spaceValue[v]}px ${spaceValue[h]}px`,
        paddingTop: t ? spaceValue[t] : 'auto',
        paddingLeft: l ? spaceValue[l] : 'auto',
        paddingBottom: b ? spaceValue[b] : 'auto',
        paddingRight: r ? spaceValue[r] : 'auto',
        display: flex ? 'flex' : 'block',
        width: fullWidth ? '100%' : 'auto',
        flexDirection: column ? 'column' : 'row',
        alignItems: align,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export type SpaceValueKey = 'n' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

type SpaceValue = {
  [key: string]: number;
};

const spaceValue: SpaceValue = {
  n: 0,
  xs: 5,
  s: 10,
  m: 20,
  l: 30,
  xl: 40,
  xxl: 50,
  xxxl: 60,
};

export default Space;
