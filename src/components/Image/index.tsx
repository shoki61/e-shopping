type Props = {
  source: string;
  alt?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  title?: string;
  className?: string;
};

const Image: React.FC<Props> = ({ source, alt, borderRadius, style, width, height, title, className }: Props) => {
  return (
    <img title={title} className={className} src={source} alt={alt} style={{ borderRadius, ...style, width, height }} />
  );
};

export default Image;
