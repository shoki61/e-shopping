import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { palette } from 'palette';

import { Space, P, Clickable, Horizontal } from 'components';
import './style.css';

type ReduxProps = {};

type UserProps = {
  profile: any;
  onClick: () => void;
};

type Props = ReduxProps & UserProps;

const User: React.FC<Props> = ({ profile: { name }, onClick }: Props) => {
  return (
    <Clickable onClick={onClick} className={'User-Container'} style={{ backgroundColor: palette.l }}>
      <Space v={'s'}>
        <Horizontal>
          <Space flex align={'center'} v={'n'} h={'n'} className={'User-Avatar'} style={{ backgroundColor: palette.m }}>
            <PersonOutlineOutlinedIcon style={{ color: palette.l }} />
            <div className={'User-Active'} style={{ backgroundColor: false ? 'limegreen' : '#9c9c9c' }} />
          </Space>
          <Space v={'n'} h={'s'}>
            <P color={'dg'}>{name || 'User'}</P>
          </Space>
        </Horizontal>
      </Space>
    </Clickable>
  );
};

export default User;
