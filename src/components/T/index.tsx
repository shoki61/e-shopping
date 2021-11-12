import { connect } from 'react-redux';

type Props = {
  app: any;
  children: string;
};

const T: React.FC<Props> = ({ app: { languages }, children }: Props) => {
  return <>{languages[children]}</>;
};

const mapStateToProps = ({ app }: any) => ({ app });

export default connect(mapStateToProps)(T);
