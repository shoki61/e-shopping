import { Space, Horizontal, P, Clickable } from 'components';
import { Profile } from 'models';
import { palette } from 'palette';
import { connect } from 'react-redux';

type Props = {
  profile: Profile;
};

const Cart: React.FC<Props> = ({ profile }: Props) => {
  return <Space></Space>;
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(Cart);
