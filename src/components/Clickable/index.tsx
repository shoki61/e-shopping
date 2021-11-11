import './style.css';

export type CursorType = 'pointer' | 'crosshair' | 'zoom-in' | 'wait' | 'not-allowed';

type Props = {
  children: JSX.Element[] | JSX.Element;
  style?: React.CSSProperties;
  onClick: () => any;
  cursor?: CursorType;
  loading?: boolean;
  enabled?: boolean;
  className?: string;
};

const Clickable: React.FC<Props> = ({
  children,
  style,
  onClick,
  cursor = 'pointer',
  loading = false,
  enabled = true,
  className,
}: Props) => {
  return (
    <button
      disabled={!enabled}
      onClick={() => !loading && onClick()}
      className={`Clickable ${className}`}
      style={{
        cursor: !enabled ? 'no-drop' : loading ? 'wait' : cursor,
        ...style,
        opacity: loading ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Clickable;
