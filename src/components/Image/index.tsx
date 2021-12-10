import ImageZoom from './ImageZoom';

type Props = {
  source: string;
  alt?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  title?: string;
  className?: string;
  zoomable?: boolean;
  onZoom?: (v: boolean) => void;
};

const Image: React.FC<Props> = ({
  source,
  alt,
  borderRadius,
  style,
  width,
  height,
  title,
  className,
  zoomable,
  onZoom,
}: Props) => {
  return (
    <div style={{ position: 'relative' }}>
      {!zoomable ? (
        <img
          title={title}
          className={className}
          src={source}
          alt={alt}
          style={{ borderRadius, ...style, width, height }}
        />
      ) : (
        <ImageZoom img={source} width={width} height={height} onZoom={onZoom} />
      )}
    </div>
  );
};

export default Image;
