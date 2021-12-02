import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { palette } from 'palette';

import { Space, P, Clickable, Horizontal } from 'components';
import './style.css';
import { Profile } from 'models';

type ReduxProps = {};

type UserProps = {
  profile?: Profile;
  onClick: (v?: Profile) => void;
  onlineUsers: string[];
};

type Props = ReduxProps & UserProps;

const User: React.FC<Props> = ({ profile, onClick, onlineUsers }: Props) => {
  const online = onlineUsers.some((id) => id === profile?._id);
  console.log(onlineUsers.find((id) => id === profile?._id));
  return (
    <Clickable onClick={() => onClick(profile)} className={'User-Container'} style={{ backgroundColor: palette.l }}>
      <Space v={'s'}>
        <Horizontal>
          <Space flex align={'center'} v={'n'} h={'n'} className={'User-Avatar'} style={{ backgroundColor: palette.m }}>
            <PersonOutlineOutlinedIcon style={{ color: palette.l }} />
            <div className={'User-Active'} style={{ backgroundColor: online ? 'limegreen' : '#9c9c9c' }} />
          </Space>
          <Space v={'n'} h={'s'}>
            <P color={'dg'}>{profile?.name || 'Misafir Kullanıcı'}</P>
          </Space>
        </Horizontal>
      </Space>
    </Clickable>
  );
};

export default User;
