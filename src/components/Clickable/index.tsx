import React from 'react';
import './style.css';

export type CursorType = 'pointer' | 'crosshair' | 'zoom-in' | 'wait' | 'not-allowed';

type Props = {
  children: JSX.Element[] | any;
  style?: React.CSSProperties;
  onClick?: () => any;
  cursor?: CursorType;
  loading?: boolean;
  enabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  htmlTitle?: string;
};

const Clickable: React.FC<Props> = ({
  children,
  style,
  onClick = () => {},
  cursor = 'pointer',
  loading = false,
  enabled = true,
  className,
  fullWidth,
  htmlTitle,
}: Props) => {
  return (
    <button
      disabled={!enabled}
      onClick={() => !loading && onClick()}
      className={`Clickable ${className}`}
      title={htmlTitle}
      style={{
        cursor: !enabled ? 'no-drop' : loading ? 'wait' : cursor,
        ...style,
        width: fullWidth ? '100%' : 'auto',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Clickable;
