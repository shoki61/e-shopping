import './style.css';

type Props = {
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'center' | 'end';
  children: JSX.Element[] | any;
  style?: React.CSSProperties;
  wrap?: boolean;
  spread?: boolean;
};

type AlignAndJustifyType = {
  [key: string]: string;
};

const alignItemsValue: AlignAndJustifyType = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};

const justifyContentValue: AlignAndJustifyType = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

const Horizontal: React.FC<Props> = ({
  align = 'middle',
  justify = 'start',
  children,
  wrap = false,
  spread = false,
  style,
}: Props) => {
  return (
    <div
      className={'Horizontal'}
      style={{
        alignItems: alignItemsValue[align],
        justifyContent: spread ? 'space-between' : justifyContentValue[justify],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Horizontal;
