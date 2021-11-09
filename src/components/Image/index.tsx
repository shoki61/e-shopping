type Props = {
  source: string;
  alt?: string;
  borderRadius?: number;
  style?: any;
  width?: number | string;
  height?: number | string;
  title?: string;
};

const Image: React.FC<Props> = ({ source, alt, borderRadius, style, width, height, title }: Props) => {
  return <img title={title} src={source} alt={alt} style={{ borderRadius, ...style, width, height }} />;
};

export default Image;
