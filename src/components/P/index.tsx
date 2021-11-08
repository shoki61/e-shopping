type Props = {
  children: string | JSX.Element;
  size: string;
  color: string;
};

const P: React.FC<Props> = ({ children, size, color }: Props) => {
  return <p style={{ fontSize: size, color }}>{children}</p>;
};

export default P;
